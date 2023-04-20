// import { App } from "./app";
// import { LoggerService } from "./logger/logger.service";
// import { UsersController } from "./users/users.controller";
// import { ExceptionFilter } from "./errors/exception.filter";

import { Container, ContainerModule, interfaces } from 'inversify';
import { LoggerInterface } from './logger/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.service';
import { ExceptionFilter } from './errors/exception.filter';
import { UsersController } from './users/users.controller';
import { App } from './app';
import { ExceptionFilterInterface } from './errors/exceptionFilter.interface';
import UsersControllerInterface from './users/usesController.interface';

// async function bootstrap() {
//   const logger = new LoggerService();
//   const app = new App(
//     logger,
//     new UsersController(logger),
//     new ExceptionFilter(logger)
//   );
//   await app.init();
//
// }
//
// export { app, appContainer };

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerService);
  // It is not necessary to create an interface for everything. If we sure we have only one realisaton
  // of service, we can use it instead of an interface for binding.
  bind<ExceptionFilterInterface>(TYPES.ExceptionFilterInterface).to(ExceptionFilter);
  bind<UsersControllerInterface>(TYPES.UsersControllerInterface).to(UsersController);
});

interface BootstrapInterface {
  app: App;
  appContainer: Container;
}

function bootstrap(): BootstrapInterface {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}
export const { app, appContainer } = bootstrap();
