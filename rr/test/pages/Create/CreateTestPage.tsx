
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const CreateTestPage: React.FC = () => {
    const { createActivateUserAsync, isLoading } = useCreateTest();
    const navigate = useNavigate();
    

    const handleSubmit = async (activateUser: ActivateUser) => {
        const id = await createActivateUserAsync(activateUser);
        navigate(TestRoutes.details + "/" + id);
    };

    return (
      <DefaultPageWithBreadcrumbs
          title="Create test"
          links={[
        {
            name:"Create ActivateUser",
            href:"/ActivateUsers",
        },]}
            
      >
          <CreateTestForm submitHandler={handleSubmit} isLoading={isLoading} />
      </DefaultPageWithBreadcrumbs>);
};
    
export default CreateTestPage;