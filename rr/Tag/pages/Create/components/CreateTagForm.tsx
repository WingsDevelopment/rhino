import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    submitHandler: (newTagDto: NewTagDto) => Promise<void>;
    isLoading: boolean;
}

export const CreateTagForm: React.FC<Props> = ({ submitHandler, isLoading }) => {
    const methods = useForm<NewTagDto>()
    const { handleSubmit } = methods;
    
    const onSubmit: SubmitHandler<NewTagDto> = async (newTagDto: NewTagDto) => {
        await submitHandler(newTagDto);
    };
    
    return (
        <DefaultSingleColumnFormCard
          methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
        >
            
      <DoubleColumnBox>
          
  
      </DoubleColumnBox>
        </DefaultSingleColumnFormCard>
    );
};