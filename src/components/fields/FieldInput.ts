import { rsc } from "../../rhinoStringConfig";
import { pascalCase } from "../../utils/stringUtils";
import { getRequired, Props } from "./utils";

export const RHFTextField = ({ modelName, name, label, nullable }: Props) => {
  return `
  <${rsc.RRHFTextField}<${pascalCase(modelName)}>
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};

export const RHFNumberField = ({ modelName, name, label, nullable }: Props) => {
  return `
  <${rsc.RRHFNumberField}<${pascalCase(modelName)}>
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};

export const RHFDatePicker = ({ modelName, name, label, nullable }: Props) => {
  return `
  <${rsc.RRHFDatePicker}<${pascalCase(modelName)}>
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};

export const RHFCheckbox = ({ modelName, name, label, nullable }: Props) => {
  return `
  <${rsc.RHFCheckbox}<${pascalCase(modelName)}>
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};
