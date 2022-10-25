
    //TODO: add api to environment? or delete this...
    const baseUrl = process.env.REACT_APP__T_E_S_T;

    const CreateTestAsync = async (dto: ActivateUserDto ): Promise<string | undefined> => {
            const response: AxiosResponse<string> = await axios.post(
                `${baseUrl}/create`,
                dto
            );

            return response.data;
        };

    

    

    

    

    export const TestRepository = {
        CreateTestAsync,
        
        
        
        
    };
