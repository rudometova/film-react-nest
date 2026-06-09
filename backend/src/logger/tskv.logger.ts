import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const entries: Record<string, string> = {
      level,
      message: String(message),
      timestamp: new Date().toISOString(),
    };

    if (optionalParams.length) {
      entries.context = JSON.stringify(optionalParams);
    }

    return Object.entries(entries)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}