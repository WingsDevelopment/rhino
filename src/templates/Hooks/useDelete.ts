import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { pascalCase, plural } from "../../utils/stringUtils";
import { GetDIContextName } from "../context/DIContext";
import { DeleteFuncName, GetRepositoryName } from "../Repository/Repository";
import { FETCH_ALL } from "./useFetchAll";
import { ApiManager } from ".";
import { error } from "console";
import { config } from "process";
import { rsc } from "../../rhinoStringConfig";

export const useDeleteName = (featureName: string) => {
  return `useDelete${pascalCase(featureName)}`;
};

// prettier-ignore
export const GetUseDeleteString = (featureName: string, dto: DTOSchema) => {
      return `
  import { ${rsc.useMutation}, ${rsc.useQueryClient} } from 'react-query';
  
  export const ${useDeleteName(featureName)} = () => {
      const ${rsc.EnqueueMessage} = ${rsc.NotificationAdapterInvoke};
      const ${rsc.queryClient} = ${rsc.useQueryClient}();
      const ${config} = ${rsc.useDefaultRQConfig}('useDelete${dto.modelName}');
  
      const { ${rsc.isLoading}, ${error}, ${rsc.mutateAsync} } = ${rsc.useMutation}(
          async (id: string) => {
              ${ApiManager.getDeleteApiFunction(featureName, dto)}
          },
          {
              ...${config},
              onSuccess: () => {
                  ${rsc.queryClient}.${rsc.invalidateQueries}([${FETCH_ALL(featureName)}]);
                  ${rsc.EnqueueMessage}('${dto.modelName} is successfully deleted', 'success');
              },
          }
      );
  
      return {
          delete${dto.modelName}Async: ${rsc.mutateAsync},
          ${rsc.errorMessage}: ${error} ? ${rsc.getServerErrorMessage}(${error}) : undefined,
          ${rsc.isLoading},
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
  extension: rsc.defaultFileExtension,
};
