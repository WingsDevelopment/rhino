import { mkdirSync, writeFileSync } from "fs";
import { DTOSchema } from "./models/DTOSchema";
import { GetCreateDTOString } from "./templates/common/CreateDTO";
import { GetCreateModelString } from "./templates/common/CreateModel";
import {
  CreateFormName,
  GetCreateFormString,
} from "./templates/Create/CreateForm";
import {
  CreatePageName,
  GetCreatePageString,
} from "./templates/Create/CreatePage";
import { DetailsBodyName } from "./templates/Details/DetailsBody";
import {
  DetailsPageName,
  GetDetailsPageString,
} from "./templates/Details/DetailsPage";
import { DTONames, ModelNames } from "./utils/consoleInputUtils";
import { plural } from "./utils/stringUtils";

//todo config?
export const BaseModelsRoute = (featureName: string) => {
  return `./src/features/${featureName}/models`;
};
export const BaseDTOsRoute = (featureName: string) => {
  return `./src/features/${featureName}/infrastracture/DTOs`;
};

export const CreateAllModelsAndDTOsFromDTOSchemas = (
  DTOs: {
    [key: string]: DTOSchema;
  },
  featureName: string
) => {
  mkdirSync(BaseModelsRoute(featureName), { recursive: true });
  mkdirSync(BaseDTOsRoute(featureName), { recursive: true });
  //foreach dto in dtos
  Object.keys(DTOs)
    .map(key => {
      return DTOs[key];
    })
    .forEach(dto => {
      const modelString = GetCreateModelString(dto.name, dto);
      const dtoString = GetCreateDTOString(dto.name, dto);

      writeFileSync(
        `${BaseModelsRoute(featureName)}/${dto.name}.ts`,
        modelString
      );
      writeFileSync(`${BaseDTOsRoute(featureName)}/${dto.name}.ts`, dtoString);
    });
};

export const CreatePageRoute = (featureName: string) => {
  return `./src/features/${featureName}/pages/Create`;
};

export const CreateFormRoute = (featureName: string, modelName: string) => {
  return `./src/features/${featureName}/pages/Create/components/${CreateFormName(
    modelName
  )}`;
};

export const CreateCreateFeature = (
  featureName: string,
  modelName: string,
  dto: DTOSchema
) => {
  const createPageString = GetCreatePageString(
    featureName,
    dto,
    `Create ${featureName}`,
    [
      {
        name: `Create ${modelName}`,
        href: `/${plural(modelName)}`,
      },
    ]
  );
  const createFormString = GetCreateFormString(modelName, dto);
  mkdirSync(CreatePageRoute(featureName), { recursive: true });

  writeFileSync(
    `${CreatePageRoute(featureName)}/${CreatePageName(modelName)}`,
    createPageString
  );
  writeFileSync(
    `${CreatePageRoute(featureName)}/${CreateFormName(modelName)}`,
    createFormString
  );
};

export const DetailsPageRoute = (featureName: string, modelName: string) => {
  return `./src/features/${featureName}/pages/Details`;
};

export const DetailsBodyRoute = (featureName: string, modelName: string) => {
  return `./src/features/${featureName}/pages/Details/components`;
};

export const CreateDetailsFeature = (
  featureName: string,
  modelName: string,
  dto: DTOSchema
) => {
  const detailsBodyRoute = DetailsBodyRoute(featureName, modelName);
  const detailsPage = GetDetailsPageString(
    featureName,
    dto,
    `Details ${featureName}`,
    [
      {
        name: `Details ${modelName}`,
        href: `/${plural(modelName)}`,
      },
    ]
  );
  mkdirSync(detailsBodyRoute, { recursive: true });
  writeFileSync(
    `${detailsBodyRoute}/${DetailsPageName(modelName)}`,
    detailsPage
  );
};
