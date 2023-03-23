import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
import { useFetchByIdName } from "../Hooks/useFetchById";
import { RQDetailsBody } from "./DetailsBody";
import { rsc } from "../../rhinoStringConfig";
import { CommandRouteDict } from "../../enums/dictionaries";
import { GetRoutesName } from "../routes";

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
import { ${rsc.useParams} } from 'react-router';

export const ${DetailsPageName(featureName)}: React.FC = () => {
    const { ${rsc.id} } = ${rsc.useParams}<{ ${rsc.id}: string }>();
    const { ${camelCase(dto.modelName)}, ${rsc.isLoading} } = ${useFetchByIdName(featureName)}(${rsc.id});
    ${renderDependencyHooks(dto)}

    return (${PageLayout(
      RQDetailsBody.invoke(featureName, dto.modelName),
      `Details ${featureName}`,
      [
        {
          name: `Details ${dto.modelName}`,
          href: `${GetRoutesName(featureName)}.${CommandRouteDict.list}`,
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
  extension: rsc.reactComponentExtension,
};
