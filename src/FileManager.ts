import { mkdirSync, writeFileSync } from "fs";
import { features } from "process";
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
  DetailsBodyName,
  GetDetailsBodyString,
} from "./templates/Details/DetailsBody";
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

export const GenerateAllModelsAndDTOsFromDTOSchemas = (
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
export const CreateFormRoute = (featureName: string) => {
  return `./src/features/${featureName}/pages/Create/components`;
};

export const GenerateCreateFeature = (featureName: string, dto: DTOSchema) => {
  const createPageString = GetCreatePageString(dto, `Create ${featureName}`, [
    {
      name: `Create ${dto.modelName}`,
      href: `/${plural(dto.modelName)}`,
    },
  ]);
  const createFormString = GetCreateFormString(dto);
  mkdirSync(CreatePageRoute(featureName), { recursive: true });
  mkdirSync(CreateFormRoute(featureName), { recursive: true });

  writeFileSync(
    `${CreatePageRoute(featureName)}/${CreatePageName(dto.modelName)}`,
    createPageString
  );
  writeFileSync(
    `${CreateFormRoute(featureName)}/${CreateFormName(dto.modelName)}`,
    createFormString
  );
};

export const DetailsPageRoute = (featureName: string) => {
  return `./src/features/${featureName}/pages/Details`;
};
export const DetailsBodyRoute = (featureName: string) => {
  return `./src/features/${featureName}/pages/Details/components`;
};

export const GenerateDetailsFeature = (featureName: string, dto: DTOSchema) => {
  const detailsPageRoute = DetailsPageRoute(featureName);
  const detailsPage = GetDetailsPageString(dto, `Details ${featureName}`, [
    {
      name: `Details ${dto.modelName}`,
      href: `/${plural(dto.modelName)}`,
    },
  ]);
  const detailsBodyString = GetDetailsBodyString(dto);
  mkdirSync(detailsPageRoute, { recursive: true });
  mkdirSync(DetailsBodyRoute(featureName), { recursive: true });
  writeFileSync(
    `${detailsPageRoute}/${DetailsPageName(dto.modelName)}`,
    detailsPage
  );
  writeFileSync(
    `${detailsPageRoute}/components/${DetailsBodyName(dto.modelName)}`,
    detailsBodyString
  );
};
