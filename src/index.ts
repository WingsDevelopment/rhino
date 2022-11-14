import * as readline from "readline";
import { createDTOsWithDependencies } from "./managers/DTOManager";
import schema from "./openApiSchema.json";
import { getDTONamesFromInput } from "./utils/consoleInputUtils";
import { rhinoConfig } from "./rhinoConfig";
import { getPropByString } from "./utils/objectUtils";
import { GenerateFiles } from "./managers/FileManager";
import { RhinoCommand } from "./enums/command";

const definitions = getPropByString(schema, rhinoConfig.chemaDTOPath);

if (!definitions)
  throw new Error(
    "No definitions found in schema, please edit the schemaDTOPath in config.ts"
  );

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Rhino>", (INPUT) => {
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
  const commands: RhinoCommand[] = lcCommands.map(
    (c) => RhinoCommand[c as keyof typeof RhinoCommand]
  );

  GenerateFiles(allDTOs, featureName, commands, dtoNames, basePath);

  console.log("happy hacking :)");
  rl.close();
});
