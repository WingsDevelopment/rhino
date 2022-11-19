Installation

npm i react-crud-generator

# Usage

After adding config files you can list all the available commands by running: <br />
<strong>npx rhino -h</strong>

full rhino command example: <br />
<strong>npx rhino -f tag -c NewTagDto -u UpdateTagDto -d TagDto -a TagDto</strong>

<strong>Command list:</strong>
Feature name: -f, --feature <featureName>
Add Read All (table) to the feature: -a, --all <dtoName>
Add Details (page) to the feature: -d, --details <dtoName>
Add Create (form) to the feature: -c, --create <dtoName>
Add Update (form) to the feature: -u, --update <dtoName>
Add Delete to the feature: -del, --del

# Config

Add rhinoConfig.json and rhinoOpenApiSchema.json files to your root directory

# Config rhinoOpenApiSchema

rhinoOpenApiSchema configuration is very straightforward.
copy the open api schema from the swagger editor and paste it in rhinoOpenApiSchema.json

swagger open api schema example: https://petstore.swagger.io/v2/swagger.json

# Config rhinoConfig

<pre>
{
"schemaDTOPath": "components",
"envApiUrl": "REACT_APP_YOUR_API_URL",
"basePath": "src/features",
"stateQueriesPath": "/state/queries",
"stateMutationsPath": "/state/mutations",
"repositoryPath": "/infrastructure/repositories",
"repositoryInterfacePath": "/infrastructure/interfaces",
"dtosPath": "/infrastructure/DTOs",
"modelsPath": "/models",
"detailsPath": "/pages/Details",
"listPath": "/pages/Index",
"createPath": "/pages/Create",
"updatePath": "/pages/Update",
"routesPath": "/routes",
"contextPath": "/context",
"useTemplate": "reactQuery",
"generateRepository": true,
"generateContext": true,
"generateRepositoryInterface": true,
"generateOnlyFolderStructure": false,
"DTOExtensionAdd": "DTO",
"DTOExtensionRemove": "",
"ModelExtensionAdd": "",
"ModelExtensionRemove": "DTO",
"overrideNamings": {
    "initialData": "initData"
 }
}
</pre>
