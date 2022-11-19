import { mkdirSync, writeFileSync } from "fs";
import { rhinoConfig } from "..";
import { RhinoCommand } from "../enums/command";
import { DTOSchema } from "../models/DTOSchema";
import { DTONames } from "../utils/consoleInputUtils";
import { GetFinalTemplateData } from "./features/FeatureManager";

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
