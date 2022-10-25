import { GetTemplatesDataByTemplates } from ".";
import { INesto } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { RQUpdateHook } from "../../templates/Hooks/useUpdate";
import { RQUpdateForm } from "../../templates/Update/UpdateForm";
import { RQUpdatePage } from "../../templates/Update/UpdatePage";

export const CreateUpdateFeatureData = (
  featureName: string,
  basePath: string,
  updateDTO: DTOSchema
): INesto[] => {
  const result = GetTemplatesDataByTemplates(featureName, basePath, updateDTO, [
    RQUpdatePage,
    RQUpdateForm,
    RQUpdateHook,
  ]);

  return [...result];
};
