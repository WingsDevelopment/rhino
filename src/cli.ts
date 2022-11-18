import fs from "fs";
export const rhinoConfig = JSON.parse(
  fs.readFileSync("rhinoConfig.json", "utf8")
);
export const rhinoOpenApiSchema = JSON.parse(
  fs.readFileSync("rhinoOpenApiSchema.json", "utf8")
);
if (rhinoConfig === undefined) {
  throw new Error("rhinoConfig.json is not provided");
}
if (rhinoOpenApiSchema === undefined) {
  throw new Error("rhinoOpenApiSchema.json is not provided");
}
import { getPropByString } from "./utils/objectUtils";
import { RhinoCommand } from "./enums/command";
import { createDTOsWithDependencies } from "./managers/DTOManager";
import { GenerateFiles } from "./managers/FileManager";
import { DTONames } from "./utils/consoleInputUtils";
import { overrideRSC } from "./rhinoStringConfig";
const { Command } = require("commander"); // add this line
const figlet = require("figlet");

//add the following line
const program = new Command();

console.log(figlet.textSync("R H I N O"));
program
  .version("1.0.0")
  .description("List of commands for code generation")
  .option("-f, --feature <featureName>", "Feature name")
  .option("-a, --all <dtoName>", "Generate - Read All (table) - feature")
  .option("-d, --details <dtoName>", "Generate Details (page) - feature")
  .option("-c, --create <dtoName>", "Generate Create (form) - feature")
  .option("-u, --update <dtoName>", "Generate Update (form) - feature")
  .option("-del, --del", "Generate Delete - feature")
  .parse(process.argv);

export const options = program.opts();

overrideRSC(rhinoConfig.overrideNamings);

const definitions = getPropByString(
  rhinoOpenApiSchema,
  rhinoConfig.chemaDTOPath
);

if (!definitions)
  throw new Error(
    "No definitions found in schema, please edit the schemaDTOPath in rhinoConfig.json"
  );

const commands: RhinoCommand[] = [];
const dtoNames: DTONames = {};
if (options.create !== undefined) {
  commands.push(RhinoCommand.create);
  dtoNames.create = options.create;
}
if (options.update !== undefined) {
  commands.push(RhinoCommand.update);
  dtoNames.update = options.update;
}
if (options.details !== undefined) {
  commands.push(RhinoCommand.details);
  dtoNames.details = options.details;
}
if (options.all !== undefined) {
  commands.push(RhinoCommand.list);
  dtoNames.list = options.all;
}
if (options.del !== undefined) {
  commands.push(RhinoCommand.delete);
  dtoNames.delete = options.del;
}
if (options.feature === undefined) throw new Error("No feature name provided");

const allDTOs = createDTOsWithDependencies(definitions, dtoNames);

//get basePath from config
const basePath = rhinoConfig.basePath;
GenerateFiles(allDTOs, options.feature, commands, dtoNames, basePath);

console.log("happy hacking :)");
