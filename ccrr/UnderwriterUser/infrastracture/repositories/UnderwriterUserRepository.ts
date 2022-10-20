
    //TODO: add api to environment? or delete this...
    const baseUrl = process.env.REACT_APP__U_N_D_E_R_W_R_I_T_E_R_U_S_E_R;

    const CreateUnderwriterUserAsync = async (dto: NewCommonUserDto ): Promise<string | undefined> => {
            const response: AxiosResponse<string> = await axios.post(
                `${baseUrl}/create`,
                dto
            );

            return response.data;
        };

    

    

    

    

    export const UnderwriterUserRepository = {
        CreateUnderwriterUserAsync,
        
        
        
        
    };
