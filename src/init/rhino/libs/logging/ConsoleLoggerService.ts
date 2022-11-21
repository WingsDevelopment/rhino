import { IS_DEV_MODE } from "../../config";
import { ILoggingService } from "./ILoggingService";

const LogError = (error: any, message: string, source: string) => {
  if (IS_DEV_MODE) {
    console.log(error);
    console.log(message);
    console.log(source);
  }
};

const LogInfo = (message: string, source: string, data: any) => {
  if (IS_DEV_MODE) {
    console.log(message);
    console.log(source);
    console.log(data);
  }
};

export const ConsoleLoggerService: ILoggingService = {
  LogError,
  LogInfo,
};
