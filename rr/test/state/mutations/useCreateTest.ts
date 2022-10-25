
import { useMutation, useQueryClient } from 'react-query';

export const useCreateTest = () => {
    const EnqueueMessage = NotificationAdapter();
    const queryClient = useQueryClient();
    const config = useDefaultRQConfig('useCreateActivateUser');

    const { isLoading, error, mutateAsync } = useMutation(
        async (activateUser: ActivateUser) => {
            const response = await DIContext.TestRepository.CreateTestAsync(activateUserDTOExtension(activateUser));
            return response;
        },
        {
            ...config,
            onSuccess: () => {
                queryClient.invalidateQueries([FETCH_ALL_ACTIVATEUSERS]);
                EnqueueMessage('ActivateUser is successfully created', 'success');
            },
        }
    );

    return {
        createActivateUserAsync: mutateAsync,
        errorMessage: error ? getServerErrorMessage(error) : undefined,
        isLoading,
    };
};