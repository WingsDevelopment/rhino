import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { FETCH_ALL } from "./useFetchAll";
import { ApiManager } from ".";
import { error } from "console";
import { config } from "process";
import { rsc } from "../../rhinoStringConfig";

export const useUpdateName = (modelName: string) => {
  return `useUpdate${pascalCase(modelName)}`;
};

// prettier-ignore
export const GetUseUpdateString = (featureName: string, dto: DTOSchema) => {
      return `
  import { ${rsc.useMutation}, ${rsc.useQueryClient} } from 'react-query';
  
  export const ${useUpdateName(dto.modelName)} = () => {
      const ${rsc.EnqueueMessage} = ${rsc.NotificationAdapterInvoke};
      const ${rsc.queryClient} = ${rsc.useQueryClient}();
      const ${config} = ${rsc.useDefaultRQConfig}('useUpdate${dto.modelName}');
  
      const { ${rsc.isLoading}, ${error}, ${rsc.mutateAsync} } = ${rsc.useMutation}(
          async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
            ${ApiManager.getUpdateApiFunction(featureName, dto)}
          },
          {
              ...${config},
              onSuccess: () => {
                  ${rsc.queryClient}.${rsc.invalidateQueries}([${FETCH_ALL(featureName)}]);
                  ${rsc.EnqueueMessage}('${dto.modelName} is successfully updated', 'success');
              },
          }
      );
  
      return {
          update${dto.modelName}Async: ${rsc.mutateAsync},
          ${rsc.errorMessage}: ${error} ? ${rsc.getServerErrorMessage}(${error}) : undefined,
          ${rsc.isLoading},
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
  extension: rsc.defaultFileExtension,
};
