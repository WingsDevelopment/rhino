
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const CreateTagPage: React.FC = () => {
    const { createTagAsync, isLoading } = useCreateTag();
    const navigate = useNavigate();
    

    const handleSubmit = async (tag: Tag) => {
        const result = await createTagAsync(tag);
        navigate(TAG_ROUTES.index);
    };

    const initialData = useMemo(() => {
        const tag = createEmptyTag();
        return tag;
    }, []);


    return (
      <DefaultPageWithBreadcrumbs
          title="Create Tag"
          links={[
        {
            name:"Tags",
            href:"/tags",
        },]}
            
      >
          <CreateTagForm submitHandler={handleSubmit} isLoading={isLoading} />
      </DefaultPageWithBreadcrumbs>);
};
    
export default CreateTagPage;