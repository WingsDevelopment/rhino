import { DefaultReadOnlyTextFieldTsx } from "..";

interface Props {
  propertyName: string;
  label: string;
}

export const DefaultReadOnlyTextField = ({ propertyName, label }: Props) => {
  return `
    <${DefaultReadOnlyTextFieldTsx} 
        value={${propertyName}}
        label="${label}" />`;
};
