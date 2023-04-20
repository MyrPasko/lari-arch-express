"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const users_ts_1 = __importDefault(require("./users/users.ts"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.all('/hello', (req, res, next) => {
    console.log("[FROM ALL]");
    next();
});
app.get('/hello', (req, res) => {
    res.send('Hello!');
    throw new Error('New error');
});
app.use('/users', users_ts_1.default);
app.use((err, req, res, next) => {
    console.log("[Error: ]", err.message);
    res.status(500).send(err.message);
});
const host = '127.0.0.1';
const port = 8000;
app.listen(port, () => {
    console.log(`[Server is on ${host}:${port}.]`);
});
