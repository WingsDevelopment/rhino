import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  config,
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
} from "../common";
import { GetDIContextName } from "../context/DIContext";
import { GetRepositoryName, UpdateFuncName } from "../Repository/Repository";
import { FETCH_ALL } from "./useFetchAll";

export const useUpdateName = (modelName: string) => {
  return `useUpdate${pascalCase(modelName)}`;
};

// prettier-ignore
export const GetUseUpdateString = (dto: DTOSchema, featureName: string) => {
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
                  ${queryClient}.${invalidateQueries}([${FETCH_ALL(dto.modelName)}]);
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
