export type NotificationType = "success" | "error" | "info" | "warning";

export interface INotificationService {
  EnqueueMessage: (message: string, type: NotificationType) => void;
}
