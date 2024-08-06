export abstract class Logger {
  abstract logError(message: string): void;
}

export class ConsoleLogger extends Logger {
  logError(message: string): void {
    console.log(message);
  }
}
