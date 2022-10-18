import { Commands } from "../..";
import { pascalCase } from "../../utils/stringUtils";
import { create, details, index, update } from "../common";

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
            ? `${create}: \`\${${pascalCase(featureName)}Root}/create\`,`
            : ""
        }
        ${
          commands.find((c) => c === Commands.update)
            ? `${update}: \`\${${pascalCase(featureName)}Root}/update\`,`
            : ""
        }
        ${
          commands.find((c) => c === Commands.details)
            ? `${details}: \`\${${pascalCase(featureName)}Root}/details\`,`
            : ""
        }
        ${
          commands.find((c) => c === Commands.list)
            ? `${index}: \`\${${pascalCase(featureName)}Root}/index\`,`
            : ""
        }

    };
`;
};
