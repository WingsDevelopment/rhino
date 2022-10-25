import { rhinoConfig } from "../../config";
import { IContextTemplate } from "../../interfaces/ITemplate";
import { defaultFileExtension } from "../../stringConfig";
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
  extension: defaultFileExtension,
};
