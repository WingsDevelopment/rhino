export const getRequired = (nullable: boolean | undefined) => {
  return nullable ? "" : "rules={{ required: REQUIRED_FIELD_ERROR_MESSAGE }}";
};
