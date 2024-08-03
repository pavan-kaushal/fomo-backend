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
exports.AttributeController = void 0;
const core_1 = require("@overnightjs/core");
const response_middleware_1 = __importDefault(require("../utils/response.middleware"));
const mongoose_1 = require("mongoose");
const attributes_service_1 = require("../services/attributes.service");
let AttributeController = class AttributeController {
    updateAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, id, description } = req.body;
                if (!name || !id || !description) {
                    throw Error("Invalid Request");
                }
                id = new mongoose_1.Types.ObjectId(id);
                yield (0, attributes_service_1.updateAttribute)(new mongoose_1.Types.ObjectId(id), name, description);
                (0, response_middleware_1.default)(res, true, 'Attribute Updated Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    addAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, eventId, description } = req.body;
                if (!name || !eventId || !description) {
                    throw Error("Invalid Request");
                }
                yield (0, attributes_service_1.addAttribute)(new mongoose_1.Types.ObjectId(eventId), name, description);
                (0, response_middleware_1.default)(res, true, 'Attribute Added Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    deleteAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (!id) {
                    throw Error("Invalid Request");
                }
                yield (0, attributes_service_1.deleteAttribute)(new mongoose_1.Types.ObjectId(id));
                (0, response_middleware_1.default)(res, true, 'Attribute Deleted Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    getEventAttributeData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.query;
                if (!eventId) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, attributes_service_1.getEventAttributeData)(new mongoose_1.Types.ObjectId(eventId));
                (0, response_middleware_1.default)(res, true, '', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
};
exports.AttributeController = AttributeController;
__decorate([
    (0, core_1.Post)('')
], AttributeController.prototype, "updateAttribute", null);
__decorate([
    (0, core_1.Put)('')
], AttributeController.prototype, "addAttribute", null);
__decorate([
    (0, core_1.Delete)(':id')
], AttributeController.prototype, "deleteAttribute", null);
__decorate([
    (0, core_1.Get)('')
], AttributeController.prototype, "getEventAttributeData", null);
exports.AttributeController = AttributeController = __decorate([
    (0, core_1.Controller)('attribute')
], AttributeController);
//# sourceMappingURL=attributes.controller.js.map