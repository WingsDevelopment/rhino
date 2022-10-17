import { DTOSchema } from "./models/DTOSchema";

export let DTOs: { [key: string]: DTOSchema } = {};

export const fillDTOsFromEveryRef = (dtos: DTOSchema[], definitions: any) => {
  let newDtos: DTOSchema[] = [];

  const filteredDtos = dtos.filter(x => x.type === "object");

  const onRefFound = (nameFromRef: string | undefined) => {
    if (!nameFromRef || DTOs[nameFromRef]) return;
    const newDTO: DTOSchema = {
      name: nameFromRef,
      ...(definitions as any)[nameFromRef],
    };
    newDtos.push(newDTO);
    DTOs[nameFromRef] = newDTO;
  };

  filteredDtos.forEach(dto => {
    Object.keys(dto.properties).forEach(key => {
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
    fillDTOsFromEveryRef(newDtos, definitions);
  }
};
