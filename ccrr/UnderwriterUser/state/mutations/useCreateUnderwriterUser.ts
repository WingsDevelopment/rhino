
import { useMutation, useQueryClient } from 'react-query';

export const useCreateUnderwriterUser = () => {
    const EnqueueMessage = NotificationAdapter();
    const queryClient = useQueryClient();
    const config = useDefaultRQConfig('useCreateNewCommonUser');

    const { isLoading, error, mutateAsync } = useMutation(
        async (newCommonUser: NewCommonUser) => {
            const response = await DIContext.UnderwriterUserRepository.CreateUnderwriterUserAsync(newCommonUserDTOExtension(newCommonUser));
            return response;
        },
        {
            ...config,
            onSuccess: () => {
                queryClient.invalidateQueries([FETCH_ALL_NEWCOMMONUSERS]);
                EnqueueMessage('NewCommonUser is successfully created', 'success');
            },
        }
    );

    return {
        createNewCommonUserAsync: mutateAsync,
        errorMessage: error ? getServerErrorMessage(error) : undefined,
        isLoading,
    };
};