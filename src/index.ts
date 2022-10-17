import { definitions as definitions } from "./openApiSchema.json";
import * as readline from "readline";
import { DTOs, fillDTOsFromEveryRef } from "./DTOManager";
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
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = ["create", "details", "list", "update"];
let dtoNames: DTONames = {};
let modelNames: ModelNames = {};
let commandAndDTONames: { command: string; dtoName: string }[] = [];
//end of config
let featureName: string | undefined = "";

rl.question(
  "Enter rhino command (featureName command dtoName command dtoName etc...)> ",
  commands => {
    let inputs = commands.split(" ");
    featureName = inputs.shift();

    for (let i = 0; i < inputs.length - 1; i++) {
      commandAndDTONames.push({ command: inputs[i], dtoName: inputs[i + 1] });
      i++;
    }

    dtoNames = getDTONamesFromInput(commandAndDTONames);
    modelNames = getModelNamesConfigured(dtoNames);

    Object.keys(dtoNames).forEach(key => {
      //todo change names
      let fullDtoName = (dtoNames as any)[key];
      const modifiedDtoName = getDtoName(fullDtoName);
      if (fullDtoName) {
        let DTO = {
          ...(definitions as any)[fullDtoName],
          name: modifiedDtoName,
          modelName: getModelNameFromDtoName(modifiedDtoName),
        };
        if (DTO) {
          if (DTOs[fullDtoName]) console.log("DTO already exists");
          else DTOs[fullDtoName] = { ...DTO };
        }
      }
    });

    fillDTOsFromEveryRef(
      Object.keys(DTOs).map(key => DTOs[key]),
      definitions
    );

    if (!featureName) return;
    if (modelNames.create && dtoNames.create) {
      const schema = DTOs[dtoNames.create];
      CreateCreateFeature(featureName, modelNames.create, schema);
    }
    // if (modelNames.updateModel && dtoNames.updateDto) {
    //   const schema = DTOs[dtoNames.updateDto];
    //   WriteFileUpdatePage(featureName, modelNames.updateModel, schema);
    // }
    if (featureName && modelNames.details && dtoNames.details) {
      const schema = DTOs[dtoNames.details];
      CreateDetailsFeature(featureName, modelNames.details, schema);
    }

    CreateAllModelsAndDTOsFromDTOSchemas(DTOs, featureName);
    // if (modelNames.listModel && dtoNames.listDto) {
    //   const schema = DTOs[dtoNames.listDto];
    //   WriteFileListPage(featureName, modelNames.listModel, schema);
    // }
    console.log("FINAL ------------ DTOs");
    console.log(DTOs);
    rl.close();
  }
);
