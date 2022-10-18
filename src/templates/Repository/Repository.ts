import { Commands } from "../..";
import { DTOSchema } from "../../models/DTOSchema";
import {
  pascalCase,
  pascalSeparatedWithUnderlineForEveryCapitalLetter,
} from "../../utils/stringUtils";

export const GetRepositoryName = (featureName: string) => {
  return `${pascalCase(featureName)}Repository`;
};

//prettier-ignore
export const GetRepositoryString = (
  featureName: string,
  createDTO: DTOSchema,
  commands: Commands[],
  detailsDTO?: DTOSchema,
  updateDTO?: DTOSchema,
  listDTO?: DTOSchema,
) => {
  return `
    //TODO: add api to environment? or delete this...
    const baseUrl = process.env.REACT_APP_${pascalSeparatedWithUnderlineForEveryCapitalLetter(featureName.toUpperCase())};

    ${
        commands.find((c) => c === Commands.create) ?
        `const Create${pascalCase(featureName)}Async = async (dto: ${createDTO?.dtoName} ): Promise<string | undefined> => {
            const response: AxiosResponse<{ id: string }> = await axios.post(
                \`\${baseUrl}/create\`,
                dto
            );

            return response.data;
        };` : ''
    }

    ${
        commands.find((c) => c === Commands.update) ?
        `const Update${pascalCase(featureName)}Async = async (dto: ${updateDTO?.dtoName} ): Promise<string | undefined> => {
            const response: AxiosResponse<{ id: string }> = await axios.post(
                \`\${baseUrl}/update\`,
                dto
            );

            return response.data;
        };` : ''
    }

    ${
        commands.find((c) => c === Commands.delete) ?
        `const Delete${pascalCase(featureName)}Async = async (id: string): Promise<string | undefined> => {
            const response: AxiosResponse<{ id: string }> = await axios.delete(
                \`\${baseUrl}/\${id}\`
            );

            return response.data;
        };` : ''
    }

    ${
        commands.find((c) => c === Commands.details) ?
        `const Get${pascalCase(featureName)}ByIdAsync = async (id: string): Promise<${detailsDTO?.dtoName} | undefined> => {
            const response: AxiosResponse<${detailsDTO?.dtoName}> = await axios.get(
                \`\${baseUrl}/\${id}\`
            );

            return response.data;
        };` : ''
    }

    ${
        commands.find((c) => c === Commands.list) ?
        `const GetAll${pascalCase(featureName)}Async = async (): Promise<${listDTO?.dtoName}[] | undefined> => {
            const response: AxiosResponse<${listDTO?.dtoName}[]> = await axios.get(
                \`\${baseUrl}\`/getAll
            );

            return response.data;
        };` : ''
    }

    export const ${GetRepositoryName(featureName)} = {
        ${
            commands.find((c) => c === Commands.create) ?
            `Create${pascalCase(featureName)}Async,` : ''
        }
        ${
            commands.find((c) => c === Commands.update) ?
            `Update${pascalCase(featureName)}Async,` : ''
        }
        ${
            commands.find((c) => c === Commands.delete) ?
            `Delete${pascalCase(featureName)}Async,` : ''
        }
        ${
            commands.find((c) => c === Commands.details) ?
            `Get${pascalCase(featureName)}ByIdAsync,` : ''
        }
        ${
            commands.find((c) => c === Commands.list) ?
            `GetAll${pascalCase(featureName)}Async,` : ''
        }
    };
`;
};
