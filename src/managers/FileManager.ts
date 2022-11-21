import { mkdirSync, writeFileSync } from "fs";
import { rhinoConfig, rhinoOpenApiSchema } from "..";
import { defaultRhinoConfig } from "../init/defaultRhinoConfig";
import { defaultRhinoOpenApiSchema } from "../init/rhinoOpenApiSchema";
import { RhinoCommand } from "../enums/command";
import { DTOSchema } from "../models/DTOSchema";
import { DTONames } from "../utils/consoleInputUtils";
import { GetFinalTemplateData } from "./features/FeatureManager";
var fs = require("fs-extra");

export const GenerateFiles = (
  allDTOs: {
    [key: string]: DTOSchema;
  },
  featureName: string,
  commands: RhinoCommand[],
  dtoNames: DTONames,
  basePath: string
) => {
  const finalTemplateData = GetFinalTemplateData(
    allDTOs,
    featureName,
    commands,
    dtoNames,
    basePath
  );

  finalTemplateData.forEach((templateData) => {
    const { body, name, route, extension } = templateData;
    mkdirSync(route, { recursive: true });
    if (!rhinoConfig.generateOnlyFolderStructure) {
      writeFileSync(`${route}/${name}${extension}`, body);
    }
  });
};

export const GenerateInitFiles = () => {
  var rootComponents = "node_modules/react-crud-generator/src/init/rhino";
  var rootComponentsDestination = "src/rhino";

  // copy source folder to destination
  fs.copy(rootComponents, rootComponentsDestination, function (err: any) {
    if (err) {
      console.log("An error occured while copying the folder.");
      return console.error(err);
    }
  });

  writeFileSync(rhinoConfig, JSON.stringify(defaultRhinoConfig, null, 2));
  writeFileSync(
    rhinoOpenApiSchema,
    JSON.stringify(defaultRhinoOpenApiSchema, null, 2)
  );
};
