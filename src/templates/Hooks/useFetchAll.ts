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

export const useFetchAllName = (modelName: string) => {
  return `useFetchAll${pascalCase(modelName)}`;
};

// prettier-ignore
export const GetUseFetchAllString = (dto: DTOSchema, featureName: string) => {
      return `
  import { ${useMutation}, ${useQueryClient} } from 'react-query';
  
  export const ${useFetchAllName(dto.modelName)} = () => {
      const ${EnqueueMessage} = ${NotificationAdapter}();
      const ${queryClient} = ${useQueryClient}();
      const ${config} = ${useDefaultRQConfig}('useFetchAll${dto.modelName}');
  
      const { ${isLoading}, ${error}, ${mutateAsync} } = ${useMutation}(
          async () => {
              const ${response} = await ${GetDIContextName()}.${pascalCase(featureName)}Repository.FetchAll${pascalCase(dto.modelName)}Async();
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
          fetchAll${dto.modelName}Async: ${mutateAsync},
          ${errorMessage}: ${error} ? ${getServerErrorMessage}(${error}) : undefined,
          ${isLoading},
      };
  };`
  }
