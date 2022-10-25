import { GetTemplatesDataByTemplates } from ".";
import { INesto } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { RQDetailsBody } from "../../templates/Details/DetailsBody";
import { RQDetailsPage } from "../../templates/Details/DetailsPage";
import { RQFetchByIdHook } from "../../templates/Hooks/useFetchById";

export const CreateDetailsFeatureData = (
  featureName: string,
  basePath: string,
  detailsDTO: DTOSchema
): INesto[] => {
  const result = GetTemplatesDataByTemplates(
    featureName,
    basePath,
    detailsDTO,
    [RQDetailsPage, RQDetailsBody, RQFetchByIdHook]
  );

  return [...result];
};
