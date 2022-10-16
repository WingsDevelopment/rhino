import { getPropertiesFromSchema, DTOSchema } from "../../schema/ShemaModel";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { LoadableCardWrapperTsx } from "../../components/loadable";
import {
  SingleColumnReadonlyBody,
  TwoColumnReadonlyBody,
} from "../../components/fields/fieldUtils";
import { isLoading } from "../common";

// prettier-ignore
export const DetailsBody = (
    modelName: string,
    isLoadingName: string,
) => {
    return `<Details${pascalCase(modelName)}Body ${camelCase(modelName)}={${camelCase(modelName)}} isLoading={${isLoadingName}} />`;
}
// prettier-ignore
export const GetDetailsBodyString = (
    modelName: string,
    model: DTOSchema,
) => {
    return `
interface Props {
    ${camelCase(modelName)}: ${pascalCase(modelName)};
    ${isLoading}: boolean;
}

export const Details${pascalCase(modelName)}Body: React.FC<Props> = ({ ${camelCase(modelName)}, ${isLoading} }) => {
    return (
        <${LoadableCardWrapperTsx} ${isLoading}={${isLoading}}>
            ${RenderDetailsBody(model, modelName)}
        </${LoadableCardWrapperTsx}>
    )
}

export default Details${pascalCase(modelName)}Body;`
};

const RenderDetailsBody = (model: DTOSchema, modelName: string) => {
  const numberOfKeys = getPropertiesFromSchema(model).length;
  //todo add 5 to config ?
  return numberOfKeys > 5
    ? SingleColumnReadonlyBody(model, modelName)
    : TwoColumnReadonlyBody(model, modelName);
};
