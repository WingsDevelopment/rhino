import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    submitHandler: (activateUser: ActivateUser) => Promise<void>;
    isLoading: boolean;
}

export const CreateTestForm: React.FC<Props> = ({ submitHandler, isLoading }) => {
    const methods = useForm<ActivateUser>()
    const { handleSubmit } = methods;
    
    const onSubmit: SubmitHandler<ActivateUser> = async (activateUser: ActivateUser) => {
        await submitHandler(activateUser);
    };
    
    return (
        <DefaultSingleColumnFormCard
          methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
        >
            
      <DoubleColumnBox>
          
  
  <RHFTextField 
    name="email" 
    label="Email" 
     />

  <RHFTextField 
    name="resetPasswordCode" 
    label="Reset Password Code" 
     />
      </DoubleColumnBox>
        </DefaultSingleColumnFormCard>
    );
};