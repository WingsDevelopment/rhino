import { Commands } from "../..";
import { rhinoConfig } from "../../config";
import { IRepositoryTemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { reactComponentExtension } from "../../stringConfig";
import { pascalCase } from "../../utils/stringUtils";
import { GetRepositoryName } from "./Repository";

export const GetRepositoryIntefaceName = (featureName: string) => {
  return `I${GetRepositoryName(featureName)}`;
};

//prettier-ignore
export const GetRepositoryInterfaceString = (
  featureName: string,
  commands: Commands[],
  createDTO?: DTOSchema,
  detailsDTO?: DTOSchema,
  updateDTO?: DTOSchema,
  listDTO?: DTOSchema,
) => {
  return `
    export interface I${GetRepositoryName(featureName)} {
        ${
          commands.find((c) => c === Commands.create)
            ? `Create${pascalCase(featureName)}Async: (dto: ${createDTO?.dtoName}) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.update)
            ? `Update${pascalCase(featureName)}Async: (dto: ${updateDTO?.dtoName}) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.delete)
            ? `Delete${pascalCase(featureName)}Async: (id: string) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.details)
            ? `Get${pascalCase(featureName)}ByIdAsync: (id: string) => Promise<${detailsDTO?.dtoName} | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.list)
            ? `GetAll${pascalCase(featureName)}Async: () => Promise<${listDTO?.dtoName}[] | undefined>;`
            : ""
        }
    }
    `;
};

const RepositoryInterfacePath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.repositoryInterfacePath}`;
};

export const RepositoryInterface: IRepositoryTemplate = {
  getName: GetRepositoryIntefaceName,
  getBody: GetRepositoryInterfaceString,
  getRoute: RepositoryInterfacePath,
  extension: reactComponentExtension,
};
