import { DTOSchema, Property } from "../models/DTOSchema";

export const getNumberOfKeysFromObject = <T extends {}>(model: T): number => {
  return Object.keys(model).length;
};

export const getPropByString = (obj: any, propString: string) => {
  if (!propString) return obj;

  var prop,
    props = propString.split(".");

  for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i];

    var candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }
  return obj[props[i]];
};
