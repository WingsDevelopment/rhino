import { GetTemplatesDataByTemplates } from ".";
import { INesto } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { RQFetchAllHook } from "../../templates/Hooks/useFetchAll";
import { RQIndexBody } from "../../templates/Table/IndexBody";
import { RQIndexPage } from "../../templates/Table/IndexPage";
import { RQTableBody } from "../../templates/Table/TableBody";

export const CreateListFeatureData = (
  featureName: string,
  basePath: string,
  listDTO: DTOSchema
): INesto[] => {
  const result = GetTemplatesDataByTemplates(featureName, basePath, listDTO, [
    RQIndexPage,
    RQIndexBody,
    RQTableBody,
    RQFetchAllHook,
  ]);

  return [...result];
};
