import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { FETCH_ALL } from "./useFetchAll";
import { ApiManager } from ".";
import { error } from "console";
import { config } from "process";
import { rsc } from "../../rhinoStringConfig";

const useCreateName = (featureName: string) => {
  return `useCreate${pascalCase(featureName)}`;
};

// prettier-ignore
const GetUseCreateString = (featureName: string, dto: DTOSchema) => {
    return `
import { ${rsc.useMutation}, ${rsc.useQueryClient} } from 'react-query';

export const ${useCreateName(featureName)} = () => {
    const ${rsc.EnqueueMessage} = ${rsc.NotificationAdapterInvoke};
    const ${rsc.queryClient} = ${rsc.useQueryClient}();
    const ${config} = ${rsc.useDefaultRQConfig}('${useCreateName(featureName)}');

    const { ${rsc.isLoading}, ${error}, ${rsc.mutateAsync} } = ${rsc.useMutation}(
        async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
            ${ApiManager.getCreateApiFunction(featureName, dto)}
        },
        {
            ...${config},
            onSuccess: () => {
                ${rsc.queryClient}.${rsc.invalidateQueries}([${FETCH_ALL(featureName)}]);
                ${rsc.EnqueueMessage}('${dto.modelName} is successfully created', 'success');
            },
        }
    );

    return {
        create${dto.modelName}Async: ${rsc.mutateAsync},
        ${rsc.errorMessage}: ${error} ? ${rsc.getServerErrorMessage}(${error}) : undefined,
        ${rsc.isLoading},
    };
};`
}

const useCreatePath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.stateMutationsPath}`;
};

export const RQCreateHook: ITemplate = {
  getName: useCreateName,
  getBody: GetUseCreateString,
  getRoute: useCreatePath,
  extension: rsc.defaultFileExtension,
};
