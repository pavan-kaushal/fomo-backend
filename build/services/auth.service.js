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
exports.userSignup = exports.userSignin = void 0;
const environment_config_1 = __importDefault(require("../environment.config"));
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_identity_model_1 = require("../models/email-identity.model");
const generateToken = (payload) => {
    const authToken = jsonwebtoken_1.default.sign(payload, environment_config_1.default.authJwtSecret, { expiresIn: environment_config_1.default.authJwtExpireTime });
    return authToken;
};
const userSignin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const emailIdentity = yield email_identity_model_1.EmailIdentity.findOne({
        email: email,
    }).populate('user').lean();
    if (!emailIdentity) {
        throw Error("Invalid Credentials");
    }
    if (!emailIdentity.isVerified) {
        throw Error("Email not Verified");
    }
    const user = emailIdentity.user;
    if (!bcrypt_1.default.compareSync(password, user.password)) {
        throw Error("Wrong Password");
    }
    const authToken = generateToken({
        _id: user._id.toString(),
        name: user.name,
        email: emailIdentity.email,
    });
    return { authToken };
});
exports.userSignin = userSignin;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = environment_config_1.default.saltRounds;
    const salt = yield bcrypt_1.default.genSalt(saltRounds);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    return hashedPassword;
});
const userSignup = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmailDoc = yield email_identity_model_1.EmailIdentity.findOne({
        email: email
    }).lean();
    if (existingEmailDoc) {
        throw Error(`Email Already in use`);
    }
    password = yield hashPassword(password);
    const emailIdentity = yield email_identity_model_1.EmailIdentity.create({
        email: email,
        isVerified: true,
    });
    const user = yield user_model_1.User.create({
        name: name,
        password: password,
        emailIdentity: emailIdentity._id
    });
    yield email_identity_model_1.EmailIdentity.findByIdAndUpdate(emailIdentity._id, {
        $set: {
            user: user._id
        }
    });
});
exports.userSignup = userSignup;
//# sourceMappingURL=auth.service.js.map