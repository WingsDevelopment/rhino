import { DTOSchema } from "../models/DTOSchema";
import {
  DTONames,
  getDtoName,
  getModelNameFromDtoName,
} from "../utils/consoleInputUtils";

export const createDTOsWithDependencies = (
  definitions: any,
  dtoNames: DTONames
) => {
  let localDTOs = createDTOsFromDTONames(definitions, dtoNames);

  const createDTODependenciesPrivate = (
    dtos: DTOSchema[],
    definitions: any
  ) => {
    let newDtos: DTOSchema[] = [];

    const filteredDtos = dtos.filter((x) => x.type === "object");

    const onRefFound = (nameFromRef: string | undefined) => {
      if (!nameFromRef || localDTOs[nameFromRef]) return;
      const newDTO: DTOSchema = {
        ...(definitions as any)[nameFromRef],
        origName: nameFromRef,
        dtoName: getDtoName(nameFromRef),
        modelName: getModelNameFromDtoName(getDtoName(nameFromRef)),
      };
      newDtos.push(newDTO);
      localDTOs[nameFromRef] = newDTO;
    };

    filteredDtos.forEach((dto) => {
      Object.keys(dto.properties).forEach((key) => {
        const property = dto.properties[key];
        if (property.$ref) {
          const nameFromRef = property.$ref.split("/").pop();
          onRefFound(nameFromRef);
        }
        if (property.type === "array") {
          if (property.items.$ref) {
            const nameFromRef = property.items.$ref.split("/").pop();
            onRefFound(nameFromRef);
          }
        }
      });
    });
    if (newDtos.length > 0) {
      createDTODependenciesPrivate(newDtos, definitions);
    }
  };

  createDTODependenciesPrivate(
    Object.keys(localDTOs).map((key) => localDTOs[key]),
    definitions
  );

  return localDTOs;
};

const createDTOsFromDTONames = (definitions: any, dtoNames: DTONames) => {
  let dtos: { [key: string]: DTOSchema } = {};
  Object.keys(dtoNames).forEach((key) => {
    //todo change names
    let fullDtoName = (dtoNames as any)[key];
    const modifiedDtoName = getDtoName(fullDtoName);
    if (fullDtoName) {
      let DTO: DTOSchema = {
        ...(definitions as any)[fullDtoName],
        origName: fullDtoName,
        dtoName: modifiedDtoName,
        modelName: getModelNameFromDtoName(modifiedDtoName),
      };
      if (DTO) {
        if (dtos[fullDtoName]) console.log("DTO already exists");
        else dtos[fullDtoName] = { ...DTO };
      }
    }
  });

  return dtos;
};
