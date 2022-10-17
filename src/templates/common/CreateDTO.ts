import { DTOSchema, generateDtoProperties } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";

export const GetCreateDTOString = (modelName: string, model: DTOSchema) => {
  return `
export interface ${pascalCase(modelName)} {
  ${generateDtoProperties(model)}
}

export const ${camelCase(modelName)}Extension = (${
    "model: " +
    pascalCase(model.modelName) +
    "): " +
    pascalCase(model.dtoName) +
    " => ({ ...model })"
  }
  
export const model${camelCase(modelName)}Extension = (${
    "dto: " +
    pascalCase(model.dtoName) +
    "): " +
    pascalCase(model.modelName) +
    " => ({ ...dto })"
  };`;
};
