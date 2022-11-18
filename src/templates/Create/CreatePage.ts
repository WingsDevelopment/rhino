import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { rhinoConfig } from "../../cli";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
import { RQCreateHook } from "../Hooks/useCreate";
import { RQCreateForm } from "./CreateForm";
import { GetRoutesName } from "../routes";
import { rsc } from "../../rhinoStringConfig";

const CreatePageName = (featureName: string) => {
  return `Create${pascalCase(featureName)}Page`;
};

// prettier-ignore
const GetCreatePageString = (
  featureName: string,
  dto: DTOSchema,
) => {
  return `
import React, { useMemo } from 'react';
import { ${rsc.useNavigate} } from 'react-router';

export const ${CreatePageName(featureName)}: React.FC = () => {
    const { create${pascalCase(dto.modelName)}Async, ${rsc.isLoading} } = ${RQCreateHook.getName(featureName)}();
    const ${rsc.navigate} = ${rsc.useNavigate}();
    ${renderDependencyHooks(dto)}

    const ${rsc.handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${rsc.id} = await create${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${rsc.navigate}(${GetRoutesName(featureName)}.${rsc.detailsRoute} + "/" + ${rsc.id});
    };

    return (${PageLayout(
      RQCreateForm.invoke(featureName, ""),
      `Create ${featureName}`,
        [
          {
            name: `Create ${dto.modelName}`,
            href: `/${plural(dto.modelName)}`,
          },
        ]
    )});
};
    
export default ${CreatePageName(featureName)};`;
};

const GetCreatePageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.createPath}`;
};

export const RQCreatePage: ITemplate = {
  getName: CreatePageName,
  getBody: GetCreatePageString,
  getRoute: GetCreatePageRoute,
  extension: rsc.reactComponentExtension,
};
