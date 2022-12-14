import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import { ApiManager } from ".";
import { rsc } from "../../rhinoStringConfig";

export const useFetchAllName = (featureName: string) => {
  return `useFetchAll${pascalCase(featureName)}`;
};

export const FETCH_ALL = (featureName: string) => {
  return `FETCH_ALL_${featureName.toUpperCase()}S`;
};

// prettier-ignore
export const GetUseFetchAllString = (featureName: string, dto: DTOSchema) => {
      return `
  import { ${rsc.useMutation}, ${rsc.useQueryClient} } from 'react-query';

    export const ${FETCH_ALL(featureName)} = "${FETCH_ALL(featureName)}";
  
  export const ${useFetchAllName(featureName)} = () => {
      const ${rsc.config} = ${rsc.useDefaultRQConfig}('${useFetchAllName(featureName)}');
  
      const { ${rsc.isLoading}, ${rsc.error}, ${rsc.data} } = ${rsc.useQuery}(
          [${FETCH_ALL(featureName)}],
          async () => {
            ${ApiManager.getFetchAllApiFunction(featureName, dto)}
          },
          {
              ...${rsc.config},
          }
      );
  
      return {
          ${pluralCamelCase(dto.modelName)}: ${rsc.data},
          ${rsc.errorMessage}: ${rsc.error} ? ${rsc.getServerErrorMessage}(${rsc.error}) : undefined,
          ${rsc.isLoading},
      };
  };`
  }

const useFetchAllPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.stateQueriesPath}`;
};

export const RQFetchAllHook: ITemplate = {
  getName: useFetchAllName,
  getBody: GetUseFetchAllString,
  getRoute: useFetchAllPath,
  extension: rsc.defaultFileExtension,
};
