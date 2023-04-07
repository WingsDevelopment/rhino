import { rhinoConfig } from "../..";
import { IRepositoryTemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { AxiosTemplate } from "../dataFetching/axios";
import { GetRepositoryName } from "./Repository";
import { RhinoCommand } from "../../enums/command";
import { rsc } from "../../rhinoStringConfig";

export const GetRepositoryIntefaceName = (featureName: string) => {
  return `I${GetRepositoryName(featureName)}`;
};

//prettier-ignore
export const GetRepositoryInterfaceString = (
  featureName: string,
  commands: RhinoCommand[],
  createDTO?: DTOSchema,
  detailsDTO?: DTOSchema,
  updateDTO?: DTOSchema,
  listDTO?: DTOSchema,
) => {
  return `
    export interface I${GetRepositoryName(featureName)} {
        ${
          commands.find((c) => c === RhinoCommand.create)
            ? `${AxiosTemplate.getCreateFuncName(featureName)}: (dto: ${createDTO?.dtoName}) => Promise<${createDTO?.dtoName} | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === RhinoCommand.update)
            ? `${AxiosTemplate.getUpdateFuncName(featureName)}: (dto: ${updateDTO?.dtoName}) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === RhinoCommand.delete)
            ? `${AxiosTemplate.getDeleteFuncName(featureName)}: (id: string) => Promise<string | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === RhinoCommand.details)
            ? `${AxiosTemplate.getGetByIdFuncName(featureName)}: (id: string) => Promise<${detailsDTO?.dtoName} | undefined>;`
            : ""
        }
        ${
          commands.find((c) => c === RhinoCommand.list)
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
  extension: rsc.reactComponentExtension,
};
