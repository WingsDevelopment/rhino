import {
  DTOSchema,
  getPropertiesFromSchema,
  isPropertyPrimitive,
} from "../../models/DTOSchema";
import { rsc } from "../../rhinoStringConfig";
import {
  camelCase,
  pascalSplitedWithSpaceForEveryCapitalLetter,
} from "../../utils/stringUtils";
import { DefaultReadOnlyTextField } from "./DefaultReadOnlyTextField";
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFNumberField,
  RHFTextField,
} from "./FieldInput";

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
      <${rsc.SingleColumnBox}>
        ${RenderReadonlyFields(model, modelName)}
      </${rsc.SingleColumnBox}>`;
};

export const TwoColumnReadonlyBody = (model: DTOSchema, modelName: string) => {
  return `
    <${rsc.TwoColumnBox}>
        ${RenderReadonlyFields(model, modelName)}
    </${rsc.TwoColumnBox}>`;
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
  keyType: string, //"string" | "number" | "boolean" | "Date"
  name: string,
  label: string,
  nullable?: boolean
) => {
  if (name === undefined) return "";
  if (name === null) return "";
  if (name === "") return "";
  if (name === "id") return "";
  if (name === "Id") return "";
  if (name === "ID") return "";
  if (label.includes("id")) return "";
  if (label.includes("Id")) return "";
  if (name.includes("id")) return "";
  if (name.includes("Id")) return "";
  if (name.includes("ID")) return "";
  //TODO SWITCH
  if (keyType === "string")
    return RHFTextField({ modelName, name, label, nullable });
  if (keyType === "number")
    return RHFNumberField({ modelName, name, label, nullable });
  if (keyType === "boolean")
    return RHFCheckbox({ modelName, name, label, nullable });
  if (keyType === "Date" || keyType === "date")
    return RHFDatePicker({ modelName, name, label, nullable });
  return "";
};
