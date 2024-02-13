#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApp } from './cli/cli-app';
import { HelpCommand } from './cli/commands/help.command';
import { GenerateCommand } from './cli/commands/generate.command';

const bootstrap = () => {
  const cliApp = new CLIApp();
  cliApp.registerCommands([new HelpCommand(), new GenerateCommand()]);

  cliApp.processCommand(process.argv);
};

bootstrap();
