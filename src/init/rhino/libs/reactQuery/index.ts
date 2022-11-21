import { GlobalDIContext } from "../../context/GlobalDIContext";
import { getServerErrorMessage } from "../../utils/errorUtils";

export const staticDataDefaultRQConfig = {
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  staleTime: Infinity,
};

export const defaultRQConfig = {
  retry: false,
};

export const useDefaultRQConfig = (callerName: string) => {
  const { LogError } = GlobalDIContext.LoggingService;
  const { EnqueueMessage } = GlobalDIContext.NotificationService;

  return {
    ...defaultRQConfig,
    onError: (error: unknown) => {
      EnqueueMessage(getServerErrorMessage(error), "error");
      LogError(error, "Error while calling api", callerName);
    },
  };
};
