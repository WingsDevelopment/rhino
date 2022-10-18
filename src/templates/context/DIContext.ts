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
