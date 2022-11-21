export interface ILoggingService {
  LogError: (error: any, message: string, source: string) => void;
  LogInfo: (message: string, source: string, data: any) => void;
}
