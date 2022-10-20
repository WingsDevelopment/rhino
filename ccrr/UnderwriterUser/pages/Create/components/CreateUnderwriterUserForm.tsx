import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    submitHandler: (newCommonUser: NewCommonUser) => Promise<void>;
    isLoading: boolean;
}

export const CreateUnderwriterUserForm: React.FC<Props> = ({ submitHandler, isLoading }) => {
    const methods = useForm<NewCommonUser>()
    const { handleSubmit } = methods;
    
    const onSubmit: SubmitHandler<NewCommonUser> = async (newCommonUser: NewCommonUser) => {
        await submitHandler(newCommonUser);
    };
    
    return (
        <DefaultSingleColumnFormCard
          methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
        >
            
      <DoubleColumnBox>
          
  
  <RHFTextField 
    name="firstName" 
    label="First Name" 
     />

  <RHFTextField 
    name="lastName" 
    label="Last Name" 
     />

  <RHFTextField 
    name="username" 
    label="Username" 
     />

  <RHFTextField 
    name="email" 
    label="Email" 
     />
      </DoubleColumnBox>
        </DefaultSingleColumnFormCard>
    );
};