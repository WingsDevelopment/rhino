import { Commands } from "../..";
import { rhinoConfig } from "../../rhinoConfig";
import { IRoutesTemplate, ITemplate } from "../../interfaces/ITemplate";
import { pascalCase } from "../../utils/stringUtils";
import {
  createRoute,
  detailsRoute,
  indexRoute,
  reactComponentExtension,
  updateRoute,
} from "../../stringConfig";

export const GetRoutesName = (featureName: string) => {
  return `${pascalCase(featureName)}Routes`;
};

export const GetRoutesString = (featureName: string, commands: Commands[]) => {
  return `
    const ${pascalCase(featureName)}Root = \`/${featureName}\`;
    export const ${GetRoutesName(featureName)} = {
        root: ${pascalCase(featureName)}Root,
        ${
          commands.find((c) => c === Commands.create)
            ? `${createRoute}: \`\${${pascalCase(featureName)}Root}/create\`,`
            : ""
        }
        ${
          commands.find((c) => c === Commands.update)
            ? `${updateRoute}: \`\${${pascalCase(featureName)}Root}/update\`,`
            : ""
        }
        ${
          commands.find((c) => c === Commands.details)
            ? `${detailsRoute}: \`\${${pascalCase(featureName)}Root}/details\`,`
            : ""
        }
        ${
          commands.find((c) => c === Commands.list)
            ? `${indexRoute}: \`\${${pascalCase(featureName)}Root}/index\`,`
            : ""
        }
    };
`;
};

const RoutesPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.routesPath}`;
};

export const Routes: IRoutesTemplate = {
  getName: GetRoutesName,
  getBody: GetRoutesString,
  getRoute: RoutesPath,
  extension: reactComponentExtension,
};
