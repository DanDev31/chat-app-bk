"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    server: {
        port: process.env.PORT,
        jwt: process.env.JWT_SECRET,
        accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
        refreshTokenExpirtaion: process.env.REFRESH_TOKEN_EXPIRATION
    }
};
