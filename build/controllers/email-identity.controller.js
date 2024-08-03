"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.EmailIdentityController = void 0;
const core_1 = require("@overnightjs/core");
const response_middleware_1 = __importDefault(require("../utils/response.middleware"));
const helper_functions_1 = require("../utils/helper-functions");
const mongoose_1 = require("mongoose");
const email_identity_service_1 = require("../services/email-identity.service");
let EmailIdentityController = class EmailIdentityController {
    identitiesOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                if (!(userData === null || userData === void 0 ? void 0 : userData._id)) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, email_identity_service_1.getIdentitiesOfUser)(new mongoose_1.Types.ObjectId(userData._id));
                (0, response_middleware_1.default)(res, true, '', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    verifiedIdentitiesOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                if (!(userData === null || userData === void 0 ? void 0 : userData._id)) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, email_identity_service_1.getIdentitiesOfUser)(new mongoose_1.Types.ObjectId(userData._id), true);
                (0, response_middleware_1.default)(res, true, '', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    addEmailIdentity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                const { email } = req.body;
                if (!(userData === null || userData === void 0 ? void 0 : userData._id) || !email) {
                    throw Error("Invalid Request");
                }
                yield (0, email_identity_service_1.addEmailIdentity)(new mongoose_1.Types.ObjectId(userData._id), email);
                (0, response_middleware_1.default)(res, true, 'Email Added Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    deleteEmailIdentity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (!id) {
                    throw Error("Invalid Request");
                }
                yield (0, email_identity_service_1.deleteEmailIdentity)(new mongoose_1.Types.ObjectId(id));
                (0, response_middleware_1.default)(res, true, 'Email Deleted', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
};
exports.EmailIdentityController = EmailIdentityController;
__decorate([
    (0, core_1.Get)('')
], EmailIdentityController.prototype, "identitiesOfUser", null);
__decorate([
    (0, core_1.Get)('verified')
], EmailIdentityController.prototype, "verifiedIdentitiesOfUser", null);
__decorate([
    (0, core_1.Put)('')
], EmailIdentityController.prototype, "addEmailIdentity", null);
__decorate([
    (0, core_1.Delete)(':id')
], EmailIdentityController.prototype, "deleteEmailIdentity", null);
exports.EmailIdentityController = EmailIdentityController = __decorate([
    (0, core_1.Controller)('email-identity')
], EmailIdentityController);
//# sourceMappingURL=email-identity.controller.js.map