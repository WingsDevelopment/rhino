import { rhinoConfig } from "../../rhinoConfig";
import { DTOSchema } from "../../models/DTOSchema";
import { id, response } from "../../stringConfig";
import { camelCase } from "../../utils/stringUtils";
import { ModelExtensionName } from "../common/DTOTemplate";
import { GetDIContextName } from "../context/DIContext";
import { AxiosTemplate, GetByIdFuncName } from "../dataFetching/axios";
import {
  GetRepositoryName,
  CreateFuncName,
  UpdateFuncName,
} from "../Repository/Repository";
import { FETCH_ALL } from "./useFetchAll";

//prettier-ignore
const getCreateApiFunction = (featureName: string, dto: DTOSchema) => {
    if (rhinoConfig.generateRepository && rhinoConfig.generateContext) {
        return `const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${CreateFuncName(featureName)}(${camelCase(dto.modelName)}DTOExtension(${camelCase(dto.modelName)}));
        return ${response};`;
    } else if (rhinoConfig.generateRepository && !rhinoConfig.generateContext) {
        return `const ${response} = await ${GetRepositoryName(featureName)}.${CreateFuncName(featureName)}(${camelCase(dto.modelName)}DTOExtension(${camelCase(dto.modelName)}));
        return ${response};`;
    } else {
        return `${AxiosTemplate.getCreateImplString(dto, camelCase(dto.modelName))}`;
    }
}

//prettier-ignore
const getUpdateApiFunction = (featureName: string, dto: DTOSchema) => {
    if (rhinoConfig.generateRepository && rhinoConfig.generateContext) {
        return `const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${UpdateFuncName(featureName)}(${camelCase(dto.modelName)}DTOExtension(${camelCase(dto.modelName)}));
        return ${response};`;
    } else if (rhinoConfig.generateRepository && !rhinoConfig.generateContext) {
        return `const ${response} = await ${GetRepositoryName(featureName)}.${UpdateFuncName(featureName)}(${camelCase(dto.modelName)}DTOExtension(${camelCase(dto.modelName)}));
        return ${response};`;
    } else {
        return `${AxiosTemplate.getUpdateImplString(dto, camelCase(dto.modelName))}`;
    }
}

//prettier-ignore
const getFetchAllApiFunction = (featureName: string, dto: DTOSchema) => {
    if (rhinoConfig.generateRepository && rhinoConfig.generateContext) {
        return `const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${CreateFuncName(featureName)}();
        return ${response};`;
    } else if (rhinoConfig.generateRepository && !rhinoConfig.generateContext) {
        return `const ${response} = await ${GetRepositoryName(featureName)}.${FETCH_ALL(featureName)}();
        return ${response};`;
    } else {
        return `${AxiosTemplate.getGetAllImplString(dto)}`;
    }
}

//prettier-ignore
const getFetchByIdApiFunction = (featureName: string, dto: DTOSchema) => {
    if (rhinoConfig.generateRepository && rhinoConfig.generateContext) {
        return `const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${GetByIdFuncName(featureName)}(${id}!);
        return ${response} ? ${ModelExtensionName(dto.modelName)}(${response}) : undefined;`;
    } else if (rhinoConfig.generateRepository && !rhinoConfig.generateContext) {
        return `const ${response} = await ${GetRepositoryName(featureName)}.${GetByIdFuncName(featureName)}(${id}!);
        return ${response} ? ${ModelExtensionName(dto.modelName)}(${response}) : undefined;`;
    } else {
        return `${AxiosTemplate.getGetByIdImplString(dto)}`;
    }
}
//prettier-ignore
export const getDeleteApiFunction = (featureName: string, dto: DTOSchema) => {
    if (rhinoConfig.generateRepository && rhinoConfig.generateContext) {
        return `const ${response} = await ${GetDIContextName()}.${GetRepositoryName(featureName)}.${GetByIdFuncName(featureName)}(${id}!);
        return ${response};`;
    } else if (rhinoConfig.generateRepository && !rhinoConfig.generateContext) {
        return `const ${response} = await ${GetRepositoryName(featureName)}.${GetByIdFuncName(featureName)}(${id}!);
        return ${response};`;
    } else {
        return `${AxiosTemplate.getDeleteImplString()}`;
    }
}

export const ApiManager = {
  getCreateApiFunction,
  getUpdateApiFunction,
  getFetchAllApiFunction,
  getFetchByIdApiFunction,
  getDeleteApiFunction,
};
