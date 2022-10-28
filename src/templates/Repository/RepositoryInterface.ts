import { Commands } from "../..";
import { rhinoConfig } from "../../rhinoConfig";
import { IRepositoryTemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { reactComponentExtension } from "../../stringConfig";
import { AxiosTemplate } from "../dataFetching/axios";
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
            ? `${AxiosTemplate.getCreateFuncName(featureName)}: (dto: ${createDTO?.dtoName}) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.update)
            ? `${AxiosTemplate.getUpdateFuncName(featureName)}: (dto: ${updateDTO?.dtoName}) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.delete)
            ? `${AxiosTemplate.getDeleteFuncName(featureName)}: (id: string) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.details)
            ? `${AxiosTemplate.getGetByIdFuncName(featureName)}: (id: string) => Promise<${detailsDTO?.dtoName} | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === Commands.list)
            ? `${AxiosTemplate.getGetAllFuncName(featureName)}: () => Promise<${listDTO?.dtoName}[] | undefined>;`
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
