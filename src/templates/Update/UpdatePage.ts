import { PageLayout, TLink } from "../../components/layouts/PageLayout";
import { rhinoConfig } from "../../rhinoConfig";
import { ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { renderDependencyHooks } from "../../utils/renderDependencyHooks";
import { camelCase, pascalCase, plural } from "../../utils/stringUtils";
import {
  detailsRoute,
  handleSubmit,
  id,
  initialData,
  isLoading,
  isSubmitting,
  navigate,
  reactComponentExtension,
  useNavigate,
  useParams,
} from "../../stringConfig";
import { GetRoutesName } from "../routes/routes";
import { RQUpdateForm } from "./UpdateForm";

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
import { ${useParams}, ${useNavigate} } from 'react-router';

export const ${UpdatePageName(featureName)}: React.FC = () => {
    const { ${id} } = ${useParams}<{ ${id}: string }>();
    const ${navigate} = ${useNavigate}();
    const { update${pascalCase(dto.modelName)}Async, ${isLoading}: ${isSubmitting} } = useUpdate${pascalCase(dto.modelName)}();
    const { ${camelCase(dto.modelName)}, ${isLoading} } = useFetch${pascalCase(dto.modelName)}ById(${id});
    ${renderDependencyHooks(dto)}

    const ${handleSubmit} = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        const ${id} = await update${pascalCase(dto.modelName)}Async(${camelCase(dto.modelName)});
        ${navigate}(${GetRoutesName(featureName)}.${detailsRoute} + '/' + ${id});
    };

    const ${initialData} = useMemo(() => (${camelCase(dto.modelName)} ? ${camelCase(dto.modelName)} : createEmpty${pascalCase(dto.modelName)}()), [${camelCase(dto.modelName)}]);

    return (${PageLayout(
      RQUpdateForm.invoke( dto.modelName, dto.modelName),
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
  extension: reactComponentExtension,
};
