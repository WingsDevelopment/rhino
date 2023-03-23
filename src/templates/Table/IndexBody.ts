import { IInvokableTemplate } from "../../interfaces/ITemplate";
import {
  DTOSchema,
  getPropertiesFromSchema,
  isPropertyPrimitive,
} from "../../models/DTOSchema";
import { rsc } from "../../rhinoStringConfig";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import { RQIndexPage } from "./IndexPage";
import { TableBody } from "./TableBody";

const IndexBodyName = (modelName: string) => {
  return `Index${pascalCase(modelName)}Body`;
};

// prettier-ignore
const IndexBody = (modelName: string) => {
    return `<Index${pascalCase(modelName)}Body ${pluralCamelCase(modelName)}={${pluralCamelCase(modelName)}} ${rsc.isLoading}={${rsc.isLoading}} />`;
}

// prettier-ignore
const GetIndexBodyString = (featureName: string, dto: DTOSchema) => {
    return `
interface Props {
    ${pluralCamelCase(dto.modelName)}: ${pascalCase(dto.modelName)}[] | undefined;
    ${rsc.isLoading}: boolean;
}

export const ${IndexBodyName(dto.modelName)}: React.FC<Props> = ({ ${pluralCamelCase(dto.modelName)}, ${rsc.isLoading} }) => {
    const { ${rsc.dataToShow}, ${rsc.page}, ${rsc.setPage}, ${rsc.rowsPerPage}, ${rsc.setRowsPerPage}, ${rsc.setSortBy} } =
     ${rsc.usePaginableSortedData}(${pluralCamelCase(dto.modelName)}, '');
     //test 

     const ${rsc.tableLabels} = useMemo(
        () => [
            ${RenderTableLabels(dto)}
            { id: '#', label: '#' },
        ],
        []
    );

    return (
        <${rsc.GenericPaginableTable}
            subheader="Tabela ${dto.modelName}"
            ${rsc.isLoading}={${rsc.isLoading}}
            totalCount={${pluralCamelCase(dto.modelName)}?.length}
            currentPage={${rsc.page}}
            onPageChangeHandler={${rsc.setPage}}
            onChangeItemsPerPageHandler={${rsc.setRowsPerPage}}
            sortByHandler={${rsc.setSortBy}}
            itemsPerPage={${rsc.rowsPerPage}}
            tableBodyComponent={
                ${TableBody(dto.modelName, rsc.dataToShow)}
            }
            tableLabels={${rsc.tableLabels}}
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
  extension: rsc.reactComponentExtension,
};
