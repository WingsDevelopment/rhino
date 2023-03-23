import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { rhinoConfig } from "../..";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
import { RQUpdateForm } from "./UpdateForm";
import { GetRoutesName } from "../routes";
import { rsc } from "../../rhinoStringConfig";

const UpdatePageName = (featureName: string) => {
  return `Update${pascalCase(featureName)}Page`;
};

// prettier-ignore
const GetUpdatePageString = (
    featureName: string,
    dto: DTOSchema,
  ) => {
    return `
import React, { useMemo } from 'react';
import { ${rsc.useParams}, ${rsc.useNavigate} } from 'react-router';

export const ${UpdatePageName(featureName)}: React.FC = () => {
    const { ${rsc.id} } = ${rsc.useParams}<{ ${rsc.id}: string }>();
    const ${rsc.navigate} = ${rsc.useNavigate}();
    const { update${pascalCase(dto.modelName)}Async, ${rsc.isLoading}: ${rsc.isSubmitting} } = useUpdate${pascalCase(dto.modelName)}();
    const { ${camelCase(dto.modelName)}, ${rsc.isLoading} } = useFetch${pascalCase(dto.modelName)}ById(${rsc.id});
    ${renderDependencyHooks(dto)}

    const ${rsc.handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${rsc.id} = await update${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${rsc.navigate}(${GetRoutesName(featureName)}.${rsc.detailsRoute} + '/' + ${rsc.id});
    };

    const ${rsc.initialData} = useMemo(() => (${camelCase(dto.modelName)} ? ${camelCase(dto.modelName)} : createEmpty${pascalCase(dto.modelName)}()), [${camelCase(dto.modelName)}]);

    return (${PageLayout(
      RQUpdateForm.invoke( featureName, dto.modelName),
      `Update ${featureName}`,
      [
        {
          name: `Update ${dto.modelName}`,
          href: `/${plural(dto.modelName)}`,
        },
      ]
    )});
};

export default Update${pascalCase(dto.modelName)}Page;`;
};

const UpdatePageRoute = (featureName: string, baseRoute: string) => {
  return `${baseRoute}/${featureName}${rhinoConfig.updatePath}`;
};

export const RQUpdatePage: ITemplate = {
  getName: UpdatePageName,
  getBody: GetUpdatePageString,
  getRoute: UpdatePageRoute,
  extension: rsc.reactComponentExtension,
};
