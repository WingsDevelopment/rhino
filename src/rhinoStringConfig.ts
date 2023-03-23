export let rsc = {
  handleSubmit: "handleSubmit",
  isLoading: "isLoading",
  isContentLoading: "isContentLoading",
  isSubmitting: "isSubmitting",
  initialData: "initialData",
  result: "result",
  id: "id",
  navigate: "navigate",
  useNavigate: "useNavigate",
  useParams: "useParams",
  useForm: "useForm",
  methods: "methods",
  reset: "reset",
  onSubmit: "onSubmit",
  SubmitHandler: "SubmitHandler",
  Submit: "Submit",
  submitHandler: "submitHandler",
  dataToShow: "dataToShow",
  page: "page",
  setPage: "setPage",
  rowsPerPage: "rowsPerPage",
  setRowsPerPage: "setRowsPerPage",
  setSortBy: "setSortBy",
  usePaginableSortedData: "usePaginableSortedData",
  tableLabels: "tableLabels",
  EnqueueMessage: "EnqueueMessage",
  GlobalDIContext: "GlobalDIContext",
  NotificationService: "NotificationService",
  NotificationAdapterInvoke: "NotificationAdapter()",
  queryClient: "queryClient",
  useQueryClient: "useQueryClient",
  useDefaultRQConfig: "useDefaultRQConfig",
  config: "config",
  enabled: "enabled",
  onSuccess: "onSuccess",
  error: "error",
  mutateAsync: "mutateAsync",
  useMutation: "useMutation",
  useQuery: "useQuery",
  response: "response",
  invalidateQueries: "invalidateQueries",
  errorMessage: "errorMessage",
  contentErrorMessage: "contentErrorMessage",
  getServerErrorMessage: "getServerErrorMessage",
  data: "data",
  detailsRoute: "details",
  updateRoute: "update",
  createRoute: "create",
  indexRoute: "index",
  axios: "axios",
  axiosInstance: "axiosInstance",
  axiosPost: "post",
  axiosGet: "get",
  axiosPut: "put",
  axiosDelete: "delete",
  patch: "patch",
  baseUrl: "baseUrl",
  requestDTO: "requestDTO",
  reactComponentExtension: ".tsx",
  defaultFileExtension: ".ts",

  //
  RRHFTextField: "RRHFTextField",
  RRHFNumberField: "RRHFNumberField",
  RRHFDatePicker: "RRHFDatePicker",
  RHFCheckbox: "RHFCheckbox",
  MyFormProvider: "MyFormProvider",
  button: "button",
  RPage: "RPage",
  RPageContent: "RPageContent",
  RAsyncPage: "RAsyncPage",
  RSingleColumnBox: "RSingleColumnBox",
  RBreadcrumbs: "RBreadcrumbs",
  RContainer: "RContainer",
  RContent: "RContent",
  RAsyncContent: "RAsyncContent",
  Card: "Card",
  breadcrumbAction: "breadcrumbAction",
  breadcrumbsLinks: "breadcrumbsLinks",
  title: "title",
  heading: "heading",
  links: "links",

  DefaultPageWithBreadcrumbs: "DefaultPageWithBreadcrumbs",
  LoadableCardWrapper: "LoadableCardWrapper",
  MyFormProviderWithCardLayout: "DefaultSingleColumnFormCard",
  SingleColumnBox: "SingleColumnBox",
  TwoColumnBox: "DoubleColumnBox",
  RHFTextField: "RHFTextField",
  RHFNumberField: "RHFNumberField",
  DefaultReadOnlyTextField: "DefaultReadOnlyTextField",

  GenericPaginableTable: "GenericPaginableTable",
  AppBasePath: "backoffice",
};

export const overrideRSC = (overrideDict: { [key: string]: string }) => {
  rsc = { ...rsc, ...overrideDict };
};
