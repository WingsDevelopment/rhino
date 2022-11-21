#!/usr/bin/env node
const { Command } = require("commander"); // add this line
const figlet = require("figlet");
import fs from "fs";

export let rhinoConfig = JSON.parse(
  fs.readFileSync("rhinoConfig.json", "utf8")
);
export let rhinoOpenApiSchema = JSON.parse(
  fs.readFileSync("rhinoOpenApiSchema.json", "utf8")
);
import { getPropByString } from "./utils/objectUtils";
import { createDTOsWithDependencies } from "./managers/DTOManager";
import { GenerateFiles, GenerateInitFiles } from "./managers/FileManager";
import { overrideRSC } from "./rhinoStringConfig";
import { getCommands, getDTONames } from "./utils";
import { defaultRhinoConfig } from "./defaultConfig/defaultRhinoConfig";
import { defaultRhinoOpenApiSchema } from "./defaultConfig/rhinoOpenApiSchema";
if (rhinoConfig === undefined) {
  console.warn("Rhino config file not found");
  rhinoConfig = defaultRhinoConfig;
}
if (rhinoOpenApiSchema === undefined) {
  console.warn("Rhino OpenApi schema file not found");
  rhinoOpenApiSchema = defaultRhinoOpenApiSchema;
}
//add the following line
const program = new Command();

console.log(figlet.textSync("R H I N O"));
program
  .version("1.0.0")
  .description("List of commands for code generation")
  .option("-i, --init", "Create default rhino components")
  .option("-f, --feature <featureName>", "Feature name")
  .option("-a, --all <dtoName>", "Generate - Read All (table) - feature")
  .option("-d, --details <dtoName>", "Generate Details (page) - feature")
  .option("-c, --create <dtoName>", "Generate Create (form) - feature")
  .option("-u, --update <dtoName>", "Generate Update (form) - feature")
  .option("-del, --del", "Generate Delete - feature")
  .parse(process.argv);

export const options = program.opts();
if (options.init) {
  console.log("Creating default rhino components");
  GenerateInitFiles();
  console.log("Finished");
  process.exit(0);
}

if (!options.init) {
  if (options.feature === undefined)
    throw new Error("No feature name provided");
  overrideRSC(rhinoConfig.overrideNamings);

  const definitions = getPropByString(
    rhinoOpenApiSchema,
    rhinoConfig.schemaDTOPath
  );

  if (!definitions)
    throw new Error(
      "No definitions found in schema, please edit the schemaDTOPath in rhinoConfig.json"
    );

  const commands = getCommands(options);
  const dtoNames = getDTONames(options);

  const allDTOs = createDTOsWithDependencies(definitions, dtoNames);

  GenerateFiles(
    allDTOs,
    options.feature,
    commands,
    dtoNames,
    rhinoConfig.basePath
  );
}

console.log("happy hacking :)");
