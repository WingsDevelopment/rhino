
    interface IDIContext {
        UnderwriterUserRepository: IUnderwriterUserRepository;
    }

    export const DIContext: IDIContext = {
        UnderwriterUserRepository: UnderwriterUserRepository,
    };
