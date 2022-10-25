import { MyFormProviderWithCardLayoutTsx } from "../../components";
import {
  SingleColumnBody,
  TwoColumnBody,
} from "../../components/fields/fieldUtils";
import { IInvokableTemplate } from "../../interfaces/ITemplate";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  handleSubmit,
  initialData,
  isLoading,
  isSubmitting,
  methods,
  onSubmit,
  reactComponentExtension,
  reset,
  SubmitHandler,
  submitHandler,
  useForm,
} from "../../stringConfig";
import { RQUpdatePage } from "./UpdatePage";

const UpdateFormName = (modelName: string) => {
  return `Update${pascalCase(modelName)}Form`;
};

// prettier-ignore
const UpdateForm = (featureName: string, modelName: string) => {
    return `<Update${pascalCase(featureName)}Form ${submitHandler}={${handleSubmit}} ${isLoading}={${isLoading} | ${isSubmitting}} ${initialData}={${initialData}} />`;
}

// prettier-ignore
const GetUpdateFormString = (
    featureName: string,
    dto: DTOSchema,
) => {
    return `import { useEffect } from 'react';
import { ${SubmitHandler}, ${useForm} } from 'react-hook-form';

interface Props {
    ${submitHandler}: (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => Promise<void>;
    ${isLoading}: boolean;
    ${initialData}: ${pascalCase(dto.modelName)};
}

export const ${UpdateFormName(featureName)}: React.FC<Props> = ({ ${submitHandler}, ${isLoading}, ${initialData} }) => {
    const ${methods} = ${useForm}<${pascalCase(dto.modelName)}>()
    const { ${handleSubmit} } = ${methods};
    
    useEffect(() => {
        ${methods}.${reset}(${initialData});
    }, [${initialData}, ${methods}]);

    const ${onSubmit}: ${SubmitHandler}<${pascalCase(dto.modelName)}> = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        await ${submitHandler}(${camelCase(dto.modelName)});
    }

    return (
        <${MyFormProviderWithCardLayoutTsx}
            ${methods}={${methods}}
            ${onSubmit}={${handleSubmit}(${onSubmit})}
            ${isLoading}={${isLoading}}
        >
            ${RenderFormBody(dto, dto.modelName)}
        </${MyFormProviderWithCardLayoutTsx}>
    );
};`;
};

const RenderFormBody = (model: DTOSchema, modelName: string) => {
  const numberOfKeys = getPropertiesFromSchema(model).length;
  //todo add 5 to config ?
  return numberOfKeys > 5
    ? SingleColumnBody(model, modelName)
    : TwoColumnBody(model, modelName);
};

const GetUpdateFormRoute = (featureName: string, baseRoute: string) => {
  const basePath = RQUpdatePage.getRoute(featureName, baseRoute);
  return `${basePath}/components`;
};

export const RQUpdateForm: IInvokableTemplate = {
  getName: UpdateFormName,
  getBody: GetUpdateFormString,
  getRoute: GetUpdateFormRoute,
  invoke: UpdateForm,
  extension: reactComponentExtension,
};
