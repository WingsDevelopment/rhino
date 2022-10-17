export interface DTOSchema {
  name: string;
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
      return `${property.name}${property.nullable ? "?" : ""}: ${getPropertyTypeString(property)};`;
    })
    .join("\n")}`;
};

export const getPropertyTypeString = (property: Property) => {
  if (property.type === "array") {
    if (property.items.$ref) {
      return `${property.items.$ref.split("/").pop()}[]`;
    } else {
      return `${property.items.type}[]`;
    }
  }
  if (property.$ref) {
    return `${property.$ref.split("/").pop()}`;
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

export const getDummyValueForProperty = (property: Property) => {
  const type = getPropertyTypeString(property);
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
