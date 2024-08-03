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
exports.deleteEmailIdentity = exports.addEmailIdentity = exports.getIdentitiesOfUser = void 0;
const email_identity_model_1 = require("../models/email-identity.model");
const user_model_1 = require("../models/user.model");
const getIdentitiesOfUser = (id, shouldBeVerfifed = false) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id).lean();
    const data = yield email_identity_model_1.EmailIdentity.find(Object.assign({ user: id }, (shouldBeVerfifed ? { isVerified: true } : {}))).lean();
    return data.map(doc => {
        return Object.assign(Object.assign({}, doc), { isPrimary: doc._id.toString() == (user === null || user === void 0 ? void 0 : user.emailIdentity.toString()) });
    });
});
exports.getIdentitiesOfUser = getIdentitiesOfUser;
const addEmailIdentity = (userId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmailDoc = yield email_identity_model_1.EmailIdentity.findOne({
        email: email
    }).lean();
    if (existingEmailDoc) {
        if (existingEmailDoc.user.toString() == userId.toString()) {
            throw Error("Email already Added");
        }
        else {
            throw Error("Address is Already Taken");
        }
    }
    yield email_identity_model_1.EmailIdentity.create({
        user: userId,
        email: email,
        isVerified: true
    });
});
exports.addEmailIdentity = addEmailIdentity;
const deleteEmailIdentity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield email_identity_model_1.EmailIdentity.findByIdAndDelete(id);
});
exports.deleteEmailIdentity = deleteEmailIdentity;
//# sourceMappingURL=email-identity.service.js.map