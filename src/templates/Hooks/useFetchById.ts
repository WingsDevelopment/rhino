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

export const useFetchByIdName = (featureName: string) => {
  return `useFetch${pascalCase(featureName)}ById`;
};

export const FETCH_BY_ID = (featureName: string) => {
  return `FETCH_BY_${featureName.toUpperCase()}_ID`;
};

// prettier-ignore
export const GetUseFetchByIdString = (dto: DTOSchema, featureName: string) => {
      return `
  import { ${useQuery}, ${useQueryClient} } from 'react-query';
  
  export const ${FETCH_BY_ID(featureName)} = "${FETCH_BY_ID(featureName)}";
  
  export const ${useFetchByIdName(featureName)} = (${id}: string | undefined) => {
      const ${config} = ${useDefaultRQConfig}('${useFetchByIdName(featureName)}');
  
      const { ${isLoading}, ${error}, ${data} } = ${useQuery}(
            [${FETCH_BY_ID(featureName)}, ${id}],
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
