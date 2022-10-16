export const getRequired = (nullable: boolean | undefined) => {
  return nullable ? "" : "required: REQUIRED_FIELD_ERROR_MESSAGE";
};
