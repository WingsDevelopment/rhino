import { mkdirSync, writeFileSync } from "fs";
import { Commands } from ".";
import { DTOSchema } from "./models/DTOSchema";
import { GetCreateDTOString } from "./templates/common/CreateDTO";
import { GetCreateModelString } from "./templates/common/CreateModel";
import { GetDIContextTemplateString } from "./templates/context/DIContext";
import {
  CreateFormName,
  GetCreateFormString,
} from "./templates/Create/CreateForm";
import {
  CreatePageName,
  GetCreatePageString,
} from "./templates/Create/CreatePage";
import {
  DetailsBodyName,
  GetDetailsBodyString,
} from "./templates/Details/DetailsBody";
import {
  DetailsPageName,
  GetDetailsPageString,
} from "./templates/Details/DetailsPage";
import { GetUseCreateString, useCreateName } from "./templates/Hooks/useCreate";
import { GetUseDeleteString, useDeleteName } from "./templates/Hooks/useDelete";
import {
  GetUseFetchAllString,
  useFetchAllName,
} from "./templates/Hooks/useFetchAll";
import {
  GetUseFetchByIdString,
  useFetchByIdName,
} from "./templates/Hooks/useFetchById";
import { GetUseUpdateString, useUpdateName } from "./templates/Hooks/useUpdate";
import { GetRepositoryString } from "./templates/Repository/Repository";
import { GetRepositoryInterfaceString } from "./templates/Repository/RepositoryInterface";
import { GetRoutesString } from "./templates/routes/routes";
import { GetIndexBodyString, IndexBodyName } from "./templates/Table/IndexBody";
import { GetIndexPageString, IndexPageName } from "./templates/Table/IndexPage";
import { GetTableBodyString, TableBodyName } from "./templates/Table/TableBody";
import {
  GetUpdateFormString,
  UpdateFormName,
} from "./templates/Update/UpdateForm";
import {
  GetUpdatePageString,
  UpdatePageName,
} from "./templates/Update/UpdatePage";
import { DTONames, getModelNamesConfigured } from "./utils/consoleInputUtils";
import { pascalCase, plural } from "./utils/stringUtils";

//todo config?
export const BaseModelsRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/models`;
};
export const BaseDTOsRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/infrastracture/DTOs`;
};

export const useMutationRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/state/mutations`;
};
export const useQueriesRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/state/queries`;
};

export const repositoryRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/infrastracture/repositories`;
};

export const repositoryInterfaceRoute = (
  featureName: string,
  baseRoute: string
) => {
  return `${baseRoute}/${featureName}/infrastracture/interfaces`;
};

export const DIContextRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/contexts`;
};

