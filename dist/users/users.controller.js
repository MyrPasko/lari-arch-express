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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const inversify_1 = require("inversify");
require("reflect-metadata");
let UsersController = class UsersController extends base_controller_1.BaseController {
    constructor(logger) {
        super(logger);
        this.logger = logger;
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.loginHandler,
            },
            { path: '/signup', method: 'post', func: this.signupHandler },
        ]);
    }
    loginHandler(req, res, next) {
        console.log('[Req body: ]', req.body);
        this.ok(res, 'login');
    }
    signupHandler(req, res, next) {
        console.log('[Req body: ]', req.body);
        this.ok(res, 'signup');
        // next(new HTTPError(401, "unauthorized", "login"));
    }
};
UsersController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerInterface)),
    __metadata("design:paramtypes", [Object])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map