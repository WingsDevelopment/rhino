//config
export const DTOExtensionRemove = "";
export const DTOExtensionAdd = "DTO";
export const ModelExtensionRemove = "DTO";
export const ModelExtensionAdd = "";

export const rhinoConfig = {
  //main config
  //specify the path to the DTOs in the schema from swagger
  chemaDTOPath: "components",
  envApiUrl: "REACT_APP_YOUR_API_URL",
  //state
  stateQueriesPath: "/state/queries",
  stateMutationsPath: "/state/mutations",
  //data
  repositoryPath: "/infrastructure/repositories",
  repositoryInterfacePath: "/infrastructure/interfaces",
  dtosPath: "/infrastructure/DTOs",
  modelsPath: "/models",
  //pages
  detailsPath: "/pages/Details",
  listPath: "/pages/Index",
  createPath: "/pages/Create",
  updatePath: "/pages/Update",
  //rest
  routesPath: "/routes",
  contextPath: "/context",
  //coming soon... :)
  useTemplate: "reactQuery",
  generateRepository: true,
  generateContext: true,
  generateRepositoryInterface: true,
  generateOnlyFolderStructure: false,
};
