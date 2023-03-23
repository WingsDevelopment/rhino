import { rsc } from "../../rhinoStringConfig";

interface Props {
  propertyName: string;
  label: string;
}

export const DefaultReadOnlyTextField = ({ propertyName, label }: Props) => {
  return `
    <${rsc.DefaultReadOnlyTextField} 
        value={${propertyName}}
        label="${label}" />`;
};
