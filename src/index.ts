import * as readline from "readline";
import { createDTOsWithDependencies } from "./managers/DTOManager";
import schema from "./openApiSchema.json";
import { getDTONamesFromInput } from "./utils/consoleInputUtils";
import { rhinoConfig } from "./config";
import { getPropByString } from "./utils/objectUtils";
import { GenerateFiles } from "./managers/FileManager";

const definitions = getPropByString(schema, rhinoConfig.chemaDTOPath);

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
  "Rhino (path|f|comm|dto|comm|dto|comm|dto..) (create/details/update/list available currently)> ",
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

    //convert lcCommands to Commands enum
    const commands: Commands[] = lcCommands.map(
      (c) => Commands[c as keyof typeof Commands]
    );

    GenerateFiles(allDTOs, featureName, commands, dtoNames, basePath);

    console.log("happy hacking :)");
    rl.close();
  }
);
