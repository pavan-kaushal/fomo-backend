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
exports.RecipientController = void 0;
const core_1 = require("@overnightjs/core");
const response_middleware_1 = __importDefault(require("../utils/response.middleware"));
const recipients_service_1 = require("../services/recipients.service");
const mongoose_1 = require("mongoose");
const helper_functions_1 = require("../utils/helper-functions");
let RecipientController = class RecipientController {
    updateRecipient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, name, id } = req.body;
                if (!email || !name || !id) {
                    throw Error("Invalid Request");
                }
                yield (0, recipients_service_1.updateRecipient)(new mongoose_1.Types.ObjectId(id), name, email);
                (0, response_middleware_1.default)(res, true, 'Recipient Updated', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    addRecipient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, email } = req.body;
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                if (!name || !email || !(userData === null || userData === void 0 ? void 0 : userData._id)) {
                    throw Error("Invalid Request");
                }
                yield (0, recipients_service_1.addRecipient)(new mongoose_1.Types.ObjectId(userData === null || userData === void 0 ? void 0 : userData._id), name, email);
                (0, response_middleware_1.default)(res, true, 'Recipient Added', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    deleteRecipient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (!id) {
                    throw Error("Invalid Request");
                }
                yield (0, recipients_service_1.deleteRecipient)(new mongoose_1.Types.ObjectId(id));
                (0, response_middleware_1.default)(res, true, 'Recipient Deleted', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    getRecipients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                if (!(userData === null || userData === void 0 ? void 0 : userData._id)) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, recipients_service_1.getRecipientsOfUser)(new mongoose_1.Types.ObjectId(userData._id));
                (0, response_middleware_1.default)(res, true, '', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
};
exports.RecipientController = RecipientController;
__decorate([
    (0, core_1.Post)('')
], RecipientController.prototype, "updateRecipient", null);
__decorate([
    (0, core_1.Put)('')
], RecipientController.prototype, "addRecipient", null);
__decorate([
    (0, core_1.Delete)(':id')
], RecipientController.prototype, "deleteRecipient", null);
__decorate([
    (0, core_1.Get)('')
], RecipientController.prototype, "getRecipients", null);
exports.RecipientController = RecipientController = __decorate([
    (0, core_1.Controller)('recipient')
], RecipientController);
//# sourceMappingURL=recipient.controller.js.map