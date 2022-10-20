import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  details,
  handleSubmit,
  id,
  isLoading,
  navigate,
  useNavigate,
} from "../common";
import { useCreateName } from "../Hooks/useCreate";
import { GetRoutesName } from "../routes/routes";
import { CreateForm } from "./CreateForm";

export const CreatePageName = (featureName: string) => {
  return `Create${pascalCase(featureName)}Page`;
};

// prettier-ignore
export const GetCreatePageString = (
  dto: DTOSchema,
  title: string,
  featureName: string,
  links: TLink[],
  breadcrumbsAction?: any,
) => {
  return `
import React, { useMemo } from 'react';
import { ${useNavigate} } from 'react-router';

export const ${CreatePageName(featureName)}: React.FC = () => {
    const { create${pascalCase(dto.modelName)}Async, ${isLoading} } = ${useCreateName(featureName)}();
    const ${navigate} = ${useNavigate}();
    ${renderDependencyHooks(dto)}

    const ${handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${id} = await create${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${navigate}(${GetRoutesName(featureName)}.${details} + "/" + ${id});
    };

    return (${PageLayout(
      CreateForm(featureName),
      title,
      links,
      breadcrumbsAction
    )});
};
    
export default ${CreatePageName(featureName)};`;
};
