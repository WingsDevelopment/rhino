import { MyFormProviderWithCardLayoutTsx } from "../../components";
import { RenderFields } from "../../components/fields/fieldUtils";
import { IInvokableTemplate } from "../../interfaces/ITemplate";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { rsc } from "../../rhinoStringConfig";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { RQUpdatePage } from "./UpdatePage";

const UpdateFormName = (modelName: string) => {
  return `Update${pascalCase(modelName)}Form`;
};

// prettier-ignore
const UpdateForm = (featureName: string, modelName: string) => {
    return `<Update${pascalCase(featureName)}Form ${rsc.submitHandler}={${rsc.handleSubmit}} ${rsc.isLoading}={${rsc.isLoading} || ${rsc.isSubmitting}} ${rsc.initialData}={${rsc.initialData}} />`;
}

// prettier-ignore
const GetUpdateFormString = (
    featureName: string,
    dto: DTOSchema,
) => {
    return `import { useEffect } from 'react';
import { ${rsc.SubmitHandler}, ${rsc.useForm} } from 'react-hook-form';

interface Props {
    ${rsc.submitHandler}: (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => Promise<void>;
    ${rsc.isLoading}: boolean;
    ${rsc.initialData}: ${pascalCase(dto.modelName)};
}

export const ${UpdateFormName(featureName)}: React.FC<Props> = ({ ${rsc.submitHandler}, ${rsc.isLoading}, ${rsc.initialData} }) => {
    const ${rsc.methods} = ${rsc.useForm}<${pascalCase(dto.modelName)}>()
    const { ${rsc.handleSubmit} } = ${rsc.methods};
    
    useEffect(() => {
        ${rsc.methods}.${rsc.reset}(${rsc.initialData});
    }, [${rsc.initialData}, ${rsc.methods}]);

    const ${rsc.onSubmit}: ${rsc.SubmitHandler}<${pascalCase(dto.modelName)}> = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        await ${rsc.submitHandler}(${camelCase(dto.modelName)});
    }

    return (
      <${rsc.Card}>
        <${rsc.RAsyncContent} ${rsc.isLoading}={${rsc.isLoading}}>
          <${rsc.MyFormProvider} ${rsc.methods}={${rsc.methods}} ${rsc.onSubmit}={${rsc.handleSubmit}(${rsc.onSubmit})}>
            <${rsc.RSingleColumnBox}>
                ${RenderFormBody(dto, dto.modelName)}
              <${rsc.button} type="submit">${rsc.Submit}</button>
            </${rsc.RSingleColumnBox}>
          </${rsc.MyFormProvider}>
        </${rsc.RAsyncContent}>
      </${rsc.Card}>
    );
};`;
};

const RenderFormBody = (model: DTOSchema, modelName: string) => {
  const numberOfKeys = getPropertiesFromSchema(model).length;
  return RenderFields(model, modelName);
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
  extension: rsc.reactComponentExtension,
};
