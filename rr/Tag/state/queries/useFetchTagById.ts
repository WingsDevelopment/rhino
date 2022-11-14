
  import { useQuery, useQueryClient } from 'react-query';
  
  export const FETCH_BY_TAG_ID = "FETCH_BY_TAG_ID";
  
  export const useFetchTagById = (id: string | undefined) => {
      const config = useDefaultRQConfig('useFetchTagById');
  
      const { isLoading, error, data } = useQuery(
            [FETCH_BY_TAG_ID, id],
          async () => {
            const response = await DIContext.TagRepository.GetTagByIdAsync(id!);
        return response ? newTagDtoModelExtension(response) : undefined;
          },
          {
              ...config,
              enabled: !!id,
          }
      );
  
      return {
          newTagDto: data,
          errorMessage: error ? getServerErrorMessage(error) : undefined,
          isLoading,
      };
  };