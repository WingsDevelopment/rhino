import { Commands } from "..";
import {
  ITemplate,
  INesto,
  IRepositoryTemplate,
  IInvokableTemplate,
  IRoutesTemplate,
} from "../interfaces/ITemplate";
import { DTOSchema } from "../models/DTOSchema";

export const createFeatureDataFromITemplates = (
  templates: ITemplate[],
  dto: DTOSchema,
  featureName: string,
  baseRoute: string
): INesto[] => {
  return templates.map((template) => ({
    name: template.getName(featureName),
    body: template.getBody(featureName, dto),
    route: template.getRoute(featureName, baseRoute),
    extension: template.extension,
  }));
};

export const createFeatureDataFromIRepositoryTemplates = (
  templates: IRepositoryTemplate[],
  createDTO: DTOSchema,
  commands: Commands[],
  featureName: string,
  baseRoute: string,
  detailsDTO?: DTOSchema,
  updateDTO?: DTOSchema,
  listDTO?: DTOSchema
): INesto[] => {
  return templates.map((template) => ({
    name: template.getName(featureName),
    body: template.getBody(
      featureName,
      commands,
      createDTO,
      detailsDTO,
      updateDTO,
      listDTO
    ),
    route: template.getRoute(featureName, baseRoute),
    extension: template.extension,
  }));
};

export const createFeatureDataFromIInvokableTemplates = (
  templates: IInvokableTemplate[],
  dto: DTOSchema,
  featureName: string,
  baseRoute: string
): INesto[] => {
  return templates.map((template) => ({
    name: template.getName(featureName),
    body: template.getBody(featureName, dto),
    route: template.getRoute(featureName, baseRoute),
    extension: template.extension,
  }));
};

export const createFeatureDataFromIRoutesTemplates = (
  templates: IRoutesTemplate[],
  commands: Commands[],
  featureName: string,
  baseRoute: string
): INesto[] => {
  return templates.map((template) => ({
    name: template.getName(featureName),
    body: template.getBody(featureName, commands),
    route: template.getRoute(featureName, baseRoute),
    extension: template.extension,
  }));
};
