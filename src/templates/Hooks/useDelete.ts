import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { pascalCase, plural } from "../../utils/stringUtils";
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
import { DeleteFuncName, GetRepositoryName } from "../Repository/Repository";
import { FETCH_ALL } from "./useFetchAll";

export const useDeleteName = (featureName: string) => {
  return `useDelete${pascalCase(featureName)}`;
};

// prettier-ignore
export const GetUseDeleteString = (featureName: string, dto: DTOSchema) => {
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
                  ${queryClient}.${invalidateQueries}([${FETCH_ALL(featureName)}]);
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

const useDeletePath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.stateMutationsPath}`;
};

export const RQDeleteHook: ITemplate = {
  getName: useDeleteName,
  getBody: GetUseDeleteString,
  getRoute: useDeletePath,
  extension: defaultFileExtension,
};
