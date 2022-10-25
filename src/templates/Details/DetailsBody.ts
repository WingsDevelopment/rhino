import { LoadableCardWrapperTsx } from "../../components";
import {
  SingleColumnReadonlyBody,
  TwoColumnReadonlyBody,
} from "../../components/fields/fieldUtils";
import { IInvokableTemplate, ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { isLoading, reactComponentExtension } from "../../stringConfig";
import { RQDetailsPage } from "./DetailsPage";

const DetailsBodyName = (featureName: string) => {
  return `Details${pascalCase(featureName)}Body`;
};

// prettier-ignore
const DetailsBody = (
  featureName: string,
  modelName: string,
) => {
    return `<${DetailsBodyName(featureName)} ${camelCase(modelName)}={${camelCase(modelName)}} ${isLoading}={${isLoading}} />`;
}
// prettier-ignore
const GetDetailsBodyString = (
    featureName: string,
    dto: DTOSchema,
) => {
    return `
interface Props {
    ${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)} | undefined;
    ${isLoading}: boolean;
}

export const ${DetailsBodyName(featureName)}: React.FC<Props> = ({ ${camelCase(dto.modelName)}, ${isLoading} }) => {
    return (
        <${LoadableCardWrapperTsx} ${isLoading}={${isLoading}}>
            ${RenderDetailsBody(dto, dto.modelName)}
        </${LoadableCardWrapperTsx}>
    )
}
`
};

const RenderDetailsBody = (model: DTOSchema, modelName: string) => {
  const numberOfKeys = getPropertiesFromSchema(model).length;
  //todo add 5 to config ?
  return numberOfKeys > 5
    ? SingleColumnReadonlyBody(model, modelName)
    : TwoColumnReadonlyBody(model, modelName);
};

const GetDetailsBodyRoute = (featureName: string, baseRoute: string) => {
  const basePath = RQDetailsPage.getRoute(featureName, baseRoute);
  return `${basePath}/components`;
};

export const RQDetailsBody: IInvokableTemplate = {
  getName: DetailsBodyName,
  getBody: GetDetailsBodyString,
  getRoute: GetDetailsBodyRoute,
  invoke: DetailsBody,
  extension: reactComponentExtension,
};
