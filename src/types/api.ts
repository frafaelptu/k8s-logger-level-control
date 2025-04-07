
export type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LogLevelChangeRequest {
  namespace: string;
  deployment: string;
  labelSelector?: string;
  packageName: string;
  logLevel: LogLevel;
}

export interface PodStatus {
  name: string;
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
}

export interface LogLevelChangeResponse {
  packageName: string;
  previousLevel: LogLevel | null;
  newLevel: LogLevel;
  successCount: number;
  failureCount: number;
  failedPods: PodStatus[];
}

export interface ChangedPackage {
  packageName: string;
  currentLevel: LogLevel;
  defaultLevel: LogLevel;
  timestamp: string;
}

export interface ChangedPackagesResponse {
  packages: ChangedPackage[];
}
