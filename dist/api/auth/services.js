"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../user/model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
exports.default = {
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.default.findOne({
                email
            });
        });
    },
    createTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign(user, config_1.default.server.jwt, {
                expiresIn: config_1.default.server.accessTokenExpiration
            });
            const refreshToken = jsonwebtoken_1.default.sign(user, config_1.default.server.jwt, {
                expiresIn: config_1.default.server.refreshTokenExpirtaion
            });
            return { accessToken };
        });
    }
};