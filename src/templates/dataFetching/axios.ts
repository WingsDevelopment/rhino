import { DTOSchema } from "../../models/DTOSchema";
import { rsc } from "../../rhinoStringConfig";
import { pascalCase } from "../../utils/stringUtils";

const CreateFuncName = (featureName: string): string => {
  return `Create${pascalCase(featureName)}Async`;
};

//prettier-ignore
const GetCreateFuncString = (featureName: string, createDTO: DTOSchema, paramsName: string) => {
  return `const ${CreateFuncName(featureName)} = async (${paramsName}: ${createDTO?.dtoName}): Promise<${createDTO?.dtoName} | undefined> => {
        ${GetCreateImplString(createDTO, paramsName)}
    };`;
};
//WebApiResponse todo add this

//prettier-ignore
const GetCreateImplString = (createDTO: DTOSchema, paramsName: string) => {
  return `const response: AxiosResponse<${rsc.WebApiResponse}<${createDTO?.dtoName} | undefined>> = await ${rsc.axios}.${rsc.axiosPost}(
      \`\${${rsc.baseUrl}}/create\`,
      ${paramsName}
  );

  return response.data?.result;`
};

export const GetByIdFuncName = (featureName: string): string => {
  return `Get${pascalCase(featureName)}ByIdAsync`;
};

//prettier-ignore
const GetGetByIdFuncString = (featureName: string, detailsDTO: DTOSchema) => {
    return  `const ${GetByIdFuncName(featureName)} = async (id: string): Promise<${detailsDTO?.dtoName} | undefined> => {
        ${GetGetByIdImplString(detailsDTO)}
    };`
}

const GetGetByIdImplString = (detailsDTO: DTOSchema) => {
  return `const response: AxiosResponse<${rsc.WebApiResponse}<${detailsDTO?.dtoName}>> = await ${rsc.axios}.${rsc.axiosGet}(
        \`\${${rsc.baseUrl}}/getById/\${id}\`
    );

    return response.data?.result;`;
};

export const DeleteFuncName = (featureName: string): string => {
  return `Delete${pascalCase(featureName)}Async`;
};

//prettier-ignore
const GetDeleteFuncString = (featureName: string) => {
    return `const ${DeleteFuncName(featureName)} = async (id: string): Promise<string | undefined> => {
        ${GetDeleteImplString()}
    };`
}

//prettier-ignore
const GetDeleteImplString = () => {
  return `const response: AxiosResponse<${rsc.WebApiResponse}<string>> = await ${rsc.axios}.${rsc.axiosDelete}(
        \`\${${rsc.baseUrl}}/\${id}\`
    );

    return response.data?.result;`;
};

const UpdateFuncName = (featureName: string): string => {
  return `Update${pascalCase(featureName)}Async`;
};

//prettier-ignore
const GetUpdateFuncString = (featureName: string, updateDTO: DTOSchema, paramsName: string) => {
  return `const ${UpdateFuncName(featureName)} = async (${paramsName}: ${updateDTO?.dtoName} ): Promise<string | undefined> => {
        ${GetUpdateImplString(updateDTO, paramsName)}
    };`;
};

//prettier-ignore
const GetUpdateImplString = (updateDTO: DTOSchema, paramsName: string) => {
    return `const response: AxiosResponse<${rsc.WebApiResponse}<string | undefined>> = await ${rsc.axios}.${rsc.axiosPut}(
        \`\${${rsc.baseUrl}}/update\`,
        ${paramsName}
    );

    return response.data?.result;`
}

export const GetAllFuncName = (featureName: string): string => {
  return `GetAll${pascalCase(featureName)}Async`;
};

const GetGetAllFuncString = (featureName: string, listDTO: DTOSchema) => {
  return `const ${GetAllFuncName(featureName)} = async (): Promise<${
    listDTO?.dtoName
  }[] | undefined> => {
        ${GetGetAllImplString(listDTO)}
    };`;
};

//prettier-ignore
const GetGetAllImplString = (listDTO: DTOSchema) => {
    return `const response: AxiosResponse<${rsc.WebApiResponse}<${listDTO?.dtoName}[] | undefined>> = await ${rsc.axios}.${rsc.axiosGet}(
        \`\${${rsc.baseUrl}}/getAll\`
    );

    return response.data?.result;`;
};

export const AxiosTemplate = {
  getCreateFuncString: GetCreateFuncString,
  getCreateImplString: GetCreateImplString,
  getCreateFuncName: CreateFuncName,
  getGetByIdFuncString: GetGetByIdFuncString,
  getGetByIdImplString: GetGetByIdImplString,
  getGetByIdFuncName: GetByIdFuncName,
  getDeleteFuncString: GetDeleteFuncString,
  getDeleteImplString: GetDeleteImplString,
  getDeleteFuncName: DeleteFuncName,
  getUpdateFuncString: GetUpdateFuncString,
  getUpdateImplString: GetUpdateImplString,
  getUpdateFuncName: UpdateFuncName,
  getGetAllFuncString: GetGetAllFuncString,
  getGetAllImplString: GetGetAllImplString,
  getGetAllFuncName: GetAllFuncName,
};
