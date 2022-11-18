import { DTOSchemaDTO } from "./DTOSchemDTO";
import { DTOSchema } from "../models/DTOSchema";

export interface OpenApiSchemaDTO {
  components: {
    schemas: {
      [dto: string]: DTOSchemaDTO;
    };
  };
}
