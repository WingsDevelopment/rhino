import { generateProperties, DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";

export const GetCreateDTOString = (modelName: string, model: DTOSchema) => {
  return `
export interface ${pascalCase(modelName)}DTO {
  ${generateProperties(model)}
}

export const ${camelCase(modelName)}DtoExtension = (${
    "model: " +
    pascalCase(modelName) +
    "DTO" +
    "): " +
    pascalCase(modelName) +
    " => ({ ...model })"
  }
  
export const ${camelCase(modelName)}Extension = (${
    "dto: " +
    pascalCase(modelName) +
    "): " +
    pascalCase(modelName) +
    "DTO" +
    " => ({ ...dto })"
  };`;
};
