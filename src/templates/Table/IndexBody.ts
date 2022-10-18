import {
  getPropertiesFromSchema,
  DTOSchema,
  isPropertyPrimitive,
} from "../../models/DTOSchema";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import {
  dataToShow,
  isLoading,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  setSortBy,
  tableLabels,
  usePaginableSortedData,
} from "../common";

export const IndexBodyName = (modelName: string) => {
  return `Index${pascalCase(modelName)}Body.tsx`;
};

// prettier-ignore
export const IndexBody = (modelName: string) => {
    return `<Index${pascalCase(modelName)}Body ${pluralCamelCase(modelName)}={${pluralCamelCase(modelName)}} ${isLoading}={${isLoading}} />`;
}

// prettier-ignore
export const GetIndexBodyString = (dto: DTOSchema) => {
    return `
interface Props {
    ${pluralCamelCase(dto.modelName)}: ${pascalCase(dto.modelName)}[];
    ${isLoading}: boolean;
}

export const Index${pascalCase(dto.modelName)}Body: React.FC<Props> = ({ ${pluralCamelCase(dto.modelName)}, ${isLoading} }) => {
    const { ${dataToShow}, ${page}, ${setPage}, ${rowsPerPage}, ${setRowsPerPage}, ${setSortBy} } =
     ${usePaginableSortedData}(${pluralCamelCase(dto.modelName)}); 

     const ${tableLabels} = useMemo(
        () => [
            ${RenderTableLabels(dto)}
        ],
        []
    );

    return (
        <GenericPaginableTable
            subheader="Tabela ${dto.modelName}"
            ${isLoading}={${isLoading}}
            totalCount={${pluralCamelCase(dto.modelName)}.length}
            currentPage={${page}}
            onPageChangeHandler={${setPage}}
            onChangeItemsPerPageHandler={${setRowsPerPage}}
            sortByHandler={${setSortBy}}
            itemsPerPage={${rowsPerPage}}
            tableBodyComponent={
                <${pascalCase(dto.modelName)}TableBody ${pluralCamelCase(dto.modelName)}={${dataToShow} as ${pascalCase(dto.modelName)}[] | undefined} ${isLoading}={${isLoading}} />
            }
            tableLabels={${tableLabels}}
        />
    )
}

export default Index${pascalCase(dto.modelName)}Body;`
}

export const RenderTableLabels = (model: DTOSchema) => {
  return getPropertiesFromSchema(model)
    .filter((x) => isPropertyPrimitive(x))
    .map((p) => {
      return `{ id: '${p.name}', label: '${p.name}', sortable: true },`;
    })
    .join("\n");
};
