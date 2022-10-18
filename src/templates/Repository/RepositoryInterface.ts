import { Commands } from "../..";
import { DTOSchema } from "../../models/DTOSchema";
import { pascalCase } from "../../utils/stringUtils";
import { GetRepositoryName } from "./Repository";

export const GetRepositoryIntefaceName = (featureName: string) => {
  return `I${GetRepositoryName(featureName)}`;
};

//prettier-ignore
export const GetRepositoryInterfaceString = (
  featureName: string,
  DTO: DTOSchema,
  commands: Commands[],
  createDTO?: DTOSchema,
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
            ? `Get${pascalCase(featureName)}ByIdAsync: (id: string) => Promise<${DTO.dtoName} | undefined>;`
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
