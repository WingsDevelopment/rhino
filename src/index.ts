import { definitions as definitions } from "./openApiSchema.json";
import * as readline from "readline";
import { createDTOsWithDependencies } from "./DTOManager";
import {
  DTONames,
  getDtoName,
  getDTONamesFromInput,
  getModelNameFromDtoName,
  getModelNamesConfigured,
  ModelNames,
} from "./utils/consoleInputUtils";
import {
  GenerateAllModelsAndDTOsFromDTOSchemas as GenerateAllModelsAndDTOsFromDTOSchemas,
  GenerateCreateFeature,
  GenerateDetailsFeature,
} from "./FileManager";
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export enum Commands {
  Create = "create",
  Details = "details",
  Update = "update",
  List = "list",
}

rl.question(
  //example: TestFeatureName create Pet details Category
  "Enter rhino command (featureName command dtoName command dtoName etc...)> ",
  (INPUT) => {
    let inputs = INPUT.split(" ");
    let featureName = inputs.shift();
    if (!featureName) return;

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

    GenerateAllModelsAndDTOsFromDTOSchemas(allDTOs, featureName);

    if (lcCommands.includes(Commands.Create) && dtoNames.create)
      GenerateCreateFeature(featureName, allDTOs[dtoNames.create]);

    if (lcCommands.includes(Commands.Details) && dtoNames.details)
      GenerateDetailsFeature(featureName, allDTOs[dtoNames.details]);

    rl.close();
  }
);
