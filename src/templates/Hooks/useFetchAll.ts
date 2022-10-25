import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import {
  config,
  data,
  defaultFileExtension,
  error,
  errorMessage,
  getServerErrorMessage,
  isLoading,
  response,
  useDefaultRQConfig,
  useMutation,
  useQuery,
  useQueryClient,
} from "../../stringConfig";
import { ModelExtensionName } from "../common/DTOTemplate";
import { GetDIContextName } from "../context/DIContext";
import { GetAllFuncName, GetRepositoryName } from "../Repository/Repository";

export const useFetchAllName = (featureName: string) => {
  return `useFetchAll${pascalCase(featureName)}`;
};

export const FETCH_ALL = (featureName: string) => {
  return `FETCH_ALL_${featureName.toUpperCase()}S`;
};

// prettier-ignore
export const GetUseFetchAllString = (featureName: string, dto: DTOSchema) => {
      return `
  import { ${useMutation}, ${useQueryClient} } from 'react-query';

    export const ${FETCH_ALL(dto.modelName)} = "${FETCH_ALL(dto.modelName)}";
  
  export const ${useFetchAllName(featureName)} = () => {
      const ${config} = ${useDefaultRQConfig}('${useFetchAllName(featureName)}');
  
      const { ${isLoading}, ${error}, ${data} } = ${useQuery}(
          [${FETCH_ALL(dto.modelName)}],
          async () => {
              const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${GetAllFuncName(featureName)}();
              return ${response} ? ${response}.map((${dto.modelName}) => ${ModelExtensionName(dto.modelName)}(${dto.modelName})) : undefined;
          },
          {
              ...${config},
          }
      );
  
      return {
          ${pluralCamelCase(dto.modelName)}: ${data},
          ${errorMessage}: ${error} ? ${getServerErrorMessage}(${error}) : undefined,
          ${isLoading},
      };
  };`
  }

const useFetchAllPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.stateQueriesPath}`;
};

export const RQFetchAllHook: ITemplate = {
  getName: useFetchAllName,
  getBody: GetUseFetchAllString,
  getRoute: useFetchAllPath,
  extension: defaultFileExtension,
};
