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
  CreateAllModelsAndDTOsFromDTOSchemas,
  CreateCreateFeature,
  CreateDetailsFeature,
} from "./FileManager";
import { DTOSchema } from "./models/DTOSchema";
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
let commandAndDTONames: { command: string; dtoName: string }[] = [];
let featureName: string | undefined = "";

rl.question(
  "Enter rhino command (featureName command dtoName command dtoName etc...)> ",
  (INPUT) => {
    let inputs = INPUT.split(" ");
    featureName = inputs.shift();
    if (!featureName) return;

    //todo: ne mora svaki drugi biti dtoName
    for (let i = 0; i < inputs.length - 1; i++) {
      commandAndDTONames.push({ command: inputs[i], dtoName: inputs[i + 1] });
      i++;
    }

    const dtoNames = getDTONamesFromInput(commandAndDTONames);
    const lcCommands = commandAndDTONames.map((c) => c.command.toLowerCase());

    const allDTOs = createDTOsWithDependencies(definitions, dtoNames);
    console.log(allDTOs);

    CreateAllModelsAndDTOsFromDTOSchemas(allDTOs, featureName);

    if (lcCommands.includes(Commands.Create) && dtoNames.create) {
      const dto = allDTOs[dtoNames.create];
      CreateCreateFeature(featureName, dto);
    }
    if (lcCommands.includes(Commands.Details) && dtoNames.details) {
      const schema = allDTOs[dtoNames.details];
      CreateDetailsFeature(featureName, schema);
    }

    rl.close();
  }
);
