import { GetCreateFormString } from "./templates/Create/CreateForm";
import { GetCreatePageString } from "./templates/Create/CreatePage";
import { DTOSchema } from "./models/DTOSchema";
import {
  readFileSync,
  writeFileSync,
  promises as fsPromises,
  mkdirSync,
} from "fs";
import { GetCreateModelString } from "./templates/common/CreateModel";
import { GetCreateDTOString } from "./templates/common/CreateDTO";
import { GetDetailsBodyString } from "./templates/Details/DetailsBody";
//import json from ./openapischema.json
import { components } from "./openApiSchema.json";
import * as readline from "readline";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = ["create", "details", "list", "update"];
interface dtoNames {
  createDto: string;
  detailsDto: string;
  updateDto: string;
  listDto: string;
}

let commandAndDTONames: { command: string; dtoName: string }[] = [];

const featureName = "tag";
const modelName = "UpdateBrandDto";

let DTOs: { [key: string]: DTOSchema } = {
  [modelName]: (components.schemas as any)[modelName],
};

export const fillDTOsFromEveryRef = (dtos: DTOSchema[]) => {
  let newDtos: DTOSchema[] = [];
  dtos
    .filter((d) => d.type === "object")
    .forEach((dto) => {
      Object.keys(dto.properties).forEach((key) => {
        if (dto.properties[key].$ref) {
          const nameFromRef = dto.properties[key].$ref.split("/").pop();
          if (!nameFromRef || DTOs[nameFromRef]) return;
          const newDTO: DTOSchema = (components.schemas as any)[nameFromRef];
          newDtos.push(newDTO);
          DTOs[nameFromRef] = newDTO;
        }
      });
    });
  if (newDtos.length > 0) {
    fillDTOsFromEveryRef(newDtos);
  }
};

// fillDTOsFromEveryRef([DTOs[modelName]]);
// console.log(DTOs);

rl.question("Enter rhino command> ", (commands) => {
  let inputs = commands.split(" ");
  for (let i = 0; i < inputs.length - 1; i++) {
    commandAndDTONames.push({ command: inputs[i], dtoName: inputs[i + 1] });
    i++;
  }

  commandAndDTONames.forEach((commandAndDTOName) => {
    const { command, dtoName } = commandAndDTOName;
    let fullDtoName = dtoName + "Dto";
    let DTO = (components.schemas as any)[fullDtoName];
    if (DTO) {
      if (DTOs[fullDtoName]) console.log("DTO already exists");
      else DTOs[fullDtoName] = { ...DTO };
    }
  });

  fillDTOsFromEveryRef(Object.keys(DTOs).map((key) => DTOs[key]));

  console.log("DTOs");
  console.log(DTOs);
  rl.close();
});

const createSchemaFromString = (str: string): DTOSchema => {
  const schema: DTOSchema = JSON.parse(str);
  return schema;
};

const schema = createSchemaFromString(`{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "firstName": {
      "type": "string",
      "nullable": true
    },
    "lastName": {
      "type": "string",
      "nullable": true
    },
    "email": {
      "type": "string",
      "nullable": true
    },
    "userRole": {
      "$ref": "#/components/schemas/UserType"
    },
    "authId": {
      "type": "string",
      "format": "uuid",
      "nullable": true
    },
    "createdAt": {
      "type": "string",
      "nullable": true
    }
  },
  "additionalProperties": false
}`);

const asd = JSON.parse(`{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "firstName": {
      "type": "string",
      "nullable": true
    },
    "lastName": {
      "type": "string",
      "nullable": true
    },
    "email": {
      "type": "string",
      "nullable": true
    },
    "userRole": {
      "$ref": "#/components/schemas/UserType"
    },
    "authId": {
      "type": "string",
      "format": "uuid",
      "nullable": true
    },
    "createdAt": {
      "type": "string",
      "nullable": true
    }
  },
  "additionalProperties": false
}`);

const createPage = GetCreatePageString(featureName, schema, "Create Tag", [
  {
    name: "Tags",
    href: "/tags",
  },
]);

const createForm = GetCreateFormString(modelName, schema);
const model = GetCreateModelString(modelName, schema);
const dto = GetCreateDTOString(modelName, schema);
const detailsPage = GetDetailsBodyString(modelName, schema);

// console.log(model);

mkdirSync(`./src/features/${featureName}/pages/${modelName}/components`, {
  recursive: true,
});
mkdirSync(
  `./src/features/${featureName}/pages/${modelName}/components/CreateForm`,
  { recursive: true }
);
writeFileSync(
  `./src/features/${featureName}/pages/${modelName}/Create.tsx`,
  createPage
);

writeFileSync(
  `./src/features/${featureName}/pages/${modelName}/components/CreateForm.tsx`,
  createForm
);

// writeFileSync(
//   `./src/features/${featureName}/pages/${modelName}/components/CreateForm/Model.ts`,
//   model
// );

// writeFileSync(
//   `./src/features/${featureName}/pages/${modelName}/components/CreateForm/DTO.ts`,
//   dto
// );

writeFileSync(
  `./src/features/${featureName}/pages/${modelName}/components/DetailsBody.tsx`,
  detailsPage
);
