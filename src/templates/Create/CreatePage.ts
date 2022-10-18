import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { handleSubmit, id, isLoading, navigate, useNavigate } from "../common";
import { useCreateName } from "../Hooks/useCreate";
import { CreateForm } from "./CreateForm";

export const CreatePageName = (modelName: string) => {
  return `Create${pascalCase(modelName)}Page.tsx`;
};

// prettier-ignore
export const GetCreatePageString = (
  dto: DTOSchema,
  title: string,
  links: TLink[],
  breadcrumbsAction?: any
) => {
  return `
import React, { useMemo } from 'react';
import { ${useNavigate} } from 'react-router';

export const Create${pascalCase(dto.modelName)}Page: React.FC = () => {
    const { create${pascalCase(dto.modelName)}Async, ${isLoading} } = ${useCreateName(camelCase(dto.modelName))}();
    const ${navigate} = ${useNavigate}();
    ${renderDependencyHooks(dto)}

    const ${handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${id} = await create${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${navigate}(${dto.modelName.toUpperCase()}_ROUTES.details + "/" + ${id});
    };

    return (${PageLayout(
      CreateForm(dto.modelName),
      title,
      links,
      breadcrumbsAction
    )});
};
    
export default Create${pascalCase(dto.modelName)}Page;`;
};
