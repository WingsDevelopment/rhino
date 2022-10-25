import * as readline from "readline";
import {
  GenerateCreateFeature,
  GenerateDetailsFeature,
  GenerateFeatureBase,
  GenerateIndexFeature,
  GenerateUpdateFeature,
} from "./managers/FileManager";
import { createDTOsWithDependencies } from "./managers/DTOManager";
import schema from "./openApiSchema.json";
import { getDTONamesFromInput } from "./utils/consoleInputUtils";
import { config } from "./config";
import { getPropByString } from "./utils/objectUtils";

const definitions = getPropByString(schema, config.chemaDTOPath);

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export enum Commands {
  create = "create",
  details = "details",
  update = "update",
  list = "list",
  delete = "delete",
}

rl.question(
  //example: TestFeatureName create Pet details Category
  "Enter rhino command (featureName command dtoName command dtoName etc...)> ",
  (INPUT) => {
    let inputs = INPUT.split(" ");
    const basePath = inputs.shift();
    let featureName = inputs.shift();
    if (!featureName || !basePath) return;

    let commandAndDTONames: { command: string; dtoName: string }[] = [];

    //todo: ne mora svaki drugi biti dtoName
    for (let i = 0; i < inputs.length - 1; i++) {
      commandAndDTONames.push({ command: inputs[i], dtoName: inputs[i + 1] });
      i++;
    }

    const dtoNames = getDTONamesFromInput(commandAndDTONames);
    const lcCommands = commandAndDTONames.map((c) => c.command.toLowerCase());

    const allDTOs = createDTOsWithDependencies(definitions, dtoNames);
    console.log(allDTOs);

    GenerateFeatureBase(
      allDTOs,
      featureName,
      lcCommands.map((c) => Commands[c as keyof typeof Commands]),
      dtoNames,
      basePath
    );

    if (lcCommands.includes(Commands.create) && dtoNames.create)
      GenerateCreateFeature(featureName, allDTOs[dtoNames.create], basePath);

    if (lcCommands.includes(Commands.details) && dtoNames.details)
      GenerateDetailsFeature(featureName, allDTOs[dtoNames.details], basePath);

    if (lcCommands.includes(Commands.update) && dtoNames.update)
      GenerateUpdateFeature(featureName, allDTOs[dtoNames.update], basePath);

    if (lcCommands.includes(Commands.list) && dtoNames.list)
      GenerateIndexFeature(featureName, allDTOs[dtoNames.list], basePath);

    rl.close();
  }
);
