Installation

npm i react-crud-generator --save-dev

# Usage

For easier understanding how can you use this package, you can download the example project from here.
https://github.com/WingsDevelopment/rhino-consumer
After downloading the project, you can run it by following the instructions in the README.md file.

After adding config files you can list all the available commands by running: <br />
<strong>npx rhino -h</strong>

full rhino command example: <br />

First you can add all dependency components implementation by running the following command: <br />
<strong>npx rhino -i</strong>

Then you can generate the CRUD by running the following command (if you copied json schema from example this exact command will work, if not you might need to change your schema model name): <br />
<strong>npx rhino -f tag -c Tag -u Tag -d Tag -a Tag</strong>

Imports inside of components and prittier doesn't come out of the box for at this moment,
so you need to add import on save to vscode settings.json file: <br />
or import manually.

<pre>
<strong>Command list:</strong>
-f dtoName or --feature featureName : Feature name
-a dtoName or --all dtoName         : Add Read All (table) to the feature
-d dtoName or --details dtoName     : Add Details (page) to the feature
-c dtoName or --create dtoName      : Add Create (form) to the feature
-u dtoName or --update dtoName      : Add Update (form) to the feature
</pre>

# Config

Add rhinoConfig.json and rhinoOpenApiSchema.json files to your root directory
More about how to config those files can after about.

# About

<strong>Rhino</strong> is a code generator for React projects. It generates a CRUD for a given feature. <br />
Rhino is currently very opiniated with data fetching and state management technologies, it uses
<strong>axios</strong> and <strong>react-query</strong> for data fetching and state management. <br />
<br />

Folder structure and architecture is semi opiniated, but also very configurable. <br />
By default this is the folder structure: <br />

<pre>
features/tag
├── infrastructure
│   ├── DTOs                    # Data transfer objects - generated from OpenAPI schema
|   ├── interfaces              # Interfaces for the - repository
│   └── repositories            # Data fetching - axios implementation
├── models                      # Models - also generated from OpenAPI schema, used in views, extendable with your needs.
├── pages                       # Views - generated depending on the commands you run and DTOs from schema.
|   ├── Create
|   |   ├── components          # Components used in the view
|   |   └── CreateTagPage.tsx   # Page that contains Form component
|   ├── Details
|   |   ├── components
|   |   └── DetailsTagPage.tsx  # Page that contains Details component
|   ├── Update
|   |   ├── components
|   |   └── UpdateTagPage.tsx   # Page that contains Form component
|   └── Index
|       ├── components
|       └── IndexTagPage.tsx    # Page that contains Table component
|── routes                      # Routes for the feature & RouteObject, used for navigation
|   └── TagRoutes.tsx
└── state                       # State management - react-query implementation
    ├── hooks                   # Hooks for the feature
    └── queries                 # Queries for the feature
</pre>

<strong>This folder structure can be configured!</strong>
if you take a look at the rhinoConfig.json file you will see that you can change the folder structure.
notice this part of configuration: <br />

<pre>
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
</pre>

by changing the values you can change the folder structure.

# Dependencies

Rhino won't work without the following dependencies: <br />
<strong>axios</strong> <br />
<strong>react-query</strong> <br />
<strong>react-router-dom</strong> <br />
<strong>typescript</strong> <br />
<strong>react-hook-form</strong> <br />

Also you will need to provide few components, wrappers for the generated components. <br />
You can eaither implement it yourself, or generate it by running init command.

Coming soon: <br />
Configurable renaming of the components. <br />
Configurable file extensions, enabling jsx & js files instead of tsx & ts <br />

# Config rhinoOpenApiSchema

rhinoOpenApiSchema configuration is very straightforward. <br />
copy the open api schema from the swagger editor and paste it in rhinoOpenApiSchema.json <br />

swagger open api schema example: https://petstore.swagger.io/v2/swagger.json <br />
<strong>for quick test</strong>, <br /> copy json from this link and paste it in rhinoOpenApiSchema.json <br />
copy json from under Config rhinoConfig section into rhinoConfig.json and <br />
run the command: npx rhino -f anyName -c Tag <br />

# Config rhinoConfig

This is default config that is suggested to be a starting point. <br />

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
"generateContext": false,
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
