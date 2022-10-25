//config
export const DTOExtensionRemove = "";
export const DTOExtensionAdd = "";
export const ModelExtensionRemove = "Dto";
export const ModelExtensionAdd = "";

export const config = {
  //specify the path to the DTOs in the schema
  chemaDTOPath: "components.schemas",
  //only options for now
  useTemplate: "reactQuery",
  generateRepository: true,
  generateContext: true,
  generateRepositoryInterface: true,
};
