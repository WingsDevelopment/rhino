import { rsc } from "../../rhinoStringConfig";

interface Props {
  propertyName: string;
  label: string;
}

export const DefaultReadOnlyTextField = ({ propertyName, label }: Props) => {
  if (propertyName === undefined) return "";
  if (propertyName === null) return "";
  if (propertyName === "") return "";
  if (propertyName === "id") return "";
  if (propertyName === "Id") return "";
  if (propertyName === "ID") return "";
  return `
    <${rsc.DefaultReadOnlyTextField} 
        value={${propertyName}}
        label="${label}" />`;
};
