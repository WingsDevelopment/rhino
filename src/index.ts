#!/usr/bin/env node

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
import { createDTOsWithDependencies } from "./managers/DTOManager";
import { GenerateFiles, GenerateInitFiles } from "./managers/FileManager";
import { overrideRSC } from "./rhinoStringConfig";
import { getCommands, getDTONames } from "./utils";
const { Command } = require("commander"); // add this line
const figlet = require("figlet");

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
