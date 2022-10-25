import { Commands } from "../..";
import {
  INesto,
  ITemplate,
  IInvokableTemplate,
} from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { DTOTemplate } from "../../templates/common/DTOTemplate";
import { ModelTemplate } from "../../templates/common/ModelTemplate";
import { DIContext } from "../../templates/context/DIContext";
import { Repository } from "../../templates/Repository/Repository";
import { RepositoryInterface } from "../../templates/Repository/RepositoryInterface";
import { Routes } from "../../templates/routes/routes";

export const GetBaseFeatureTemplates = (
  featureName: string,
  commands: Commands[],
  basePath: string,
  createDTO?: DTOSchema,
  detailsDTO?: DTOSchema,
  updateDTO?: DTOSchema,
  listDTO?: DTOSchema
): INesto[] => {
  const templates: INesto[] = [];
  templates.push({
    name: Repository.getName(featureName),
    body: Repository.getBody(
      featureName,
      commands,
      createDTO,
      detailsDTO,
      updateDTO,
      listDTO
    ),
    route: Repository.getRoute(featureName, basePath),
    extension: Repository.extension,
  });
  templates.push({
    name: RepositoryInterface.getName(featureName),
    body: RepositoryInterface.getBody(
      featureName,
      commands,
      createDTO,
      detailsDTO,
      updateDTO,
      listDTO
    ),
    route: RepositoryInterface.getRoute(featureName, basePath),
    extension: RepositoryInterface.extension,
  });
  templates.push({
    name: DIContext.getName(featureName),
    body: DIContext.getBody(featureName),
    route: DIContext.getRoute(featureName, basePath),
    extension: DIContext.extension,
  });
  templates.push({
    name: Routes.getName(featureName),
    body: Routes.getBody(featureName, commands),
    route: Routes.getRoute(featureName, basePath),
    extension: Routes.extension,
  });
  return templates;
};

export const GetTemplatesDataByTemplates = (
  featureName: string,
  basePath: string,
  dto: DTOSchema,
  templates: (ITemplate | IInvokableTemplate)[]
): INesto[] => {
  const nesto: INesto[] = [];
  templates.forEach((template) => {
    nesto.push({
      name: template.getName(featureName),
      body: template.getBody(featureName, dto),
      route: template.getRoute(featureName, basePath),
      extension: template.extension,
    });
  });
  return nesto;
};

export const GetDTOTemplatesDataFromDTOs = (
  featureName: string,
  basePath: string,
  allDTOs: {
    [key: string]: DTOSchema;
  }
): INesto[] => {
  const nesto: INesto[] = [];
  Object.keys(allDTOs).forEach((key) => {
    const dto = allDTOs[key];
    nesto.push({
      name: DTOTemplate.getName(dto.dtoName),
      body: DTOTemplate.getBody(dto.dtoName, dto),
      route: DTOTemplate.getRoute(featureName, basePath),
      extension: DTOTemplate.extension,
    });
  });

  return nesto;
};

export const GetModelTemplatesDataFromDTOs = (
  featureName: string,
  basePath: string,
  allDTOs: {
    [key: string]: DTOSchema;
  }
): INesto[] => {
  let nesto: INesto[] = [];

  Object.keys(allDTOs).forEach((key) => {
    const dto = allDTOs[key];
    nesto.push({
      name: ModelTemplate.getName(dto.modelName),
      body: ModelTemplate.getBody(dto.modelName, dto),
      route: ModelTemplate.getRoute(featureName, basePath),
      extension: ModelTemplate.extension,
    });
  });

  return nesto;
};
