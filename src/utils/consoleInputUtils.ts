import {
  DTOExtensionAdd,
  ModelExtensionAdd,
  ModelExtensionRemove,
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

export const getCommandsFromInput = (
  input: {
    command: string;
    dtoName: string;
  }[]
): string[] => {
  let commands: string[] = [];
  input.forEach(({ command }) => {
    commands.push(command);
  });

  return commands;
};

export const getDTONamesConfigured = (dtoNames: DTONames): DTONames => {
  const { create, details, update, list } = dtoNames;
  const names = {
    create: create ? getDtoName(create) : undefined,
    details: details ? getDtoName(details) : undefined,
    update: update ? getDtoName(update) : undefined,
    list: list ? getDtoName(list) : undefined,
  };

  if (!names.update) names.update = names.create;
  if (!names.details) names.details = names.create;
  if (!names.list) names.list = names.create;

  return names;
};

export const getModelNamesConfigured = (dtoNames: DTONames): ModelNames => {
  const { create, details, update, list } = dtoNames;

  const modelNames = {
    create: create ? getModelNameFromDtoName(create) : undefined,
    update: update ? getModelNameFromDtoName(update) : undefined,
    details: details ? getModelNameFromDtoName(details) : undefined,
    list: list ? getModelNameFromDtoName(list) : undefined,
  };

  if (!modelNames.update) modelNames.update = modelNames.create;
  if (!modelNames.list) modelNames.list = modelNames.create;
  if (!modelNames.details) modelNames.details = modelNames.create;

  return modelNames;
};

export const getDtoName = (dtoName: string): string => {
  return dtoName + DTOExtensionAdd;
};

export const getModelName = (modelName: string): string => {
  return modelName + ModelExtensionAdd;
};
export const getModelNameFromDtoName = (dtoName: string): string => {
  const name = dtoName.replace(ModelExtensionRemove, ModelExtensionAdd);
  return name;
};
