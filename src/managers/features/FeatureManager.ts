import {
  GetBaseFeatureTemplates,
  GetDTOTemplatesDataFromDTOs,
  GetModelTemplatesDataFromDTOs,
} from ".";
import { RhinoCommand } from "../../enums/command";
import { INesto } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { DTONames } from "../../utils/consoleInputUtils";
import { CreateCreateFeatureData } from "./CreateFeature";
import { CreateDetailsFeatureData } from "./DetailsFeature";
import { CreateListFeatureData } from "./ListFeature";
import { CreateUpdateFeatureData } from "./UpdateFeature";

export const GetFinalTemplateData = (
  allDTOs: {
    [key: string]: DTOSchema;
  },
  featureName: string,
  commands: RhinoCommand[],
  dtoNames: DTONames,
  basePath: string
) => {
  let finalData: INesto[] = [];
  let createDTO = undefined;
  let detailsDTO = undefined;
  let updateDTO = undefined;
  let listDTO = undefined;

  if (commands.includes(RhinoCommand.create) && dtoNames.create) {
    createDTO = allDTOs[dtoNames.create];
    if (createDTO) {
      const result = CreateCreateFeatureData(featureName, basePath, createDTO);
      finalData = [...finalData, ...result];
    }
  }

  if (commands.includes(RhinoCommand.details) && dtoNames.details) {
    detailsDTO = allDTOs[dtoNames.details];
    if (detailsDTO) {
      const result = CreateDetailsFeatureData(
        featureName,
        basePath,
        detailsDTO
      );
      finalData = [...finalData, ...result];
    }
  }

  if (commands.includes(RhinoCommand.update) && dtoNames.update) {
    updateDTO = allDTOs[dtoNames.update];
    if (updateDTO) {
      const result = CreateUpdateFeatureData(featureName, basePath, updateDTO);
      finalData = [...finalData, ...result];
    }
  }

  if (commands.includes(RhinoCommand.list) && dtoNames.list) {
    listDTO = allDTOs[dtoNames.list];
    if (listDTO) {
      const result = CreateListFeatureData(featureName, basePath, listDTO);
      finalData = [...finalData, ...result];
    }
  }

  if (!createDTO && !detailsDTO && !updateDTO && !listDTO) {
    throw new Error("No DTOS were found!");
  }

  const result = GetBaseFeatureTemplates(
    featureName,
    commands.map((c) => RhinoCommand[c as keyof typeof RhinoCommand]),
    basePath,
    createDTO,
    detailsDTO,
    updateDTO,
    listDTO
  );
  const dtos = GetDTOTemplatesDataFromDTOs(featureName, basePath, allDTOs);
  const models = GetModelTemplatesDataFromDTOs(featureName, basePath, allDTOs);

  finalData = [...finalData, ...result, ...dtos, ...models];

  return finalData;
};
