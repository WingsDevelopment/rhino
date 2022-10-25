import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
import {
  details,
  handleSubmit,
  id,
  isLoading,
  navigate,
  reactComponentExtension,
  useNavigate,
} from "../../stringConfig";
import { RQCreateHook } from "../Hooks/useCreate";
import { GetRoutesName } from "../routes/routes";
import { RQCreateForm } from "./CreateForm";

const CreatePageName = (featureName: string) => {
  return `Create${pascalCase(featureName)}Page`;
};

// prettier-ignore
const GetCreatePageString = (
  featureName: string,
  dto: DTOSchema,
) => {
  return `
import React, { useMemo } from 'react';
import { ${useNavigate} } from 'react-router';

export const ${CreatePageName(featureName)}: React.FC = () => {
    const { create${pascalCase(dto.modelName)}Async, ${isLoading} } = ${RQCreateHook.getName(featureName)}();
    const ${navigate} = ${useNavigate}();
    ${renderDependencyHooks(dto)}

    const ${handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${id} = await create${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${navigate}(${GetRoutesName(featureName)}.${details} + "/" + ${id});
    };

    return (${PageLayout(
      RQCreateForm.invoke(featureName, ""),
      `Create ${featureName}`,
        [
          {
            name: `Create ${dto.modelName}`,
            href: `/${plural(dto.modelName)}`,
          },
        ]
    )});
};
    
export default ${CreatePageName(featureName)};`;
};

const GetCreatePageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.createPath}`;
};

export const RQCreatePage: ITemplate = {
  getName: CreatePageName,
  getBody: GetCreatePageString,
  getRoute: GetCreatePageRoute,
  extension: reactComponentExtension,
};
