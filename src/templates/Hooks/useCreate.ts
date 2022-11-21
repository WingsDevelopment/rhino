import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { FETCH_ALL } from "./useFetchAll";
import { ApiManager } from ".";
import { rsc } from "../../rhinoStringConfig";

const useCreateName = (featureName: string) => {
  return `useCreate${pascalCase(featureName)}`;
};

// prettier-ignore
const GetUseCreateString = (featureName: string, dto: DTOSchema) => {
    return `
import { ${rsc.useMutation}, ${rsc.useQueryClient} } from 'react-query';

export const ${FETCH_ALL(featureName)} = "${FETCH_ALL(featureName)}"; 

export const ${useCreateName(featureName)} = () => {
    const { ${rsc.EnqueueMessage} } = ${rsc.GlobalDIContext}.${rsc.NotificationService};
    const ${rsc.queryClient} = ${rsc.useQueryClient}();
    const ${rsc.config} = ${rsc.useDefaultRQConfig}('${useCreateName(featureName)}');

    const { ${rsc.isLoading}, ${rsc.error}, ${rsc.mutateAsync} } = ${rsc.useMutation}(
        async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
            ${ApiManager.getCreateApiFunction(featureName, dto)}
        },
        {
            ...${rsc.config},
            onSuccess: () => {
                ${rsc.queryClient}.${rsc.invalidateQueries}([${FETCH_ALL(featureName)}]);
                ${rsc.EnqueueMessage}('${dto.modelName} is successfully created', 'success');
            },
        }
    );

    return {
        create${dto.modelName}Async: ${rsc.mutateAsync},
        ${rsc.errorMessage}: ${rsc.error} ? ${rsc.getServerErrorMessage}(${rsc.error}) : undefined,
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
