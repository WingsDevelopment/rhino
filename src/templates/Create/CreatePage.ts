import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { CreateForm } from "./CreateForm";
import { handleSubmit, initialData, isLoading, result } from "../common";

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
import { useNavigate } from 'react-router';

export const Create${pascalCase(dto.modelName)}Page: React.FC = () => {
    const { create${pascalCase(dto.modelName)}Async, ${isLoading} } = useCreate${pascalCase(dto.modelName)}();
    const navigate = useNavigate();
    ${renderDependencyHooks(dto)}

    const ${handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${result} = await create${pascalCase(dto.modelName)}Async(${dto.modelName});
        navigate(${dto.modelName.toUpperCase()}_ROUTES.index);
    };

    const ${initialData} = useMemo(() => {
        const ${camelCase(dto.modelName)} = createEmpty${pascalCase(dto.modelName)}();
        return ${camelCase(dto.modelName)};
    }, []);


    return (${PageLayout(
      CreateForm(dto.modelName),
      title,
      links,
      breadcrumbsAction
    )});
};
    
export default Create${pascalCase(dto.modelName)}Page;`;
};
