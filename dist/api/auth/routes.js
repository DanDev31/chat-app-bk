"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.post("/register", controller_1.default.register);
router.post("/login", controller_1.default.login);
router.post("/refresh-jwt", controller_1.default.verifyRefreshToken);
exports.default = router;