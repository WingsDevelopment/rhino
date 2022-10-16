
export interface Tag {
  type: any;
properties: any;
additionalProperties: any;
}

export const createEmptyTag = (): Tag => ({
    type : undefined,properties : undefined,additionalProperties : undefined
});