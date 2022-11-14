
    const baseUrl = process.env.REACT_APP_YOUR_API_URL;

    const CreateTagAsync = async (requestDTO: NewTagDtoDTO): Promise<string | undefined> => {
        const response: AxiosResponse<string> = await axios.post(
      `${baseUrl}/create`,
      requestDTO
  );

  return response.data;
    };

    const UpdateTagAsync = async (requestDTO: NewTagDtoDTO ): Promise<string | undefined> => {
        const response: AxiosResponse<string> = await axios.put(
        `${baseUrl}/update`,
        requestDTO
    );

    return response.data;
    };

    

    const GetTagByIdAsync = async (id: string): Promise<NewTagDtoDTO | undefined> => {
        const response: AxiosResponse<NewTagDtoDTO> = await axios.get(
        `${baseUrl}/${id}`
    );

    return response.data;
    };

    const GetAllTagAsync = async (): Promise<NewTagDtoDTO[] | undefined> => {
        const response: AxiosResponse<NewTagDtoDTO[]> = await axios.get(
        `${baseUrl}/getAll`
    );

    return response.data;
    };

    export const TagRepository: ITagRepository = {
        CreateTagAsync,
        UpdateTagAsync,
        
        GetTagByIdAsync,
        GetAllTagAsync,
    };
