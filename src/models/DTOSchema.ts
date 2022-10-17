import { getDtoName, getModelName } from "../utils/consoleInputUtils";

export interface DTOSchema {
  origName: string;
  dtoName: string;
  modelName: string;
  type: string;
  enum: string[];
  properties: {
    [key: string]: Property;
  };
}

export interface Property {
  name: string;
  type: string;
  format: string;
  $ref: string;
  nullable: boolean;
  items: Property;
}

export const getPropertiesFromSchema = (model: DTOSchema): Property[] => {
  let properties: Property[] = [];
  for (let key in model.properties) {
    properties.push({
      name: key,
      $ref: model.properties[key].$ref,
      format: model.properties[key].format,
      type: model.properties[key].type,
      nullable: model.properties[key].nullable,
      items: model.properties[key].items,
    });
  }
  return properties;
};

// prettier-ignore
export const generateProperties = (model: DTOSchema) => {
  return `${getPropertiesFromSchema(model)
    .map(property => {
      return `${property.name}${property.nullable ? "?" : ""}: ${getPropertyTypeString(property, getModelName)};`;
    })
    .join("\n")}`;
};

// prettier-ignore
export const generateDtoProperties = (model: DTOSchema) => {
  return `${getPropertiesFromSchema(model)
    .map(property => {
      return `${property.name}${property.nullable ? "?" : ""}: ${getPropertyTypeString(property, getDtoName)};`;
    })
    .join("\n")}`;
};

export const getPropertyTypeString = (
  property: Property,
  nameFormatter: (name: string) => string
) => {
  if (property.type === "array") {
    if (property.items.$ref) {
      const nameFromRef = property.items.$ref.split("/").pop();
      if (!nameFromRef) return "any";
      return `${nameFormatter(nameFromRef)}[]`;
    } else {
      return `${property.items.type}[]`;
    }
  }
  if (property.$ref) {
    const nameFromRef = property.$ref.split("/").pop();
    if (!nameFromRef) return "any";
    return nameFormatter(nameFromRef);
  }
  if (property.type === "integer") {
    return "number";
  }
  if (property.type === "string") {
    if (property.format === "date-time") {
      return "Date";
    }
    if (property.format === "date") {
      return "Date";
    }
    if (property.format === "time") {
      return "Date";
    }
    if (property.format === "byte") {
      return "string";
    }
    if (property.format === "binary") {
      return "string";
    }
    if (property.format === "password") {
      return "string";
    }
    return "string";
  }
};

export const getDummyValueForProperty = (
  property: Property,
  nameFormatter: (name: string) => string
) => {
  const type = getPropertyTypeString(property, nameFormatter);
  if (property.nullable) return "undefined";
  if (property.type === "array") return "[]";
  switch (type) {
    case "string":
      return "''";
    case "number":
      return "0";
    case "boolean":
      return "false";
    default:
      return "undefined";
  }
};
