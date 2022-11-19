Installation

npm i react-crud-generator

# Usage

After adding config files you can list all the available commands by running: <br />
<strong>npx rhino -h</strong>

full rhino command example: <br />
<strong>npx rhino -f tag -c NewTagDto -u UpdateTagDto -d TagDto -a TagDto</strong>

<pre>
<strong>Command list:</strong>
-f dtoName or --feature featureName : Feature name
-a dtoName or --all dtoName         : Add Read All (table) to the feature
-d dtoName or --details dtoName     : Add Details (page) to the feature
-c dtoName or --create dtoName      : Add Create (form) to the feature
-u dtoName or --update dtoName      : Add Update (form) to the feature
-del or --del                       : Add Delete to the feature
</pre>

# Config

Add rhinoConfig.json and rhinoOpenApiSchema.json files to your root directory

# Config rhinoOpenApiSchema

rhinoOpenApiSchema configuration is very straightforward. <br />
copy the open api schema from the swagger editor and paste it in rhinoOpenApiSchema.json <br />

swagger open api schema example: https://petstore.swagger.io/v2/swagger.json <br />
<strong>for quick test</strong>, copy json from this link and paste it in rhinoOpenApiSchema.json <br />
run the command: npx rhino -f anyName -c Tag <br />

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
