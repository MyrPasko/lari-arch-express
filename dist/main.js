"use strict";
// import { App } from "./app";
// import { LoggerService } from "./logger/logger.service";
// import { UsersController } from "./users/users.controller";
// import { ExceptionFilter } from "./errors/exception.filter";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const logger_service_1 = require("./logger/logger.service");
const exception_filter_1 = require("./errors/exception.filter");
const users_controller_1 = require("./users/users.controller");
const app_1 = require("./app");
const users_service_1 = require("./users/users.service");
const config_service_1 = __importDefault(require("./config/config.service"));
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
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.Application).to(app_1.App);
    bind(types_1.TYPES.LoggerInterface).to(logger_service_1.LoggerService).inSingletonScope();
    // It is not necessary to create an interface for everything. If we sure we have only one realisaton
    // of service, we can use it instead of an interface for binding.
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilter);
    bind(types_1.TYPES.UsersController).to(users_controller_1.UsersController);
    // Common way of binding is SCOPED - one request = one service
    // bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService);
    // As singleton many requests = one service
    bind(types_1.TYPES.UsersService).to(users_service_1.UsersService).inSingletonScope();
    // As transient one request = many services
    // bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService).inTransientScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.default);
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { app, appContainer };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
//# sourceMappingURL=main.js.map