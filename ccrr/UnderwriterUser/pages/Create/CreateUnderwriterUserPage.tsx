
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const CreateUnderwriterUserPage: React.FC = () => {
    const { createNewCommonUserAsync, isLoading } = useCreateUnderwriterUser();
    const navigate = useNavigate();
    

    const handleSubmit = async (newCommonUser: NewCommonUser) => {
        const id = await createNewCommonUserAsync(newCommonUser);
        navigate(UnderwriterUserRoutes.details + "/" + id);
    };

    return (
      <DefaultPageWithBreadcrumbs
          title="Create UnderwriterUser"
          links={[
        {
            name:"Create NewCommonUser",
            href:"/NewCommonUsers",
        },]}
            
      >
          <CreateUnderwriterUserForm submitHandler={handleSubmit} isLoading={isLoading} />
      </DefaultPageWithBreadcrumbs>);
};
    
export default CreateUnderwriterUserPage;