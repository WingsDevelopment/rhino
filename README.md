# WELCOME TO RHINO

# Installation

npm install

# Start

npm run start:dev

# Config

main config file:
/src/config/config.ts

change your api scheme from swagger:
/src/openApiSchema.json

rename things from "rhino" to your project needs:
/src/stringConfig.ts

# Usage

Command example:
C:\repos\clean-code-poc\clean-code-poc\src\backoffice-app-code\features Retailer details RetailerDto create NewRetailerDto update NewRetailerDto list RetailerDto <br />

Command exlanation
C:\repos\clean-code-poc\clean-code-poc\src\backoffice-app-code\features - path to the features folder <br />
Retailer - name of the feature <br />
details - name of the command <br />
RetailerDto - name of the dto for details <br />
create - name of the command <br />
NewRetailerDto - name of the dto for create <br />
update - name of the command <br />
NewRetailerDto - name of the dto for update <br />
list - name of the command <br />
RetailerDto - name of the dto for list <br />

Command pattern <br />
path featureName command dtoName command dtoName command dtoName command dtoName

# More on configuring the project

inside config.ts you must set chemaDTOPath
correct chemaDTOPath value can be simply by following path to 'schemas'

![alt text](./rhino%20instructio.png)
