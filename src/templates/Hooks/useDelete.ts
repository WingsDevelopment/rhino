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

export const useDeleteName = (modelName: string) => {
  return `useDelete${pascalCase(modelName)}`;
};

// prettier-ignore
export const GetUseDeleteString = (dto: DTOSchema, featureName: string) => {
      return `
  import { ${useMutation}, ${useQueryClient} } from 'react-query';
  
  export const ${useDeleteName(dto.modelName)} = () => {
      const ${EnqueueMessage} = ${NotificationAdapter}();
      const ${queryClient} = ${useQueryClient}();
      const ${config} = ${useDefaultRQConfig}('useDelete${dto.modelName}');
  
      const { ${isLoading}, ${error}, ${mutateAsync} } = ${useMutation}(
          async (id: number) => {
              const ${response} = await ${GetDIContextName()}.${pascalCase(featureName)}Repository.Delete${pascalCase(dto.modelName)}Async(id);
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
