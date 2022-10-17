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
import {
  DetailsPageName,
  GetDetailsPageString,
} from "./templates/Details/DetailsPage";
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
    .map((key) => {
      return DTOs[key];
    })
    .forEach((dto) => {
      const modelString = GetCreateModelString(dto.modelName, dto);
      const dtoString = GetCreateDTOString(dto.dtoName, dto);

      writeFileSync(
        `${BaseModelsRoute(featureName)}/${dto.modelName}.ts`,
        modelString
      );
      writeFileSync(
        `${BaseDTOsRoute(featureName)}/${dto.dtoName}.ts`,
        dtoString
      );
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

export const CreateCreateFeature = (featureName: string, dto: DTOSchema) => {
  const createPageString = GetCreatePageString(
    featureName,
    dto,
    `Create ${featureName}`,
    [
      {
        name: `Create ${dto.modelName}`,
        href: `/${plural(dto.modelName)}`,
      },
    ]
  );
  const createFormString = GetCreateFormString(dto.modelName, dto);
  mkdirSync(CreatePageRoute(featureName), { recursive: true });

  writeFileSync(
    `${CreatePageRoute(featureName)}/${CreatePageName(dto.modelName)}`,
    createPageString
  );
  writeFileSync(
    `${CreatePageRoute(featureName)}/${CreateFormName(dto.modelName)}`,
    createFormString
  );
};

export const DetailsPageRoute = (featureName: string, modelName: string) => {
  return `./src/features/${featureName}/pages/Details`;
};

export const DetailsBodyRoute = (featureName: string, modelName: string) => {
  return `./src/features/${featureName}/pages/Details/components`;
};

export const CreateDetailsFeature = (featureName: string, dto: DTOSchema) => {
  const detailsBodyRoute = DetailsBodyRoute(featureName, dto.modelName);
  const detailsPage = GetDetailsPageString(
    featureName,
    dto,
    `Details ${featureName}`,
    [
      {
        name: `Details ${dto.modelName}`,
        href: `/${plural(dto.modelName)}`,
      },
    ]
  );
  mkdirSync(detailsBodyRoute, { recursive: true });
  writeFileSync(
    `${detailsBodyRoute}/${DetailsPageName(dto.modelName)}`,
    detailsPage
  );
};
