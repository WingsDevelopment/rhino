
    import { lazy } from "react";
    import { RouteObject } from "react-router-dom";

    const CreateTagPage = lazy(() => import("..//pages/Create/CreateTagPage"));
const UpdateTagPage = lazy(() => import("..//pages/Update/UpdateTagPage"));
const TagIndexPage = lazy(() => import("..//pages/Index/TagIndexPage"));
const DetailsTagPage = lazy(() => import("..//pages/Details/DetailsTagPage"));

    const TagRoot = `/Tag`;
    export const TagRoutes = {
        root: TagRoot,
        create: `${TagRoot}/create`,
update: `${TagRoot}/update`,
index: `${TagRoot}/index`,
details: `${TagRoot}/details`,
    };

    export const TagRouteObject: RouteObject = {
        path: TagRoutes.root,
        children: [
            { path: TagRoutes.create, element: <CreateTagPage /> },
{ path: TagRoutes.update+ "/:id", element: <UpdateTagPage /> },
{ path: TagRoutes.index, element: <TagIndexPage /> },
{ path: TagRoutes.details+ "/:id", element: <DetailsTagPage /> },
        ],
    };
    