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
    });
  }
  return properties;
};

export const generateProperties = (model: DTOSchema) => {
  return `${getPropertiesFromSchema(model)
    .map((property) => {
      return `${property.name}${property.nullable ? "?" : ""}: ${
        property.type || "any"
      };`;
    })
    .join("\n")}`;
};

export const getDummyValueForProperty = (property: Property) => {
  if (property.nullable) return "undefined";
  switch (property.type) {
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
