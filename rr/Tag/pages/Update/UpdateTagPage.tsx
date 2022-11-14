
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';

export const UpdateTagPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { updateNewTagDtoAsync, isLoading: isSubmitting } = useUpdateNewTagDto();
    const { newTagDto, isLoading } = useFetchNewTagDtoById(id);
    

    const handleSubmit = async (newTagDto: NewTagDto) => {
        const id = await updateNewTagDtoAsync(newTagDto);
        navigate(TagRoutes.details + '/' + id);
    };

    const initialData = useMemo(() => (newTagDto ? newTagDto : createEmptyNewTagDto()), [newTagDto]);

    return (
      <DefaultPageWithBreadcrumbs
          title="Update Tag"
          links={[
        {
            name:"Update NewTagDto",
            href:"/NewTagDtos",
        },]}
            
      >
          <UpdateNewTagDtoForm submitHandler={handleSubmit} isLoading={isLoading || isSubmitting} initialData={initialData} />
      </DefaultPageWithBreadcrumbs>);
};

export default UpdateNewTagDtoPage;