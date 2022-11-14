
import React from 'react';

export const TagIndexPage: React.FC = () => {
    const { newTagDtos, isLoading } = useFetchAllTag();
    

    return (
      <DefaultPageWithBreadcrumbs
          title="List Tag"
          links={[
        {
            name:"NewTagDto table",
            href:"/NewTagDtos",
        },]}
            
      >
          <IndexTagBody tags={tags} isLoading={isLoading} />
      </DefaultPageWithBreadcrumbs>);
}

export default TagIndexPage;