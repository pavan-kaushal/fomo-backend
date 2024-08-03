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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipientsOfUser = exports.deleteRecipient = exports.updateRecipient = exports.addRecipient = void 0;
const recipient_model_1 = require("../models/recipient.model");
const validateEmail = (email) => {
    const isValid = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$").test(email);
    if (!isValid) {
        throw Error("Invalid Email");
    }
};
const addRecipient = (user, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    email = email.trim();
    validateEmail(email);
    const existingRecipientDoc = yield recipient_model_1.Recipient.findOne({
        user: user,
        email: email
    });
    if (existingRecipientDoc) {
        throw Error(`User with ${email} exists`);
    }
    yield recipient_model_1.Recipient.create({
        user: user,
        name: name,
        email: email
    });
});
exports.addRecipient = addRecipient;
const updateRecipient = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const recipientDoc = yield recipient_model_1.Recipient.findById(id).lean();
    email = email.trim();
    validateEmail(email);
    if ((recipientDoc === null || recipientDoc === void 0 ? void 0 : recipientDoc.email) != email) {
        const existingRecipientDoc = yield recipient_model_1.Recipient.find({
            user: recipientDoc === null || recipientDoc === void 0 ? void 0 : recipientDoc.user,
            email: email,
            _id: { $ne: id }
        });
        if (existingRecipientDoc) {
            throw Error(`User with ${email} exists`);
        }
    }
    yield recipient_model_1.Recipient.findByIdAndUpdate(id, {
        $set: { name, email }
    });
});
exports.updateRecipient = updateRecipient;
const deleteRecipient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield recipient_model_1.Recipient.findByIdAndDelete(id);
});
exports.deleteRecipient = deleteRecipient;
const getRecipientsOfUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield recipient_model_1.Recipient.find({ user }).sort({ _id: 1 }).lean();
});
exports.getRecipientsOfUser = getRecipientsOfUser;
//# sourceMappingURL=recipients.service.js.map