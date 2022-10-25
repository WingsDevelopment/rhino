import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  config,
  defaultFileExtension,
  EnqueueMessage,
  error,
  errorMessage,
  getServerErrorMessage,
  invalidateQueries,
  isLoading,
  mutateAsync,
  NotificationAdapter,
  queryClient,
  response,
  useDefaultRQConfig,
  useMutation,
  useQueryClient,
} from "../../stringConfig";
import { GetDIContextName } from "../context/DIContext";
import { GetRepositoryName, UpdateFuncName } from "../Repository/Repository";
import { FETCH_ALL } from "./useFetchAll";

export const useUpdateName = (modelName: string) => {
  return `useUpdate${pascalCase(modelName)}`;
};

// prettier-ignore
export const GetUseUpdateString = (featureName: string, dto: DTOSchema) => {
      return `
  import { ${useMutation}, ${useQueryClient} } from 'react-query';
  
  export const ${useUpdateName(dto.modelName)} = () => {
      const ${EnqueueMessage} = ${NotificationAdapter}();
      const ${queryClient} = ${useQueryClient}();
      const ${config} = ${useDefaultRQConfig}('useUpdate${dto.modelName}');
  
      const { ${isLoading}, ${error}, ${mutateAsync} } = ${useMutation}(
          async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
              const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${UpdateFuncName(featureName)}(${camelCase(dto.modelName)}DTOExtension(${camelCase(dto.modelName)}));
              return ${response};
          },
          {
              ...${config},
              onSuccess: () => {
                  ${queryClient}.${invalidateQueries}([${FETCH_ALL(featureName)}]);
                  ${EnqueueMessage}('${dto.modelName} is successfully updated', 'success');
              },
          }
      );
  
      return {
          update${dto.modelName}Async: ${mutateAsync},
          ${errorMessage}: ${error} ? ${getServerErrorMessage}(${error}) : undefined,
          ${isLoading},
      };
  };`
  }

const useUpdatePath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.stateMutationsPath}`;
};

export const RQUpdateHook: ITemplate = {
  getName: useUpdateName,
  getBody: GetUseUpdateString,
  getRoute: useUpdatePath,
  extension: defaultFileExtension,
};
