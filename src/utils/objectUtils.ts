import { DTOSchema, Property } from "../models/DTOSchema";

export const getNumberOfKeysFromObject = <T extends {}>(model: T): number => {
  return Object.keys(model).length;
};
