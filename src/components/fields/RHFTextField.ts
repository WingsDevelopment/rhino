import { rsc } from "../../rhinoStringConfig";
import { pascalCase } from "../../utils/stringUtils";
import { getRequired } from "./utils";

interface Props {
  modelName: string;
  name: string;
  label: string;
  nullable?: boolean;
}

export const RHFTextField = ({ modelName, name, label, nullable }: Props) => {
  return `
  <${rsc.RRHFTextField}<${pascalCase(modelName)}>
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};
