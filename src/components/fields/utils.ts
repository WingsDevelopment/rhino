export const getRequired = (nullable: boolean | undefined) => {
  return nullable ? "" : "rules={{ required: REQUIRED_FIELD_ERROR_MESSAGE }}";
};
export interface Props {
  modelName: string;
  name: string;
  label: string;
  nullable?: boolean;
}