export const RoutesRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/routes`;
};

export const GenerateFeatureBase = (
  DTOs: {
    [key: string]: DTOSchema;
  },
  featureName: string,
  commands: Commands[],
  dtoNames: DTONames,
  baseRoute: string
) => {
  const { create, details, list, update } = getModelNamesConfigured(dtoNames);

  const createDTO = create ? DTOs[create] : undefined;
  const updateDTO = details ? DTOs[details] : undefined;
  const detailsDTO = update ? DTOs[update] : undefined;
  const listDTO = list ? DTOs[list] : undefined;

  if (!createDTO) throw new Error("Create DTO is not defined");
  const repositoryString = GetRepositoryString(
    featureName,
    createDTO,
    commands,
    detailsDTO,
    updateDTO,
    listDTO
  );

  const repositoryInterfaceString = GetRepositoryInterfaceString(
    featureName,
    createDTO,
    commands,
    detailsDTO,
    updateDTO,
    listDTO
  );

  mkdirSync(useMutationRoute(featureName, baseRoute), { recursive: true });
  mkdirSync(useQueriesRoute(featureName, baseRoute), { recursive: true });
  GenerateAllModelsAndDTOsFromDTOSchemas(DTOs, featureName, baseRoute);

  mkdirSync(repositoryRoute(featureName, baseRoute), { recursive: true });
  mkdirSync(repositoryInterfaceRoute(featureName, baseRoute), {
    recursive: true,
  });

  writeFileSync(
    `${repositoryRoute(featureName, baseRoute)}/${pascalCase(
      featureName
    )}Repository.ts`,
    repositoryString
  );
  writeFileSync(
    `${repositoryInterfaceRoute(featureName, baseRoute)}/${pascalCase(
      featureName
    )}RepositoryInterface.ts`,
    repositoryInterfaceString
  );

  mkdirSync(DIContextRoute(featureName, baseRoute), { recursive: true });
  writeFileSync(
    `${DIContextRoute(featureName, baseRoute)}/index.ts`,
    GetDIContextTemplateString(featureName)
  );

  mkdirSync(RoutesRoute(featureName, baseRoute), { recursive: true });
  writeFileSync(
    `${RoutesRoute(featureName, baseRoute)}/index.ts`,
    GetRoutesString(featureName, commands)
  );

  if (listDTO) {
    writeFileSync(
      `${useQueriesRoute(featureName, baseRoute)}/${useFetchAllName(
        listDTO.modelName
      )}.ts`,
      GetUseFetchAllString(listDTO, featureName)
    );
  }
  if (detailsDTO) {
    writeFileSync(
      `${useQueriesRoute(featureName, baseRoute)}/${useFetchByIdName(
        detailsDTO.modelName
      )}.ts`,
      GetUseFetchByIdString(detailsDTO, featureName)
    );
  }
  if (commands.includes(Commands.delete)) {
    writeFileSync(
      `${useMutationRoute(featureName, baseRoute)}/${useDeleteName(
        createDTO.modelName
      )}.ts`,
      GetUseDeleteString(createDTO, featureName)
    );
  }
};

export const GenerateAllModelsAndDTOsFromDTOSchemas = (
  DTOs: {
    [key: string]: DTOSchema;
  },
  featureName: string,
  baseRoute: string
) => {
  mkdirSync(BaseModelsRoute(featureName, baseRoute), { recursive: true });
  mkdirSync(BaseDTOsRoute(featureName, baseRoute), { recursive: true });
  //foreach dto in dtos
  Object.keys(DTOs)
    .map((key) => {
      return DTOs[key];
    })
    .forEach((dto) => {
      const modelString = GetCreateModelString(dto.modelName, dto);
      const dtoString = GetCreateDTOString(dto.dtoName, dto);

      writeFileSync(
        `${BaseModelsRoute(featureName, baseRoute)}/${dto.modelName}.ts`,
        modelString
      );
      writeFileSync(
        `${BaseDTOsRoute(featureName, baseRoute)}/${dto.dtoName}.ts`,
        dtoString
      );
    });
};

export const CreatePageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Create`;
};
export const CreateFormRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Create/components`;
};

export const GenerateCreateFeature = (
  featureName: string,
  dto: DTOSchema,
  baseRoute: string
) => {
  const createPageString = GetCreatePageString(
    dto,
    `Create ${featureName}`,
    featureName,
    [
      {
        name: `Create ${dto.modelName}`,
        href: `/${plural(dto.modelName)}`,
      },
    ]
  );
  const createFormString = GetCreateFormString(dto);
  const useCreateString = GetUseCreateString(dto, featureName);
  mkdirSync(CreatePageRoute(featureName, baseRoute), { recursive: true });
  mkdirSync(CreateFormRoute(featureName, baseRoute), { recursive: true });

  writeFileSync(
    `${CreatePageRoute(featureName, baseRoute)}/${CreatePageName(
      dto.modelName
    )}`,
    createPageString
  );
  writeFileSync(
    `${CreateFormRoute(featureName, baseRoute)}/${CreateFormName(
      dto.modelName
    )}`,
    createFormString
  );
  writeFileSync(
    `${useMutationRoute(featureName, baseRoute)}/${useCreateName(
      dto.modelName
    )}.ts`,
    useCreateString
  );
};

export const DetailsPageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Details`;
};
export const DetailsBodyRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Details/components`;
};

export const GenerateDetailsFeature = (
  featureName: string,
  dto: DTOSchema,
  baseRoute: string
) => {
  const detailsPageRoute = DetailsPageRoute(featureName, baseRoute);
  const detailsPage = GetDetailsPageString(dto, `Details ${featureName}`, [
    {
      name: `Details ${dto.modelName}`,
      href: `/${plural(dto.modelName)}`,
    },
  ]);
  const detailsBodyString = GetDetailsBodyString(dto);
  mkdirSync(detailsPageRoute, { recursive: true });
  mkdirSync(DetailsBodyRoute(featureName, baseRoute), { recursive: true });
  writeFileSync(
    `${detailsPageRoute}/${DetailsPageName(dto.modelName)}`,
    detailsPage
  );
  writeFileSync(
    `${detailsPageRoute}/components/${DetailsBodyName(dto.modelName)}`,
    detailsBodyString
  );
};

export const UpdatePageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Update`;
};

export const UpdateFormRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Update/components`;
};

export const GenerateUpdateFeature = (
  featureName: string,
  dto: DTOSchema,
  baseRoute: string
) => {
  const updatePageRoute = UpdatePageRoute(featureName, baseRoute);
  const updateFormRoute = UpdateFormRoute(featureName, baseRoute);
  mkdirSync(updatePageRoute, { recursive: true });
  mkdirSync(updateFormRoute, { recursive: true });

  writeFileSync(
    `${updatePageRoute}/${UpdatePageName(dto.modelName)}`,
    GetUpdatePageString(dto, `Update ${featureName}`, featureName, [
      {
        name: `Update ${dto.modelName}`,
        href: `/${plural(dto.modelName)}`,
      },
    ])
  );
  writeFileSync(
    `${updateFormRoute}/${UpdateFormName(dto.modelName)}`,
    GetUpdateFormString(dto)
  );
  writeFileSync(
    `${useMutationRoute(featureName, baseRoute)}/${useUpdateName(
      dto.modelName
    )}.ts`,
    GetUseUpdateString(dto, featureName)
  );
};

export const IndexPageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Index`;
};

export const IndexBodyRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Index/components`;
};

export const TableBodyRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}/pages/Index/components`;
};

export const GenerateIndexFeature = (
  featureName: string,
  dto: DTOSchema,
  baseRoute: string
) => {
  const indexPageRoute = IndexPageRoute(featureName, baseRoute);
  const indexBodyRoute = IndexBodyRoute(featureName, baseRoute);
  const tableBodyRoute = TableBodyRoute(featureName, baseRoute);
  mkdirSync(indexPageRoute, { recursive: true });
  mkdirSync(indexBodyRoute, { recursive: true });
  mkdirSync(tableBodyRoute, { recursive: true });

  writeFileSync(
    `${indexPageRoute}/${IndexPageName(dto.modelName)}`,
    GetIndexPageString(dto, `${featureName}`, [
      {
        name: `${dto.modelName}`,
        href: `/${plural(dto.modelName)}`,
      },
    ])
  );
  writeFileSync(
    `${indexBodyRoute}/${IndexBodyName(dto.modelName)}`,
    GetIndexBodyString(dto)
  );
  writeFileSync(
    `${tableBodyRoute}/${TableBodyName(dto.modelName)}`,
    GetTableBodyString(dto)
  );
};
