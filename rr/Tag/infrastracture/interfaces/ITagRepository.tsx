
    export interface ITagRepository {
        CreateTagAsync: (dto: NewTagDtoDTO) => Promise<string | undefined>;
        UpdateTagAsync: (dto: NewTagDtoDTO) => Promise<string | undefined>;
        
        GetTagByIdAsync: (id: string) => Promise<NewTagDtoDTO | undefined>;
        GetAllTagAsync: () => Promise<NewTagDtoDTO[] | undefined>;
    }
    