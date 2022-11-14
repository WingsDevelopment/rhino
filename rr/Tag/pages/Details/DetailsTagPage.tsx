
import React from 'react';
import { useParams } from 'react-router';

export const DetailsTagPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { newTagDto, isLoading } = useFetchTagById(id);
    

    return (
      <DefaultPageWithBreadcrumbs
          title="Details Tag"
          links={[
        {
            name:"Details NewTagDto",
            href:"/NewTagDtos",
        },]}
            
      >
          <DetailsTagBody newTagDto={newTagDto} isLoading={isLoading} />
      </DefaultPageWithBreadcrumbs>);
}

export default DetailsTagPage