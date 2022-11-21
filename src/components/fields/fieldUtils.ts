import { SingleColumnBoxTsx, TwoColumnBoxTsx } from "..";
import {
  DTOSchema,
  getPropertiesFromSchema,
  isPropertyPrimitive,
} from "../../models/DTOSchema";
import {
  camelCase,
  pascalSplitedWithSpaceForEveryCapitalLetter,
} from "../../utils/stringUtils";
import { DefaultReadOnlyTextField } from "./DefaultReadOnlyTextField";
import { RHFNumberField } from "./RHFNumberField";
import { RHFTextField } from "./RHFTextField";

export const RenderFields = (model: DTOSchema, modelName: string) => {
  return `
  ${getPropertiesFromSchema(model)
    .filter((model) => model.type !== undefined)
    .map((property) => {
      if (isPropertyPrimitive(property))
        return GetFieldByKeyType(
          model.modelName,
          property.type,
          property.name,
          pascalSplitedWithSpaceForEveryCapitalLetter(property.name),
          property.nullable
        );
    })
    .join("\n")}`;
};

export const SingleColumnReadonlyBody = (
  model: DTOSchema,
  modelName: string
) => {
  return `
      <${SingleColumnBoxTsx}>
        ${RenderReadonlyFields(model, modelName)}
      </${SingleColumnBoxTsx}>`;
};

export const TwoColumnReadonlyBody = (model: DTOSchema, modelName: string) => {
  return `
    <${TwoColumnBoxTsx}>
        ${RenderReadonlyFields(model, modelName)}
    </${TwoColumnBoxTsx}>`;
};

export const RenderReadonlyFields = (model: DTOSchema, modelName: string) => {
  return `
      ${getPropertiesFromSchema(model)
        .filter((model) => model.type !== undefined)
        .map((property) => {
          if (isPropertyPrimitive(property))
            return DefaultReadOnlyTextField({
              label: pascalSplitedWithSpaceForEveryCapitalLetter(property.name),
              propertyName: `${camelCase(modelName)}?.${
                property.name
              }?.toString()`,
            });
        })
        .join("\n")}`;
};

export const GetFieldByKeyType = (
  modelName: string,
  keyType: string,
  name: string,
  label: string,
  nullable?: boolean
) => {
  //TODO SWITCH
  return RHFTextField({
    modelName,
    name,
    label,
    nullable,
  });
};
