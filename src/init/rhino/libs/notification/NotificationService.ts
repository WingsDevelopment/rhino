import {
  INotificationService,
  NotificationType,
} from "./NotificationInterface";

export const NotificationService: INotificationService = {
  EnqueueMessage: (message: string, type: NotificationType) => {
    console.log(message);
    console.log(type);
  },
};
