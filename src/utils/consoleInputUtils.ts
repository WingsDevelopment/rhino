import {
  DTOExtensionRemove,
  DTOExtensionAdd,
  ModelExtensionAdd,
} from "../config";

export interface DTONames {
  create?: string | undefined;
  details?: string | undefined;
  update?: string | undefined;
  list?: string | undefined;
}
export interface ModelNames {
  create?: string | undefined;
  details?: string | undefined;
  update?: string | undefined;
  list?: string | undefined;
}

export const getDTONamesFromInput = (
  input: {
    command: string;
    dtoName: string;
  }[]
): DTONames => {
  let dtoNames: DTONames = {
    create: "",
    details: "",
    update: "",
    list: "",
  };
  input.forEach(({ command, dtoName }) => {
    switch (command) {
      case "create":
        dtoNames.create = dtoName;
        break;
      case "details":
        dtoNames.details = dtoName;
        break;
      case "update":
        dtoNames.update = dtoName;
        break;
      case "list":
        dtoNames.list = dtoName;
        break;
    }
  });

  return dtoNames;
};

export const getDTONamesConfigured = (dtoNames: DTONames): DTONames => {
  const { create, details, update, list } = dtoNames;
  return {
    create: create?.replace(DTOExtensionRemove, DTOExtensionAdd),
    details: details?.replace(DTOExtensionRemove, DTOExtensionAdd),
    update: update?.replace(DTOExtensionRemove, DTOExtensionAdd),
    list: list?.replace(DTOExtensionRemove, DTOExtensionAdd),
  };
};

export const getModelNamesConfigured = (dtoNames: DTONames): ModelNames => {
  const { create, details, update, list } = dtoNames;

  const modelNames = {
    create: create?.replace(DTOExtensionAdd, ModelExtensionAdd),
    update: update?.replace(DTOExtensionAdd, ModelExtensionAdd),
    details: details?.replace(DTOExtensionAdd, ModelExtensionAdd),
    list: list?.replace(DTOExtensionAdd, ModelExtensionAdd),
  };

  if (!modelNames.update) modelNames.update = modelNames.create;
  if (!modelNames.list) modelNames.list = modelNames.create;
  if (!modelNames.details) modelNames.details = modelNames.create;

  return modelNames;
};
