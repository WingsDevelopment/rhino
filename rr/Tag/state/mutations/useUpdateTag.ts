
  import { useMutation, useQueryClient } from 'react-query';
  
  export const useUpdateNewTagDto = () => {
      const EnqueueMessage = NotificationAdapter();
      const queryClient = useQueryClient();
      const config = useDefaultRQConfig('useUpdateNewTagDto');
  
      const { isLoading, error, mutateAsync } = useMutation(
          async (newTagDto: NewTagDto) => {
            const response = await DIContext.TagRepository.UpdateTagAsync(newTagDtoDTOExtension(newTagDto));
        return response;
          },
          {
              ...config,
              onSuccess: () => {
                  queryClient.invalidateQueries([FETCH_ALL_TAGS]);
                  EnqueueMessage('NewTagDto is successfully updated', 'success');
              },
          }
      );
  
      return {
          updateNewTagDtoAsync: mutateAsync,
          errorMessage: error ? getServerErrorMessage(error) : undefined,
          isLoading,
      };
  };