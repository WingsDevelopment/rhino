
  import { useMutation, useQueryClient } from 'react-query';

    export const FETCH_ALL_TAGS = "FETCH_ALL_TAGS";
  
  export const useFetchAllTag = () => {
      const config = useDefaultRQConfig('useFetchAllTag');
  
      const { isLoading, error, data } = useQuery(
          [FETCH_ALL_TAGS],
          async () => {
            const response = await DIContext.TagRepository.CreateTagAsync();
        return response;
          },
          {
              ...config,
          }
      );
  
      return {
          newTagDtos: data,
          errorMessage: error ? getServerErrorMessage(error) : undefined,
          isLoading,
      };
  };