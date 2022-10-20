import { LoadableCardWrapperTsx } from "../../components";
import {
  SingleColumnReadonlyBody,
  TwoColumnReadonlyBody,
} from "../../components/fields/fieldUtils";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { isLoading } from "../common";

export const DetailsBodyName = (featureName: string) => {
  return `Details${pascalCase(featureName)}Body`;
};

// prettier-ignore
export const DetailsBody = (
    modelName: string,
    featureName: string,
) => {
    return `<${DetailsBodyName(featureName)} ${camelCase(modelName)}={${camelCase(modelName)}} ${isLoading}={${isLoading}} />`;
}
// prettier-ignore
export const GetDetailsBodyString = (
    dto: DTOSchema,
    featureName: string,
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
