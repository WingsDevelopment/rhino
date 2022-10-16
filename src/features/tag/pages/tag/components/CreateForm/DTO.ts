
export interface TagDTO {
  type: any;
properties: any;
additionalProperties: any;
}

export const tagDtoExtension = (model: TagDTO): Tag => ({ ...model })
  
export const tagExtension = (dto: Tag): TagDTO => ({ ...dto });