import { Commands } from "../..";
import { rhinoConfig } from "../../rhinoConfig";
import { IRepositoryTemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import {
  baseUrl,
  reactComponentExtension,
  requestDTO,
} from "../../stringConfig";
import { pascalCase } from "../../utils/stringUtils";
import { AxiosTemplate } from "../dataFetching/axios";
import { RepositoryInterface } from "./RepositoryInterface";

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
  commands: Commands[],
  createDTO?: DTOSchema,
  detailsDTO?: DTOSchema,
  updateDTO?: DTOSchema,
  listDTO?: DTOSchema,
) => {

  return `
    const ${baseUrl} = process.env.${rhinoConfig.envApiUrl};

    ${
        commands.find((c) => c === Commands.create) && createDTO ?
        `${AxiosTemplate.getCreateFuncString(featureName, createDTO, requestDTO)}` : ''
    }

    ${
        commands.find((c) => c === Commands.update) && updateDTO ?
        `${AxiosTemplate.getUpdateFuncString(featureName, updateDTO, requestDTO)}` : ''
    }

    ${
        commands.find((c) => c === Commands.delete) ?
        `${AxiosTemplate.getDeleteFuncString(featureName)}` : ''
    }

    ${
        commands.find((c) => c === Commands.details) && detailsDTO ?
        `${AxiosTemplate.getGetByIdFuncString(featureName, detailsDTO)}` : ''
    }

    ${
        commands.find((c) => c === Commands.list) && listDTO ?
        `${AxiosTemplate.getGetAllFuncString(featureName, listDTO)}` : ''
    }

    export const ${GetRepositoryName(featureName)}: ${RepositoryInterface.getName(featureName)} = {
        ${
            commands.find((c) => c === Commands.create) ?
            `${AxiosTemplate.getCreateFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === Commands.update) ?
            `${AxiosTemplate.getUpdateFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === Commands.delete) ?
            `${AxiosTemplate.getDeleteFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === Commands.details) ?
            `${AxiosTemplate.getGetByIdFuncName(featureName)},` : ''
        }
        ${
            commands.find((c) => c === Commands.list) ?
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
  extension: reactComponentExtension,
};
