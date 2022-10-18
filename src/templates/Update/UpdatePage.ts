import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  errorMessage,
  handleSubmit,
  id,
  initialData,
  isLoading,
  navigate,
  useNavigate,
  useParams,
} from "../common";
import { UpdateForm } from "./UpdateForm";

export const UpdatePageName = (modelName: string) => {
  return `Update${pascalCase(modelName)}Page.tsx`;
};

// prettier-ignore
export const GetUpdatePageString = (
    dto: DTOSchema,
    title: string,
    links: TLink[],
    breadcrumbsAction?: any
  ) => {
    return `
import React, { useMemo } from 'react';
import { ${useParams}, ${useNavigate} } from 'react-router';

export const Update${pascalCase(dto.modelName)}Page: React.FC = () => {
    const { ${id} } = ${useParams}<{ ${id}: string }>();
    const ${navigate} = ${useNavigate}();
    const { update${pascalCase(dto.modelName)}Async, ${isLoading} } = useUpdate${pascalCase(dto.modelName)}();
    const { ${camelCase(dto.modelName)}, ${errorMessage}, ${isLoading}: ${isLoading}${pascalCase(dto.modelName)} } = useFetch${pascalCase(dto.modelName)}ById(${id});
    ${renderDependencyHooks(dto)}

    const ${handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${id} = await update${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${navigate}(${dto.modelName.toUpperCase()}_ROUTES.details + '/' + ${id});
    };

    const ${initialData} = useMemo(() => (${camelCase(dto.modelName)} ? createUpdate${pascalCase(dto.modelName)}(${camelCase(dto.modelName)}) : createEmptyUpdate${pascalCase(dto.modelName)}()), [${camelCase(dto.modelName)}]);

    return (${PageLayout(
      UpdateForm(dto.modelName),
      title,
      links,
      breadcrumbsAction
    )});
};

export default Update${pascalCase(dto.modelName)}Page;`;
};
