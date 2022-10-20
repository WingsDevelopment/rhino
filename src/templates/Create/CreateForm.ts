import {
  SingleColumnBody,
  TwoColumnBody,
} from "../../components/fields/fieldUtils";
import { MyFormProviderWithCardLayoutTsx } from "../../components/layouts";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  handleSubmit,
  isLoading,
  methods,
  onSubmit,
  submitHandler,
  SubmitHandler,
  useForm,
} from "../common";

export const CreateFormName = (featureName: string) => {
  return `Create${pascalCase(featureName)}Form`;
};

// prettier-ignore
export const CreateForm = (featureName: string) => {
  return `<${CreateFormName(featureName)} ${submitHandler}={${handleSubmit}} ${isLoading}={${isLoading}} />`;
}

// prettier-ignore
export const GetCreateFormString = (
  featureName: string,
  dto: DTOSchema,
) => {
  return `import { useEffect } from 'react';
import { ${SubmitHandler}, ${useForm} } from 'react-hook-form';

interface Props {
    ${submitHandler}: (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => Promise<void>;
    ${isLoading}: boolean;
}

export const ${CreateFormName(featureName)}: React.FC<Props> = ({ ${submitHandler}, ${isLoading} }) => {
    const ${methods} = ${useForm}<${pascalCase(dto.modelName)}>()
    const { ${handleSubmit} } = ${methods};
    
    const ${onSubmit}: SubmitHandler<${pascalCase(dto.modelName)}> = async (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => {
        await ${submitHandler}(${camelCase(dto.modelName)});
    };
    
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
