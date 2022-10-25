import { mkdirSync, writeFileSync } from "fs";
import { Commands } from "..";
import { DTOSchema } from "../models/DTOSchema";
import { DTONames } from "../utils/consoleInputUtils";
import { GetFinalTemplateData } from "./features/FeatureManager";

export const GenerateFiles = (
  allDTOs: {
    [key: string]: DTOSchema;
  },
  featureName: string,
  commands: Commands[],
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
    writeFileSync(`${route}/${name}${extension}`, body);
  });
};
