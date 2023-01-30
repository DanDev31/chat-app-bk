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
const model_1 = __importDefault(require("./model"));
const model_2 = __importDefault(require("../contacts/model"));
exports.default = {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield model_1.default.findOne({ email });
                if (!user)
                    return res.status(400).json({ message: 'User not found.' });
                res.status(200).json({ user });
            }
            catch (error) {
                next(error);
            }
        });
    },
    addContactToUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, contactId } = req.body;
                const userInfo = yield model_1.default.findById(contactId);
                if (!userInfo)
                    return res.status(500).json({ message: 'Internal server error.' });
                const userContacts = yield model_1.default.findById(userId).populate('contacts');
                if (userContacts) {
                    let contacts = userContacts.contacts;
                    const foundContact = contacts.find(contact => contact._id.toString() === contactId);
                    if (foundContact)
                        return res.status(200).json({ message: 'This person is already in your contact list.' });
                }
                ;
                const newContact = new model_2.default({
                    _id: contactId,
                    userId,
                    name: userInfo.name,
                    email: userInfo.email
                });
                yield newContact.save();
                yield model_1.default.findByIdAndUpdate(userId, {
                    $push: { contacts: newContact }
                }, { new: true });
                res.status(200).json({ message: 'Contact added successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getUserContacts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                if (!userId)
                    return res.status(401).json({ message: 'User id is required.' });
                const userContacts = yield model_1.default.findById(userId).populate('contacts', 'name email');
                if (userContacts && userContacts.contacts.length === 0)
                    return res.status(200).json({ message: 'You have no contacts yet. Add some!.' });
                res.status(200).json({ contacts: userContacts === null || userContacts === void 0 ? void 0 : userContacts.contacts });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
