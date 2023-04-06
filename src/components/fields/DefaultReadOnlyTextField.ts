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
  if (label.includes("id")) return "";
  if (label.includes("Id")) return "";
  if (propertyName.includes("id")) return "";
  if (propertyName.includes("Id")) return "";
  if (propertyName.includes("ID")) return "";

  return `
    <${rsc.DefaultReadOnlyTextField} 
        value={${propertyName}}
        label="${label}" />`;
};
