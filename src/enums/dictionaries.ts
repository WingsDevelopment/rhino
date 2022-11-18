import { rhinoConfig } from "../cli";
import { rsc } from "../rhinoStringConfig";
import { RQCreatePage } from "../templates/Create/CreatePage";
import { RQDetailsPage } from "../templates/Details/DetailsPage";
import { RQIndexPage } from "../templates/Table/IndexPage";
import { RQUpdatePage } from "../templates/Update/UpdatePage";
import { RhinoCommand } from "./command";

export const CommandRouteDict = {
  [RhinoCommand.create]: rsc.createRoute,
  [RhinoCommand.details]: rsc.detailsRoute,
  [RhinoCommand.list]: rsc.indexRoute,
  [RhinoCommand.update]: rsc.updateRoute,
};

export const CommandPathsDict = {
  [RhinoCommand.create]: rhinoConfig.createPath,
  [RhinoCommand.details]: rhinoConfig.detailsPath,
  [RhinoCommand.list]: rhinoConfig.listPath,
  [RhinoCommand.update]: rhinoConfig.updatePath,
};

export const CommandPageNameDict = {
  [RhinoCommand.create]: RQCreatePage.getName,
  [RhinoCommand.details]: RQDetailsPage.getName,
  [RhinoCommand.list]: RQIndexPage.getName,
  [RhinoCommand.update]: RQUpdatePage.getName,
};
