import { rhinoConfig } from "../../cli";
import { IContextTemplate } from "../../interfaces/ITemplate";
import { rsc } from "../../rhinoStringConfig";
import { GetRepositoryName } from "../Repository/Repository";
import { GetRepositoryIntefaceName } from "../Repository/RepositoryInterface";

export const GetDIContextName = () => {
  return `DIContext`;
};

//prettier-ignore
export const GetDIContextTemplateString = (featureName: string) => {
    return `
    interface I${GetDIContextName()} {
        ${GetRepositoryName(featureName)}: ${GetRepositoryIntefaceName(featureName)};
    }

    export const ${GetDIContextName()}: I${GetDIContextName()} = {
        ${GetRepositoryName(featureName)}: ${GetRepositoryName(featureName)},
    };
`
};

const DIContextPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.contextPath}`;
};

export const DIContext: IContextTemplate = {
  getName: GetDIContextName,
  getBody: GetDIContextTemplateString,
  getRoute: DIContextPath,
  extension: rsc.defaultFileExtension,
};
