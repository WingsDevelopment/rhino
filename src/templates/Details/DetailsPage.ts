import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
import {
  id,
  isLoading,
  reactComponentExtension,
  useParams,
} from "../../stringConfig";
import { useFetchByIdName } from "../Hooks/useFetchById";
import { RQDetailsBody } from "./DetailsBody";

const DetailsPageName = (featureName: string) => {
  return `Details${pascalCase(featureName)}Page`;
};

// prettier-ignore
const GetDetailsPageString = (
  featureName: string,
  dto: DTOSchema,
) => {
  return `
import React from 'react';
import { ${useParams} } from 'react-router';

export const ${DetailsPageName(featureName)}: React.FC = () => {
    const { ${id} } = ${useParams}<{ ${id}: string }>();
    const { ${camelCase(dto.modelName)}, ${isLoading} } = ${useFetchByIdName(featureName)}(${id});
    ${renderDependencyHooks(dto)}

    return (${PageLayout(
      RQDetailsBody.invoke(featureName, dto.modelName),
      `Details ${featureName}`,
      [
        {
          name: `Details ${dto.modelName}`,
          href: `/${plural(dto.modelName)}`,
        },
      ]
    )});
}

export default ${DetailsPageName(featureName)}`;
};

const DetailsPageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.detailsPath}`;
};

export const RQDetailsPage: ITemplate = {
  getName: DetailsPageName,
  getBody: GetDetailsPageString,
  getRoute: DetailsPageRoute,
  extension: reactComponentExtension,
};
