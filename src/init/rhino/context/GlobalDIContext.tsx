import { ConsoleLoggerService } from "../libs/logging/ConsoleLoggerService";
import { ILoggingService } from "../libs/logging/ILoggingService";
import { INotificationService } from "../libs/notification/NotificationInterface";
import { NotificationService } from "../libs/notification/NotificationService";

interface IGlobalDIContext {
  NotificationService: INotificationService;
  LoggingService: ILoggingService;
}

export const GlobalDIContext: IGlobalDIContext = {
  NotificationService: NotificationService,
  LoggingService: ConsoleLoggerService,
};
