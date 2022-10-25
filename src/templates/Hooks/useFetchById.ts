import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  config,
  data,
  defaultFileExtension,
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
} from "../../stringConfig";
import { ModelExtensionName } from "../common/DTOTemplate";
import { GetDIContextName } from "../context/DIContext";
import { GetByIdFuncName, GetRepositoryName } from "../Repository/Repository";

export const useFetchByIdName = (featureName: string) => {
  return `useFetch${pascalCase(featureName)}ById`;
};

export const FETCH_BY_ID = (featureName: string) => {
  return `FETCH_BY_${featureName.toUpperCase()}_ID`;
};

// prettier-ignore
export const GetUseFetchByIdString = (featureName: string, dto: DTOSchema) => {
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

const useFetchByIdPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.stateQueriesPath}`;
};

export const RQFetchByIdHook: ITemplate = {
  getName: useFetchByIdName,
  getBody: GetUseFetchByIdString,
  getRoute: useFetchByIdPath,
  extension: defaultFileExtension,
};
