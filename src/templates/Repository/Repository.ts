import { rhinoConfig } from "../..";
import { IRepositoryTemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { pascalCase } from "../../utils/stringUtils";
import { AxiosTemplate } from "../dataFetching/axios";
import { RepositoryInterface } from "./RepositoryInterface";
import { RhinoCommand } from "../../enums/command";
import { rsc } from "../../rhinoStringConfig";

export const GetRepositoryName = (featureName: string) => {
  return `${pascalCase(featureName)}Repository`;
};

export const GetByIdFuncName = (featureName: string): string => {
  return `Get${pascalCase(featureName)}ByIdAsync`;
};

export const DeleteFuncName = (featureName: string): string => {
  return `Delete${pascalCase(featureName)}Async`;
};

export const UpdateFuncName = (featureName: string): string => {
  return `Update${pascalCase(featureName)}Async`;
};

export const CreateFuncName = (featureName: string): string => {
  return `Create${pascalCase(featureName)}Async`;
};

export const GetAllFuncName = (featureName: string): string => {
  return `GetAll${pascalCase(featureName)}Async`;
};

//prettier-ignore
export const GetRepositoryString = (
  featureName: string,
  commands: RhinoCommand[],
  createDTO?: DTOSchema,
  detailsDTO?: DTOSchema,
  updateDTO?: DTOSchema,
  listDTO?: DTOSchema,
) => {

  return `
    const ${rsc.baseUrl} = process.env.${rhinoConfig.envApiUrl};

    ${
        commands.find((c) => c === RhinoCommand.create) && createDTO ?
        `${AxiosTemplate.getCreateFuncString(featureName, createDTO, rsc.requestDTO)}` : ''
    }

    ${
        commands.find((c) => c === RhinoCommand.update) && updateDTO ?
        `${AxiosTemplate.getUpdateFuncString(featureName, updateDTO, rsc.requestDTO)}` : ''
    }

    ${
        commands.find((c) => c === RhinoCommand.delete) ?
        `${AxiosTemplate.getDeleteFuncString(featureName)}` : ''
    }

    ${
        commands.find((c) => c === RhinoCommand.details) && detailsDTO ?
        `${AxiosTemplate.getGetByIdFuncString(featureName, detailsDTO)}` : ''
    }

    ${
        commands.find((c) => c === RhinoCommand.list) && listDTO ?
        `${AxiosTemplate.getGetAllFuncString(featureName, listDTO)}` : ''
    }

    export const ${GetRepositoryName(featureName)}: ${RepositoryInterface.getName(featureName)} = {
        ${
            commands.find((c) => c === RhinoCommand.create) ?
            `${AxiosTemplate.getCreateFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === RhinoCommand.update) ?
            `${AxiosTemplate.getUpdateFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === RhinoCommand.delete) ?
            `${AxiosTemplate.getDeleteFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === RhinoCommand.details) ?
            `${AxiosTemplate.getGetByIdFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === RhinoCommand.list) ?
            `${AxiosTemplate.getGetAllFuncName(featureName)},` : ''
        }
    };
`;
};

const RepositoryPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.repositoryPath}`;
};

export const Repository: IRepositoryTemplate = {
  getName: GetRepositoryName,
  getBody: GetRepositoryString,
  getRoute: RepositoryPath,
  extension: rsc.reactComponentExtension,
};
