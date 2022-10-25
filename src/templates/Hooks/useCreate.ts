import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
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
import { CreateFuncName, GetRepositoryName } from "../Repository/Repository";
import { FETCH_ALL } from "./useFetchAll";

const useCreateName = (featureName: string) => {
  return `useCreate${pascalCase(featureName)}`;
};

// prettier-ignore
const GetUseCreateString = (featureName: string, dto: DTOSchema) => {
    return `
import { ${useMutation}, ${useQueryClient} } from 'react-query';

export const ${useCreateName(featureName)} = () => {
    const ${EnqueueMessage} = ${NotificationAdapter}();
    const ${queryClient} = ${useQueryClient}();
    const ${config} = ${useDefaultRQConfig}('useCreate${dto.modelName}');

    const { ${isLoading}, ${error}, ${mutateAsync} } = ${useMutation}(
        async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
            const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${CreateFuncName(featureName)}(${camelCase(dto.modelName)}DTOExtension(${camelCase(dto.modelName)}));
            return ${response};
        },
        {
            ...${config},
            onSuccess: () => {
                ${queryClient}.${invalidateQueries}([${FETCH_ALL(featureName)}]);
                ${EnqueueMessage}('${dto.modelName} is successfully created', 'success');
            },
        }
    );

    return {
        create${dto.modelName}Async: ${mutateAsync},
        ${errorMessage}: ${error} ? ${getServerErrorMessage}(${error}) : undefined,
        ${isLoading},
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
  extension: defaultFileExtension,
};
