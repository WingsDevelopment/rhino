
    interface IDIContext {
        TagRepository: ITagRepository;
    }

    export const DIContext: IDIContext = {
        TagRepository: TagRepository,
    };
