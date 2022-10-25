import { IInvokableTemplate } from "../../interfaces/ITemplate";
import {
  DTOSchema,
  getPropertiesFromSchema,
  isPropertyPrimitive,
} from "../../models/DTOSchema";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import {
  dataToShow,
  isLoading,
  page,
  reactComponentExtension,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  setSortBy,
  tableLabels,
  usePaginableSortedData,
} from "../../stringConfig";
import { RQUpdatePage } from "../Update/UpdatePage";
import { RQIndexPage } from "./IndexPage";
import { RQTableBody } from "./TableBody";

const IndexBodyName = (modelName: string) => {
  return `Index${pascalCase(modelName)}Body`;
};

// prettier-ignore
const IndexBody = (modelName: string) => {
    return `<Index${pascalCase(modelName)}Body ${pluralCamelCase(modelName)}={${pluralCamelCase(modelName)}} ${isLoading}={${isLoading}} />`;
}

// prettier-ignore
const GetIndexBodyString = (featureName: string, dto: DTOSchema) => {
    return `
interface Props {
    ${pluralCamelCase(dto.modelName)}: ${pascalCase(dto.modelName)}[] | undefined;
    ${isLoading}: boolean;
}

export const ${IndexBodyName(dto.modelName)}: React.FC<Props> = ({ ${pluralCamelCase(dto.modelName)}, ${isLoading} }) => {
    const { ${dataToShow}, ${page}, ${setPage}, ${rowsPerPage}, ${setRowsPerPage}, ${setSortBy} } =
     ${usePaginableSortedData}(${pluralCamelCase(dto.modelName)}, ''); 

     const ${tableLabels} = useMemo(
        () => [
            ${RenderTableLabels(dto)}
            { id: '#', label: '#' },
        ],
        []
    );

    return (
        <GenericPaginableTable
            subheader="Tabela ${dto.modelName}"
            ${isLoading}={${isLoading}}
            totalCount={${pluralCamelCase(dto.modelName)}?.length}
            currentPage={${page}}
            onPageChangeHandler={${setPage}}
            onChangeItemsPerPageHandler={${setRowsPerPage}}
            sortByHandler={${setSortBy}}
            itemsPerPage={${rowsPerPage}}
            tableBodyComponent={
                <${RQTableBody.invoke(featureName, dto.modelName)}/>
            }
            tableLabels={${tableLabels}}
        />
    )
}

export default ${IndexBodyName(dto.modelName)};`
}

export const RenderTableLabels = (model: DTOSchema) => {
  return getPropertiesFromSchema(model)
    .filter((x) => isPropertyPrimitive(x))
    .map((p) => {
      return `{ id: '${p.name}', label: '${p.name}', sortable: true },`;
    })
    .join("\n");
};

const GetIndexBodyRoute = (featureName: string, baseRoute: string) => {
  const basePath = RQIndexPage.getRoute(featureName, baseRoute);
  return `${basePath}/components`;
};

export const RQIndexBody: IInvokableTemplate = {
  getName: IndexBodyName,
  getBody: GetIndexBodyString,
  getRoute: GetIndexBodyRoute,
  invoke: IndexBody,
  extension: reactComponentExtension,
};
