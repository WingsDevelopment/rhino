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
  modelName: string,
  model: DTOSchema,
  title: string,
  links: TLink[],
  breadcrumbsAction?: any
) => {
  return `
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const Create${pascalCase(modelName)}Page: React.FC = () => {
    const { create${pascalCase(modelName)}Async, ${isLoading} } = useCreate${pascalCase(modelName)}();
    const navigate = useNavigate();
    ${renderDependencyHooks(model)}

    const ${handleSubmit} = async (${camelCase(modelName)}: ${pascalCase(modelName)}) => {
        const ${result} = await create${pascalCase(modelName)}Async(${modelName});
        navigate(${modelName.toUpperCase()}_ROUTES.index);
    };

    const ${initialData} = useMemo(() => {
        const ${camelCase(modelName)} = createEmpty${pascalCase(modelName)}();
        return ${camelCase(modelName)};
    }, []);


    return (${PageLayout(
      CreateForm(modelName),
      title,
      links,
      breadcrumbsAction
    )});
};
    
export default Create${pascalCase(modelName)}Page;`;
};
