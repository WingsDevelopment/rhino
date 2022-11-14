
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const CreateTagPage: React.FC = () => {
    const { createNewTagDtoAsync, isLoading } = useCreateTag();
    const navigate = useNavigate();
    

    const handleSubmit = async (newTagDto: NewTagDto) => {
        const id = await createNewTagDtoAsync(newTagDto);
        navigate(TagRoutes.details + "/" + id);
    };

    return (
      <DefaultPageWithBreadcrumbs
          title="Create Tag"
          links={[
        {
            name:"Create NewTagDto",
            href:"/NewTagDtos",
        },]}
            
      >
          <CreateTagForm submitHandler={handleSubmit} isLoading={isLoading} />
      </DefaultPageWithBreadcrumbs>);
};
    
export default CreateTagPage;