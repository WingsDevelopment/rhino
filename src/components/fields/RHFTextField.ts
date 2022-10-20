import { RHFTextFieldTsx } from "..";
import { getRequired } from "./utils";

interface Props {
  name: string;
  label: string;
  nullable?: boolean;
}

export const RHFTextField = ({ name, label, nullable }: Props) => {
  return `
  <${RHFTextFieldTsx} 
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};
