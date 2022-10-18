import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  config,
  data,
  enabled,
  error,
  errorMessage,
  getServerErrorMessage,
  id,
  isLoading,
  response,
  useDefaultRQConfig,
  useQuery,
  useQueryClient,
} from "../common";
import { ModelExtensionName } from "../common/CreateDTO";
import { GetDIContextName } from "../context/DIContext";
import { GetByIdFuncName, GetRepositoryName } from "../Repository/Repository";

export const useFetchByIdName = (modelName: string) => {
  return `useFetch${pascalCase(modelName)}ById`;
};

export const FETCH_BY_ID = (modelName: string) => {
  return `FETCH_BY_${modelName.toUpperCase()}_ID`;
};

// prettier-ignore
export const GetUseFetchByIdString = (dto: DTOSchema, featureName: string) => {
      return `
  import { ${useQuery}, ${useQueryClient} } from 'react-query';
  
  export const ${FETCH_BY_ID(dto.modelName)} = "${FETCH_BY_ID(dto.modelName)}";
  
  export const ${useFetchByIdName(dto.modelName)} = (${id}: string | undefined) => {
      const ${config} = ${useDefaultRQConfig}('useFetch${dto.modelName}ById');
  
      const { ${isLoading}, ${error}, ${data} } = ${useQuery}(
            [${FETCH_BY_ID(dto.modelName)}, ${id}],
          async () => {
              const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${GetByIdFuncName(featureName)}(${id}!);
              return ${response} ? ${ModelExtensionName(dto.modelName)}(${response}) : undefined;
          },
          {
              ...${config},
              ${enabled}: !!${id},
          }
      );
  
      return {
          ${camelCase(dto.modelName)}: ${data},
          ${errorMessage}: ${error} ? ${getServerErrorMessage}(${error}) : undefined,
          ${isLoading},
      };
  };`
  }
