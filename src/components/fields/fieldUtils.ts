import { SingleColumnBoxTsx, TwoColumnBoxTsx } from "../boxes";
import { DefaultReadOnlyTextField } from "./DefaultReadOnlyTextField";
import { DTOSchema, getPropertiesFromSchema } from "../../schema/ShemaModel";
import {
  pascalSplitedWithSpaceForEveryCapitalLetter,
  camelCase,
} from "../../utils/stringUtils";
import { RHFNumberField } from "./RHFNumberField";
import { RHFTextField } from "./RHFTextField";

export const SingleColumnBody = (model: DTOSchema, modelName: string) => {
  return `
        <${SingleColumnBoxTsx}>
          ${RenderFields(model, modelName)}
        </${SingleColumnBoxTsx}>`;
};

export const TwoColumnBody = (model: DTOSchema, modelName: string) => {
  return `
      <${TwoColumnBoxTsx}>
          ${RenderFields(model, modelName)}
      </${TwoColumnBoxTsx}>`;
};

export const RenderFields = (model: DTOSchema, modelName: string) => {
  return `
  ${getPropertiesFromSchema(model)
    .filter((model) => model.type !== undefined)
    .map((property) => {
      return GetFieldByKeyType(
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
          return DefaultReadOnlyTextField({
            label: pascalSplitedWithSpaceForEveryCapitalLetter(property.name),
            propertyName: `${camelCase(modelName)}.${property.name}`,
          });
        })
        .join("\n")}`;
};

export const GetFieldByKeyType = (
  keyType: string,
  name: string,
  label: string,
  nullable?: boolean
) => {
  if (typeof keyType === "string") {
    return RHFTextField({
      name,
      label,
      nullable,
    });
  } else if (typeof keyType === "number") {
    return RHFNumberField({
      name,
      label,
      nullable,
    });
  }
};
