import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
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
import { CreateFuncName, GetRepositoryName } from "../Repository/Repository";

export const useCreateName = (modelName: string) => {
  return `useCreate${pascalCase(modelName)}`;
};

// prettier-ignore
export const GetUseCreateString = (dto: DTOSchema, featureName: string) => {
    return `
import { ${useMutation}, ${useQueryClient} } from 'react-query';

export const ${useCreateName(dto.modelName)} = () => {
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
                ${queryClient}.${invalidateQueries}([FETCH_ALL_${plural(dto.modelName).toUpperCase()}]);
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
