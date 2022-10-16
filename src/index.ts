import { GetCreateFormString } from "./templates/Create/CreateForm";
import { GetCreatePageString } from "./templates/Create/CreatePage";
import { DTOSchema } from "./schema/ShemaModel";
import {
  readFileSync,
  writeFileSync,
  promises as fsPromises,
  mkdirSync,
} from "fs";
import { dir } from "console";
import { GetCreateModelString } from "./templates/common/CreateModel";
import { GetCreateDTOString } from "./templates/common/CreateDTO";
import { GetDetailsBodyString } from "./templates/Details/DetailsBody";

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

console.log("asd");
console.log(asd);

const featureName = "tag";
const modelName = "tag";

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

console.log(model);

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
