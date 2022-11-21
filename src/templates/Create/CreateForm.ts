import { RenderFields } from "../../components/fields/fieldUtils";
import { IInvokableTemplate } from "../../interfaces/ITemplate";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { rsc } from "../../rhinoStringConfig";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import { RQCreatePage } from "./CreatePage";

const CreateFormName = (featureName: string) => {
  return `Create${pascalCase(featureName)}Form`;
};

// prettier-ignore
const CreateForm = (featureName: string) => {
  return `<${CreateFormName(featureName)} ${rsc.submitHandler}={${rsc.handleSubmit}} ${rsc.isLoading}={${rsc.isLoading}} />`;
}

// prettier-ignore
const GetCreateFormString = (
  featureName: string,
  dto: DTOSchema,
) => {
  return `import { useEffect } from 'react';
import { ${rsc.SubmitHandler}, ${rsc.useForm} } from 'react-hook-form';

interface Props {
    ${rsc.submitHandler}: (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => Promise<void>;
    ${rsc.isLoading}: boolean;
}

export const ${CreateFormName(featureName)}: React.FC<Props> = ({ ${rsc.submitHandler}, ${rsc.isLoading} }) => {
    const ${rsc.methods} = ${rsc.useForm}<${pascalCase(dto.modelName)}>()
    const { ${rsc.handleSubmit} } = ${rsc.methods};
    
    const ${rsc.onSubmit}: SubmitHandler<${pascalCase(dto.modelName)}> = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        await ${rsc.submitHandler}(${camelCase(dto.modelName)});
    };
    
    return (
      <${rsc.Card}>
        <${rsc.RAsyncContent} ${rsc.isLoading}={${rsc.isLoading}}>
          <${rsc.MyFormProvider} ${rsc.methods}={${rsc.methods}} ${rsc.onSubmit}={${rsc.handleSubmit}(${rsc.onSubmit})}>
            <${rsc.RSingleColumnBox}>
                ${RenderFormBody(dto, dto.modelName)}
              <${rsc.button} type="submit">${rsc.Submit}</${rsc.button}>
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

const GetCreateFormRoute = (featureName: string, baseRoute: string) => {
  const basePath = RQCreatePage.getRoute(featureName, baseRoute);
  return `${basePath}/components`;
};

export const RQCreateForm: IInvokableTemplate = {
  getRoute: GetCreateFormRoute,
  getBody: GetCreateFormString,
  getName: CreateFormName,
  invoke: CreateForm,
  extension: rsc.reactComponentExtension,
};
