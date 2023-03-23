import { rsc } from "../../rhinoStringConfig";
import { getRequired } from "./utils";

interface Props {
  name: string;
  label: string;
  nullable?: boolean;
}

export const RHFNumberField = ({ name, label, nullable }: Props) => {
  return `
  <${rsc.RHFNumberField} 
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};
