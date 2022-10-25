import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { rhinoConfig } from "../../config";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { pascalCase, plural, pluralCamelCase } from "../../utils/stringUtils";
import { isLoading, reactComponentExtension } from "../../stringConfig";
import { useFetchAllName } from "../Hooks/useFetchAll";
import { RQIndexBody } from "./IndexBody";

export const IndexPageName = (modelName: string) => {
  return `Index${pascalCase(modelName)}Page`;
};

// prettier-ignore
export const GetIndexPageString = (
    featureName: string,
    dto: DTOSchema,
    ) => {
    return `
import React from 'react';

export const ${IndexPageName(dto.modelName)}: React.FC = () => {
    const { ${pluralCamelCase(dto.modelName)}, ${isLoading} } = ${useFetchAllName(dto.modelName)}();
    ${renderDependencyHooks(dto)}

    return (${PageLayout(
      RQIndexBody.invoke(featureName, dto.modelName),
      `List ${featureName}`,
      [
        {
          name: `${dto.modelName} table`,
          href: `/${plural(dto.modelName)}`,
        },
      ]
    )});
}

export default ${IndexPageName(dto.modelName)};`
};

const IndexPageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.listPath}`;
};

export const RQIndexPage: ITemplate = {
  getName: IndexPageName,
  getBody: GetIndexPageString,
  getRoute: IndexPageRoute,
  extension: reactComponentExtension,
};