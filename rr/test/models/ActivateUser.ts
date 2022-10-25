
export interface ActivateUser {
  email?: string;
resetPasswordCode?: string;
}

export const createEmptyActivateUser = (): ActivateUser => ({
    email : undefined,resetPasswordCode : undefined
});
