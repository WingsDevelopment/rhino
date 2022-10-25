
    interface IDIContext {
        TestRepository: ITestRepository;
    }

    export const DIContext: IDIContext = {
        TestRepository: TestRepository,
    };
