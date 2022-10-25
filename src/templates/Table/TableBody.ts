import { IInvokableTemplate } from "../../interfaces/ITemplate";
import {
  DTOSchema,
  getPropertiesFromSchema,
  isPropertyPrimitive,
} from "../../models/DTOSchema";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import { isLoading, reactComponentExtension } from "../../stringConfig";
import { RQIndexPage } from "./IndexPage";

export const TableBodyName = (modelName: string) => {
  return `${pascalCase(modelName)}TableBody`;
};

// prettier-ignore
const TableBody = (
    modelName: string,
) => {
    return `<${TableBodyName(modelName)} ${pluralCamelCase(modelName)}={${pluralCamelCase(modelName)}} ${isLoading}={${isLoading}} />`;
}

// prettier-ignore
const GetTableBodyString = (
    featureName: string,
    dto: DTOSchema,
) => {
    return `
interface Props {
    ${pluralCamelCase(dto.modelName)}: ${pascalCase(dto.modelName)}[] | undefined;
    ${isLoading}: boolean;
}

export const ${pascalCase(dto.modelName)}TableBody: React.FC<Props> = ({ ${pluralCamelCase(dto.modelName)}, ${isLoading} }) => {
    const navigate = useNavigate();

    const rows = () => (
        <>
            {${pluralCamelCase(dto.modelName)}?.map((item, index) => (
                <TableRow key={index}>
                    ${RenderTableBody(dto)}
                    <TableCell align="right">
                        <TableButtonWithDetailsIcon
                            label="Detalji"
                            onClick={() => navigate(${pascalCase(dto.modelName)}Routes.details + '/' + item.id)}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
    if (!${pluralCamelCase(dto.modelName)}) {
        return <GenericTableBody rows={<></>} hasData={false} isLoading={${isLoading}} />;
    }
    return (
        <GenericTableBody
            rows={rows()}
            hasData={${pluralCamelCase(dto.modelName)} !== undefined && ${pluralCamelCase(dto.modelName)}.length > 0}
            isLoading={${isLoading}}
        />
    );
};

export default ${pascalCase(dto.modelName)}TableBody;`;
}

const RenderTableBody = (model: DTOSchema) => {
  return getPropertiesFromSchema(model)
    .filter((x) => isPropertyPrimitive(x))
    .map((p) => {
      return `<TableCell>{item.${p.name}}</TableCell>`;
    })
    .join("\n");
};

const GetTableBodyRoute = (featureName: string, baseRoute: string) => {
  const basePath = RQIndexPage.getRoute(featureName, baseRoute);
  return `${basePath}/components`;
};

export const RQTableBody: IInvokableTemplate = {
  getName: TableBodyName,
  getBody: GetTableBodyString,
  getRoute: GetTableBodyRoute,
  invoke: TableBody,
  extension: reactComponentExtension,
};