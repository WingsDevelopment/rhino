
export interface NewCommonUser {
  firstName?: string;
lastName?: string;
username?: string;
email?: string;
}

export const createEmptyNewCommonUser = (): NewCommonUser => ({
    firstName : undefined,lastName : undefined,username : undefined,email : undefined
});
