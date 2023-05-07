"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const inversify_1 = require("inversify");
require("reflect-metadata");
const user_signup_dto_1 = require("./dto/user-signup.dto");
const http_error_class_1 = require("../errors/http-error.class");
const validate_middleware_1 = require("../common/validate.middleware");
let UsersController = class UsersController extends base_controller_1.BaseController {
    constructor(logger, userService) {
        super(logger);
        this.logger = logger;
        this.userService = userService;
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.loginHandler,
            },
            {
                path: '/signup',
                method: 'post',
                func: this.signupHandler,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_signup_dto_1.UserSignupDto)],
            },
        ]);
    }
    loginHandler(req, res, next) {
        console.log('[Req body: ]', req.body);
        this.ok(res, 'login');
    }
    signupHandler({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.createUser(body);
            if (!result) {
                return next(new http_error_class_1.HTTPError(422, 'User already exists'));
            }
            yield this.ok(res, result);
        });
    }
};
UsersController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerInterface)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UsersService)),
    __metadata("design:paramtypes", [Object, Object])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map