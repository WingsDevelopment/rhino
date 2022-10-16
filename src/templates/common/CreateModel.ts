import {
  generateProperties,
  getDummyValueForProperty,
  getPropertiesFromSchema,
  Property,
  DTOSchema,
} from "../../schema/ShemaModel";
import { pascalCase } from "../../utils/stringUtils";

export const GetCreateModelString = (modelName: string, model: DTOSchema) => {
  return `
export interface ${pascalCase(modelName)} {
  ${generateProperties(model)}
}

export const createEmpty${pascalCase(modelName)} = (): ${pascalCase(
    modelName
  )} => ({
    ${getPropertiesFromSchema(model).map((property) => {
      return `${property.name} : ${getDummyValueForProperty(property)}`;
    })}
});`;
};
