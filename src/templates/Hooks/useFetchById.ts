import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { ApiManager } from ".";
import { rsc } from "../../rhinoStringConfig";

export const useFetchByIdName = (featureName: string) => {
  return `useFetch${pascalCase(featureName)}ById`;
};

export const FETCH_BY_ID = (featureName: string) => {
  return `FETCH_BY_${featureName.toUpperCase()}_ID`;
};

// prettier-ignore
export const GetUseFetchByIdString = (featureName: string, dto: DTOSchema) => {
      return `
  import { ${rsc.useQuery}, ${rsc.useQueryClient} } from 'react-query';
  
  export const ${FETCH_BY_ID(featureName)} = "${FETCH_BY_ID(featureName)}";
  
  export const ${useFetchByIdName(featureName)} = (${rsc.id}: string | undefined) => {
      const ${rsc.config} = ${rsc.useDefaultRQConfig}('${useFetchByIdName(featureName)}');
  
      const { ${rsc.isLoading}, ${rsc.error}, ${rsc.data} } = ${rsc.useQuery}(
            [${FETCH_BY_ID(featureName)}, ${rsc.id}],
          async () => {
            ${ApiManager.getFetchByIdApiFunction(featureName, dto)}
          },
          {
              ...${rsc.config},
              ${rsc.enabled}: !!${rsc.id},
          }
      );
  
      return {
          ${camelCase(dto.modelName)}: ${rsc.data},
          ${rsc.errorMessage}: ${rsc.error} ? ${rsc.getServerErrorMessage}(${rsc.error}) : undefined,
          ${rsc.isLoading},
      };
  };`
  }

const useFetchByIdPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.stateQueriesPath}`;
};

export const RQFetchByIdHook: ITemplate = {
  getName: useFetchByIdName,
  getBody: GetUseFetchByIdString,
  getRoute: useFetchByIdPath,
  extension: rsc.defaultFileExtension,
};
