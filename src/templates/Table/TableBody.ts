import {
  getPropertiesFromSchema,
  DTOSchema,
  isPropertyPrimitive,
} from "../../models/DTOSchema";
import { pascalCase, pluralCamelCase } from "../../utils/stringUtils";
import { isLoading } from "../common";

export const TableBodyName = (modelName: string) => {
  return `${pascalCase(modelName)}TableBody.tsx`;
};

// prettier-ignore
export const TableBody = (
    modelName: string,
) => {
    return `<${pascalCase(modelName)}TableBody ${pluralCamelCase(modelName)}={${pluralCamelCase(modelName)}} ${isLoading}={${isLoading}} />`;
}

// prettier-ignore
export const GetTableBodyString = (
    dto: DTOSchema,
) => {
    return `
interface Props {
    ${pluralCamelCase(dto.modelName)}: ${pascalCase(dto.modelName)}[];
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
                    <TableCell align="right">
                        <TableButtonWithDeleteIcon
                            label="Obriši"
                            onClick={() => delete${pascalCase(dto.modelName)}Async(item.id)}
                            isDeleting={isDeleting}
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

export const RenderTableBody = (model: DTOSchema) => {
  return getPropertiesFromSchema(model)
    .filter((x) => isPropertyPrimitive(x))
    .map((p) => {
      return `<TableCell>{item.${p.name}}</TableCell>`;
    })
    .join("\n");
};
