//config
export const DTOExtensionRemove = "";
export const DTOExtensionAdd = "";
export const ModelExtensionRemove = "Dto";
export const ModelExtensionAdd = "";

export const rhinoConfig = {
  //specify the path to the DTOs in the schema from swagger
  chemaDTOPath: "components.schemas",
  //wroking
  stateQueriesPath: "/state/queries",
  stateMutationsPath: "/state/mutations",
  contextPath: "/context",
  repositoryPath: "/infrastracture/repositories",
  repositoryInterfacePath: "/infrastracture/interfaces",
  dtosPath: "/infrastracture/DTOs",
  modelsPath: "/models",
  routesPath: "/routes",
  //pages
  detailsPath: "/pages/Details",
  listPath: "/pages/Index",
  createPath: "/pages/Create",
  updatePath: "/pages/Update",
  //only options for now
  useTemplate: "reactQuery",
  generateRepository: true,
  generateContext: true,
  generateRepositoryInterface: true,
};
