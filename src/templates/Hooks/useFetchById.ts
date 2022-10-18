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

export const useFetchByIdName = (modelName: string) => {
  return `useFetch${pascalCase(modelName)}ById`;
};

// prettier-ignore
export const GetUseFetchByIdString = (dto: DTOSchema, featureName: string) => {
      return `
  import { ${useMutation}, ${useQueryClient} } from 'react-query';
  
  export const ${useFetchByIdName(dto.modelName)} = () => {
      const ${EnqueueMessage} = ${NotificationAdapter}();
      const ${queryClient} = ${useQueryClient}();
      const ${config} = ${useDefaultRQConfig}('useFetch${dto.modelName}ById');
  
      const { ${isLoading}, ${error}, ${mutateAsync} } = ${useMutation}(
          async (id: number) => {
              const ${response} = await ${GetDIContextName()}.${pascalCase(featureName)}Repository.Fetch${pascalCase(dto.modelName)}ByIdAsync(id);
              return ${response};
          },
          {
              ...${config},
              onSuccess: () => {
                  ${queryClient}.${invalidateQueries}([FETCH_ALL_${plural(dto.modelName).toUpperCase()}]);
                  ${EnqueueMessage}('${dto.modelName} is successfully fetched', 'success');
              },
          }
      );
  
      return {
          fetch${dto.modelName}ByIdAsync: ${mutateAsync},
          ${errorMessage}: ${error} ? ${getServerErrorMessage}(${error}) : undefined,
          ${isLoading},
      };
  };`
  }
