import { mkdirSync, writeFileSync } from "fs";
import { rhinoConfig } from "..";
import { RhinoCommand } from "../enums/command";
import { DTOSchema } from "../models/DTOSchema";
import { DTONames } from "../utils/consoleInputUtils";
import { GetFinalTemplateData } from "./features/FeatureManager";
const fse = require("fs-extra");

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
  var source = "node_modules/react-crud-generator/src/init/rhino";
  var destination = "src/rhino";

  try {
    fse.copySync(source, destination);
  } catch (err) {
    console.error(err);
  }
};
