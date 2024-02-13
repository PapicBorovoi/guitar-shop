import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(..._parameters: string[]): void {
    console.info(`
    Программа для подготовки данных для REST API сервера.

    Пример: main.cli.js --<command> [--arguments]

    Команды:

    --help:                                                     # печатает этот текст
    --generate <n>:              # генерирует произвольное количество тестовых данных
    `);
  }
}
