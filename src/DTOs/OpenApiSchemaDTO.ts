import { DTOSchemaDTO, DTOSchemaDTOExtension } from "./DTOSchemDTO";
import { DTOSchema } from "../models/DTOSchema";

export interface OpenApiSchemaDTO {
  components: {
    schemas: {
      [dto: string]: DTOSchemaDTO;
    };
  };
}

export const getDTOsFromSchema = (schema: OpenApiSchemaDTO): DTOSchema[] => {
  let dtos: DTOSchema[] = [];
  for (let key in schema.components.schemas) {
    dtos.push(DTOSchemaDTOExtension(schema.components.schemas[key], key));
  }
  return dtos;
};
