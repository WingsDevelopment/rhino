import { MyFormProviderWithCardLayoutTsx } from "../../components/layouts";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  SingleColumnBody,
  TwoColumnBody,
} from "../../components/fields/fieldUtils";
import { handleSubmit, isLoading } from "../common";

export const CreateFormName = (modelName: string) => {
  return `Create${pascalCase(modelName)}Form.tsx`;
};

// prettier-ignore
export const CreateForm = (modelName: string) => {
  return `<Create${pascalCase(modelName)}Form submitHandler={${handleSubmit}} ${isLoading}={${isLoading}} />`;
}

// prettier-ignore
export const GetCreateFormString = (
  modelName: string,
  model: DTOSchema,
) => {
  return `import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    submitHandler: (${camelCase(modelName)}: ${pascalCase(modelName)}) => Promise<void>;
    ${isLoading}: boolean;
}

export const Create${pascalCase(modelName)}Form: React.FC<Props> = ({ submitHandler, ${isLoading} }) => {
    const methods = useForm<${pascalCase(modelName)}>()
    const { ${handleSubmit} } = methods;
    
    const onSubmit: SubmitHandler<${pascalCase(modelName)}> = async (${camelCase(modelName)}: ${pascalCase(modelName)}) => {
        await submitHandler(${camelCase(modelName)});
    };
    
    return (
        <${MyFormProviderWithCardLayoutTsx}
            methods={methods}
            onSubmit={${handleSubmit}(onSubmit)}
            ${isLoading}={${isLoading}}
        >
            ${RenderFormBody(model, modelName)}
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
