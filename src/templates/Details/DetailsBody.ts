import {
  RenderReadonlyFields,
  SingleColumnReadonlyBody,
  TwoColumnReadonlyBody,
} from "../../components/fields/fieldUtils";
import { IInvokableTemplate, ITemplate } from "../../interfaces/ITemplate";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { rsc } from "../../rhinoStringConfig";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { RQDetailsPage } from "./DetailsPage";

const DetailsBodyName = (featureName: string) => {
  return `Details${pascalCase(featureName)}Body`;
};

// prettier-ignore
const DetailsBody = (
  featureName: string,
  modelName: string,
) => {
    return `<${DetailsBodyName(featureName)} ${camelCase(modelName)}={${camelCase(modelName)}} ${rsc.isLoading}={${rsc.isLoading}} />`;
}
// prettier-ignore
const GetDetailsBodyString = (
    featureName: string,
    dto: DTOSchema,
) => {
    return `
interface Props {
    ${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)} | undefined;
    ${rsc.isLoading}: boolean;
}

export const ${DetailsBodyName(featureName)}: React.FC<Props> = ({ ${camelCase(dto.modelName)}, ${rsc.isLoading} }) => {
    return (
        <${rsc.RAsyncContent} ${rsc.isLoading}={${rsc.isLoading}}>
          <${rsc.RSingleColumnBox}>
            ${RenderDetailsBody(dto, dto.modelName)}
          </${rsc.RSingleColumnBox}>
        </${rsc.RAsyncContent}>
    )
}
`
};

const RenderDetailsBody = (model: DTOSchema, modelName: string) => {
  const numberOfKeys = getPropertiesFromSchema(model).length;
  //todo add 5 to config ?
  return RenderReadonlyFields(model, modelName);
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
  extension: rsc.reactComponentExtension,
};
