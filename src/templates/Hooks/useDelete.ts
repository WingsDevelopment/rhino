import { DTOSchema } from "../../models/DTOSchema";
import { pascalCase, plural } from "../../utils/stringUtils";
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
import { DeleteFuncName, GetRepositoryName } from "../Repository/Repository";

export const useDeleteName = (featureName: string) => {
  return `useDelete${pascalCase(featureName)}`;
};

// prettier-ignore
export const GetUseDeleteString = (dto: DTOSchema, featureName: string) => {
      return `
  import { ${useMutation}, ${useQueryClient} } from 'react-query';
  
  export const ${useDeleteName(featureName)} = () => {
      const ${EnqueueMessage} = ${NotificationAdapter}();
      const ${queryClient} = ${useQueryClient}();
      const ${config} = ${useDefaultRQConfig}('useDelete${dto.modelName}');
  
      const { ${isLoading}, ${error}, ${mutateAsync} } = ${useMutation}(
          async (id: string) => {
              const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${DeleteFuncName(featureName)}(id);
              return ${response};
          },
          {
              ...${config},
              onSuccess: () => {
                  ${queryClient}.${invalidateQueries}([FETCH_ALL_${plural(dto.modelName).toUpperCase()}]);
                  ${EnqueueMessage}('${dto.modelName} is successfully deleted', 'success');
              },
          }
      );
  
      return {
          delete${dto.modelName}Async: ${mutateAsync},
          ${errorMessage}: ${error} ? ${getServerErrorMessage}(${error}) : undefined,
          ${isLoading},
      };
  };`
  }
