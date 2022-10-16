import { DTOSchema, Property } from "../schema/ShemaModel";

export const getNumberOfKeysFromObject = <T extends {}>(model: T): number => {
  return Object.keys(model).length;
};
