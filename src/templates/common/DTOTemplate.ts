import { rhinoConfig } from "../../cli";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema, generateDtoProperties } from "../../models/DTOSchema";
import { rsc } from "../../rhinoStringConfig";
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

const GetCreateDTORoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.dtosPath}`;
};

export const DTOTemplate: ITemplate = {
  getRoute: GetCreateDTORoute,
  getBody: GetCreateDTOString,
  getName: (dtoName: string) => dtoName,
  extension: rsc.defaultFileExtension,
};
