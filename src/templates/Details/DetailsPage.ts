import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { id, isLoading, useParams } from "../common";
import { useFetchByIdName } from "../Hooks/useFetchById";
import { DetailsBody } from "./DetailsBody";

export const DetailsPageName = (featureName: string) => {
  return `Details${pascalCase(featureName)}Page`;
};

// prettier-ignore
export const GetDetailsPageString = (
  featureName: string,
  dto: DTOSchema,
  title: string,
  links: TLink[],
  breadcrumbsAction?: any
) => {
  return `
import React from 'react';
import { ${useParams} } from 'react-router';

export const ${DetailsPageName(featureName)}: React.FC = () => {
    const { ${id} } = ${useParams}<{ ${id}: string }>();
    const { ${camelCase(dto.modelName)}, ${isLoading} } = ${useFetchByIdName(featureName)}(${id});
    ${renderDependencyHooks(dto)}

    return (${PageLayout(
      DetailsBody(dto.modelName, featureName),
      title,
      links,
      breadcrumbsAction
    )});
}

export default Details${pascalCase(dto.modelName)}Page;`;
};
