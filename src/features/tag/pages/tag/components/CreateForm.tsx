import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    submitHandler: (tag: Tag) => Promise<void>;
    isLoading: boolean;
}

export const CreateTagForm: React.FC<Props> = ({ submitHandler, isLoading }) => {
    const methods = useForm<Tag>()
    const { handleSubmit } = methods;
    
    const onSubmit: SubmitHandler<Tag> = async (tag: Tag) => {
        await submitHandler(tag);
    };
    
    return (
        <MyFormProviderWithCardLayout
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
        >
            
        <SingleColumnBox>
          
  
  <RHFTextField 
    name="id" 
    label="Id" 
    required: REQUIRED_FIELD_ERROR_MESSAGE />

  <RHFTextField 
    name="firstName" 
    label="First Name" 
     />

  <RHFTextField 
    name="lastName" 
    label="Last Name" 
     />

  <RHFTextField 
    name="email" 
    label="Email" 
     />

  <RHFTextField 
    name="authId" 
    label="Auth Id" 
     />

  <RHFTextField 
    name="createdAt" 
    label="Created At" 
     />
        </SingleColumnBox>
        </MyFormProviderWithCardLayout>
    );
};