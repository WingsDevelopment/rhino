
export interface NewCommonUserDto {
  firstName?: string;
lastName?: string;
username?: string;
email?: string;
}

export const newCommonUserDTOExtension = (model: NewCommonUser): NewCommonUserDto => ({ ...model })
  
export const newCommonUserModelExtension = (dto: NewCommonUserDto): NewCommonUser => ({ ...dto });