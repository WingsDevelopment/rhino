import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  details,
  handleSubmit,
  id,
  initialData,
  isLoading,
  isSubmitting,
  navigate,
  useNavigate,
  useParams,
} from "../common";
import { GetRoutesName } from "../routes/routes";
import { UpdateForm } from "./UpdateForm";

export const UpdatePageName = (featureName: string) => {
  return `Update${pascalCase(featureName)}Page`;
};

// prettier-ignore
export const GetUpdatePageString = (
    dto: DTOSchema,
    title: string,
    featureName: string,
    links: TLink[],
    breadcrumbsAction?: any
  ) => {
    return `
import React, { useMemo } from 'react';
import { ${useParams}, ${useNavigate} } from 'react-router';

export const ${UpdatePageName(featureName)}: React.FC = () => {
    const { ${id} } = ${useParams}<{ ${id}: string }>();
    const ${navigate} = ${useNavigate}();
    const { update${pascalCase(dto.modelName)}Async, ${isLoading}: ${isSubmitting} } = useUpdate${pascalCase(dto.modelName)}();
    const { ${camelCase(dto.modelName)}, ${isLoading} } = useFetch${pascalCase(dto.modelName)}ById(${id});
    ${renderDependencyHooks(dto)}

    const ${handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${id} = await update${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${navigate}(${GetRoutesName(featureName)}.${details} + '/' + ${id});
    };

    const ${initialData} = useMemo(() => (${camelCase(dto.modelName)} ? ${camelCase(dto.modelName)} : createEmpty${pascalCase(dto.modelName)}()), [${camelCase(dto.modelName)}]);

    return (${PageLayout(
      UpdateForm(dto.modelName),
      title,
      links,
      breadcrumbsAction
    )});
};

export default Update${pascalCase(dto.modelName)}Page;`;
};
