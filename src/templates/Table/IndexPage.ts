import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import { isLoading } from "../common";
import { useFetchAllName } from "../Hooks/useFetchAll";
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

export const Index${pascalCase(dto.modelName)}Page: React.FC = () => {
    const { ${pluralCamelCase(dto.modelName)}, ${isLoading} } = ${useFetchAllName(dto.modelName)}();
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
