
export interface ActivateUserDto {
  email?: string;
resetPasswordCode?: string;
}

export const activateUserDTOExtension = (model: ActivateUser): ActivateUserDto => ({ ...model })
  
export const activateUserModelExtension = (dto: ActivateUserDto): ActivateUser => ({ ...dto });