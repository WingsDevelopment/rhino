import { RhinoCommand } from "../enums/command";
import { DTOSchema } from "../models/DTOSchema";

export interface INesto {
  name: string;
  body: string;
  route: string;
  extension: string;
}

export interface ITemplate {
  getName: (featureName: string) => string;
  getBody: (featureName: string, dto: DTOSchema) => string;
  getRoute: (featureName: string, baseRoute: string) => string;
  extension: string;
}

export interface IContextTemplate {
  getName: (featureName: string) => string;
  getBody: (featureName: string) => string;
  getRoute: (featureName: string, baseRoute: string) => string;
  extension: string;
}

export interface IRepositoryTemplate {
  getName: (featureName: string) => string;
  getBody: (
    featureName: string,
    commands: RhinoCommand[],
    createDTO?: DTOSchema,
    detailsDTO?: DTOSchema,
    updateDTO?: DTOSchema,
    listDTO?: DTOSchema
  ) => string;
  getRoute: (featureName: string, baseRoute: string) => string;
  extension: string;
}

export interface IRoutesTemplate {
  getName: (featureName: string) => string;
  getBody: (featureName: string, commands: RhinoCommand[]) => string;
  getRoute: (featureName: string, baseRoute: string) => string;
  extension: string;
}

export interface IInvokableTemplate {
  getName: (featureName: string) => string;
  getBody: (featureName: string, dto: DTOSchema) => string;
  getRoute: (featureName: string, baseRoute: string) => string;
  invoke: (featureName: string, modelName: string) => string;
  extension: string;
}
