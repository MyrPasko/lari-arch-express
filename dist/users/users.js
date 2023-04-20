"use strict";
// WE DONT NEED IT ANYMORE
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.post("/login", (req, res) => {
    console.log("[From login]", req.body);
    res.status(201);
    res.end();
});
userRouter.post("/signup", (req, res) => {
    console.log("[From signup]", req.body);
    res.status(201);
    res.end();
});
exports.default = userRouter;
