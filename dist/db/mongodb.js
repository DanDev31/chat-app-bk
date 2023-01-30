"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBUrl = process.env.MONGO_URI;
mongoose_1.default.set('strictQuery', false);
const mongoDB = () => mongoose_1.default.connect(mongoDBUrl);
exports.mongoDB = mongoDB;
