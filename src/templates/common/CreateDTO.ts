import { DTOSchema, generateDtoProperties } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";

export const DTOExtensionName = (modelName: string) => {
  return `${camelCase(modelName)}DTOExtension`;
};

export const ModelExtensionName = (modelName: string) => {
  return `${camelCase(modelName)}ModelExtension`;
};

export const GetCreateDTOString = (modelName: string, model: DTOSchema) => {
  return `
export interface ${pascalCase(modelName)} {
  ${generateDtoProperties(model)}
}

export const ${DTOExtensionName(model.modelName)} = (${
    "model: " +
    pascalCase(model.modelName) +
    "): " +
    pascalCase(model.dtoName) +
    " => ({ ...model })"
  }
  
export const ${ModelExtensionName(model.modelName)} = (${
    "dto: " +
    pascalCase(model.dtoName) +
    "): " +
    pascalCase(model.modelName) +
    " => ({ ...dto })"
  };`;
};
