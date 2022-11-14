
export interface NewTagDtoDTO {
  
}

export const newTagDtoDTOExtension = (model: NewTagDto): NewTagDtoDTO => ({ ...model })
  
export const newTagDtoModelExtension = (dto: NewTagDtoDTO): NewTagDto => ({ ...dto });