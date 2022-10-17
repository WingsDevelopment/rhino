import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { DetailsBody } from "./DetailsBody";
import { id, isLoading } from "../common";

export const DetailsPageName = (modelName: string) => {
  return `Details${pascalCase(modelName)}Page.tsx`;
};

// prettier-ignore
export const GetDetailsPageString = (
  dto: DTOSchema,
  title: string,
  links: TLink[],
  breadcrumbsAction?: any
) => {
  return `
import React from 'react';
import { useParams } from 'react-router';

export const Details${pascalCase(dto.modelName)}Page: React.FC = () => {
    const { ${id} } = useParams<{ ${id}: string }>();
    const { ${camelCase(dto.modelName)}, ${isLoading} } = useGet${pascalCase(dto.modelName)}();
    const ${camelCase(dto.modelName)} = get${pascalCase(dto.modelName)}ByIdAsync(${id});
    ${renderDependencyHooks(dto)}

    return (${PageLayout(
      DetailsBody(dto.modelName),
      title,
      links,
      breadcrumbsAction
    )});
}

export default Details${pascalCase(dto.modelName)}Page;`;
};
