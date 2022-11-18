import { DTOSchema, Property } from "../models/DTOSchema";

export interface DTOSchemaDTO {
  type: string;
  properties: {
    [key: string]: Property;
  };
}
