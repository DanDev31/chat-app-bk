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
const helpers_1 = require("./helpers");
const model_1 = __importDefault(require("../user/model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = __importDefault(require("./services"));
const config_1 = __importDefault(require("../../config"));
exports.default = {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const hashedPassword = yield (0, helpers_1.hashPassword)(password);
                const userFound = yield services_1.default.findUser(email);
                if (userFound) {
                    res.status(400).json({
                        message: "A user is already registered with this email."
                    });
                }
                else {
                    const newUser = new model_1.default({
                        name,
                        email,
                        password: hashedPassword
                    });
                    const user = yield newUser.save();
                    res.status(200).json(user);
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield services_1.default.findUser(email);
                if (!user) {
                    return res.status(400).json({ message: "User not found." });
                }
                const isValidPassword = (0, helpers_1.ValidatePassword)(password, user === null || user === void 0 ? void 0 : user.password);
                !isValidPassword && res.status(400).json({ message: "Wrong password!" });
                const userContacts = yield model_1.default.findById(user._id).populate('contacts', 'name email');
                const userInfo = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    contacts: (userContacts === null || userContacts === void 0 ? void 0 : userContacts.contacts) || []
                };
                const { accessToken } = yield services_1.default.createTokens(userInfo);
                res.cookie("access_token", accessToken, {
                    httpOnly: true,
                    secure: true
                });
                res.status(200).json({ userInfo, accessToken });
            }
            catch (error) {
                next(error);
            }
        });
    },
    verifyRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            jsonwebtoken_1.default.verify(refreshToken, config_1.default.server.jwt, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Invalid refresh token" });
                }
                const newAccessToken = jsonwebtoken_1.default.sign({ userId: decoded._id }, 'mysecret', {
                    expiresIn: "1h"
                });
                res.status(200).json({
                    accessToken: newAccessToken
                });
            });
        });
    }
};
