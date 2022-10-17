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
  modelName: string,
  model: DTOSchema,
  title: string,
  links: TLink[],
  breadcrumbsAction?: any
) => {
  return `
import React from 'react';
import { useParams } from 'react-router';

export const Details${pascalCase(modelName)}Page: React.FC = () => {
    const { ${id} } = useParams<{ id: string }>();
    const { ${camelCase(modelName)}, ${isLoading} } = useGet${pascalCase(modelName)}();
    const ${camelCase(modelName)} = get${pascalCase(modelName)}ByIdAsync(${id});
    ${renderDependencyHooks(model)}

    return (${PageLayout(
      DetailsBody(modelName),
      title,
      links,
      breadcrumbsAction
    )});
}

export default Details${pascalCase(modelName)}Page;`;
};
