import {
  CommandPageNameDict,
  CommandPathsDict,
  CommandRouteDict,
} from "../../enums/dictionaries";
import { RhinoCommand } from "../../enums/command";
import { IRoutesTemplate } from "../../interfaces/ITemplate";
import { rhinoConfig } from "../..";
import { pascalCase } from "../../utils/stringUtils";
import { rsc } from "../../rhinoStringConfig";

const CommandsWithId: RhinoCommand[] = [
  RhinoCommand.details,
  RhinoCommand.update,
];

export const GetRoutesName = (featureName: string) => {
  return `${pascalCase(featureName)}Routes`;
};

//prettier-ignore
const getPath = (command: RhinoCommand, featureName: string) => {
  const path = `${pascalCase(featureName)}Routes.${(CommandRouteDict as any)[command]}`;
  if (CommandsWithId.includes(command)) {
    return path + `+ "/:id"`;
  }
  return path;
};

//prettier-ignore
export const GetRoutesIndexString = (
    featureName: string,
    commands: RhinoCommand[]
    ) => {
    return `
    import { lazy } from "react";
    import { RouteObject } from "react-router-dom";
    import LocalLoadable from 'src/components/LocalLoadable';

    ${commands.map(c => `const ${(CommandPageNameDict as any)[c](featureName)} = LocalLoadable(lazy(() => import("../${
        (CommandPathsDict as any)[c]
    }/${
        (CommandPageNameDict as any)[c](featureName)
    }")));`).join("\n")}

    const ${pascalCase(featureName)}Root = \`/${rsc.AppBasePath}/${featureName}\`;
    export const ${GetRoutesName(featureName)} = {
        root: ${pascalCase(featureName)}Root,
        ${commands.map((c: RhinoCommand) => 
          `${(CommandRouteDict as any)[c]}: \`\${${pascalCase(featureName)}Root}/${(CommandRouteDict as any)[c]}\`,`).join("\n")}
    };

    export const ${featureName}RouteObject: RouteObject = {
        path: ${pascalCase(featureName)}Routes.root,
        children: [
            ${commands.map(c => `{ path: ${getPath(c, featureName)}, element: <${(CommandPageNameDict as any)[c](featureName)} /> },`).join("\n")}
        ],
    };
    `;
};

const RoutesPath = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.routesPath}`;
};

export const Routes: IRoutesTemplate = {
  getName: GetRoutesName,
  getBody: GetRoutesIndexString,
  getRoute: RoutesPath,
  extension: rsc.reactComponentExtension,
};
