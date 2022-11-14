
import { useMutation, useQueryClient } from 'react-query';

export const useCreateTag = () => {
    const EnqueueMessage = NotificationAdapter();
    const queryClient = useQueryClient();
    const config = useDefaultRQConfig('useCreateTag');

    const { isLoading, error, mutateAsync } = useMutation(
        async (newTagDto: NewTagDto) => {
            const response = await DIContext.TagRepository.CreateTagAsync(newTagDtoDTOExtension(newTagDto));
        return response;
        },
        {
            ...config,
            onSuccess: () => {
                queryClient.invalidateQueries([FETCH_ALL_TAGS]);
                EnqueueMessage('NewTagDto is successfully created', 'success');
            },
        }
    );

    return {
        createNewTagDtoAsync: mutateAsync,
        errorMessage: error ? getServerErrorMessage(error) : undefined,
        isLoading,
    };
};