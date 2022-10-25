import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import {
  DTOSchema,
  generateProperties,
  getDummyValueForProperty,
  getPropertiesFromSchema,
} from "../../models/DTOSchema";
import { defaultFileExtension } from "../../stringConfig";
import { getModelName } from "../../utils/consoleInputUtils";
import { pascalCase } from "../../utils/stringUtils";

//todo fix this ffs.. not feature name like in interface, its fukin model name
export const GetCreateModelString = (modelName: string, model: DTOSchema) => {
  return `
export interface ${pascalCase(modelName)} {
  ${generateProperties(model)}
}

export const createEmpty${pascalCase(modelName)} = (): ${pascalCase(
    modelName
  )} => ({
    ${getPropertiesFromSchema(model).map((property) => {
      return `${property.name} : ${getDummyValueForProperty(
        property,
        getModelName
      )}`;
    })}
});
`;
};

const GetCreateModelRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.modelsPath}`;
};

export const ModelTemplate: ITemplate = {
  getRoute: GetCreateModelRoute,
  getBody: GetCreateModelString,
  getName: (modelName: string) => modelName,
  extension: defaultFileExtension,
};
