import { RHFNumberFieldTsx } from ".";
import { getRequired } from "./utils";

interface Props {
  name: string;
  label: string;
  nullable?: boolean;
}

export const RHFNumberField = ({ name, label, nullable }: Props) => {
  return `
  <${RHFNumberFieldTsx} 
    name="${name}" 
    label="${label}" 
    ${getRequired(nullable)} />`;
};
