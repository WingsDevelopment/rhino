import { MyFormProviderWithCardLayoutTsx } from "../../components";
import {
  SingleColumnBody,
  TwoColumnBody,
} from "../../components/fields/fieldUtils";
import { DTOSchema, getPropertiesFromSchema } from "../../models/DTOSchema";
import { camelCase, pascalCase } from "../../utils/stringUtils";
import {
  handleSubmit,
  initialData,
  isLoading,
  isSubmitting,
  methods,
  onSubmit,
  reset,
  SubmitHandler,
  submitHandler,
  useForm,
} from "../common";

export const UpdateFormName = (modelName: string) => {
  return `Update${pascalCase(modelName)}Form.tsx`;
};

// prettier-ignore
export const UpdateForm = (modelName: string) => {
    return `<Update${pascalCase(modelName)}Form ${submitHandler}={${handleSubmit}} ${isLoading}={${isLoading} | ${isSubmitting}} ${initialData}={${initialData}} />`;
}

// prettier-ignore
export const GetUpdateFormString = (
    dto: DTOSchema,
) => {
    return `import { useEffect } from 'react';
import { ${SubmitHandler}, ${useForm} } from 'react-hook-form';

interface Props {
    ${submitHandler}: (${camelCase(dto.modelName)}: ${pascalCase(dto.modelName)}) => Promise<void>;
    ${isLoading}: boolean;
    ${initialData}: ${pascalCase(dto.modelName)};
}

export const Update${pascalCase(dto.modelName)}Form: React.FC<Props> = ({ ${submitHandler}, ${isLoading}, ${initialData} }) => {
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
