import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { id, isLoading, useParams } from "../common";
import { IndexBody } from "./IndexBody";

export const IndexPageName = (modelName: string) => {
  return `Index${pascalCase(modelName)}Page.tsx`;
};

// prettier-ignore
export const GetIndexPageString = (
    dto: DTOSchema,
    title: string,
    links: TLink[],
    breadcrumbsAction?: any
    ) => {
    return `
import React from 'react';
import { ${useParams} } from 'react-router';

export const Index${pascalCase(dto.modelName)}Page: React.FC = () => {
    const { ${id} } = ${useParams}<{ ${id}: string }>();
    const { ${camelCase(dto.modelName)}, ${isLoading} } = useGet${pascalCase(dto.modelName)}();
    const ${camelCase(dto.modelName)} = get${pascalCase(dto.modelName)}ByIdAsync(${id});
    ${renderDependencyHooks(dto)}

    return (${PageLayout(
      IndexBody(dto.modelName),
      title,
      links,
      breadcrumbsAction
    )});
}

export default Index${pascalCase(dto.modelName)}Page;`
};
