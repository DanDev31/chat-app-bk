"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.get('/getUser', controller_1.default.getUser);
router.get('/getUserContacts/:userId', controller_1.default.getUserContacts);
router.post('/addContact', controller_1.default.addContactToUser);
exports.default = router;
