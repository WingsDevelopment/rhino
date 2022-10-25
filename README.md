# rhino

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
C:\repos\clean-code-poc\clean-code-poc\src\backoffice-app-code\features Retailer details RetailerDto create NewRetailerDto update NewRetailerDto list RetailerDto

Command exlanatio
C:\repos\clean-code-poc\clean-code-poc\src\backoffice-app-code\features - path to the features folder
Retailer details - name of the feature
RetailerDto - name of the dto
create - name of the command
NewRetailerDto - name of the dto
update - name of the command
NewRetailerDto - name of the dto
list - name of the command
RetailerDto - name of the dto

Command pattern
path featureName command dtoName command dtoName command dtoName command dtoName

# More on configuring the project

inside config.ts you must set chemaDTOPath
correct chemaDTOPath value can be simply by following path to 'schemas'

![alt text](./rhino%20instructio.png)
