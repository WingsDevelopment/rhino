import { DTOSchema, Property } from "../models/DTOSchema";

export interface DTOSchemaDTO {
  type: string;
  properties: {
    [key: string]: Property;
  };
}

export const DTOSchemaDTOExtension = (
  dto: DTOSchemaDTO,
  name: string
): DTOSchema => {
  return {
    name,
    type: dto.type,
    properties: dto.properties,
  };
};
