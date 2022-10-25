import { GetTemplatesDataByTemplates } from ".";
import { INesto } from "../../interfaces/ITemplate";
import { DTOSchema } from "../../models/DTOSchema";
import { RQCreateForm } from "../../templates/Create/CreateForm";
import { RQCreatePage } from "../../templates/Create/CreatePage";
import { RQCreateHook } from "../../templates/Hooks/useCreate";

export const CreateCreateFeatureData = (
  featureName: string,
  basePath: string,
  createDTO: DTOSchema
): INesto[] => {
  const result = GetTemplatesDataByTemplates(featureName, basePath, createDTO, [
    RQCreatePage,
    RQCreateForm,
    RQCreateHook,
  ]);

  return [...result];
};
