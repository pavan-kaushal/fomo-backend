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
exports.EventController = void 0;
const core_1 = require("@overnightjs/core");
const response_middleware_1 = __importDefault(require("../utils/response.middleware"));
const mongoose_1 = require("mongoose");
const helper_functions_1 = require("../utils/helper-functions");
const event_service_1 = require("../services/event.service");
let EventController = class EventController {
    updateEventDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, _id, emailIdentity, description } = req.body;
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                if (!name || !_id || !emailIdentity || !description || !(userData === null || userData === void 0 ? void 0 : userData._id)) {
                    throw Error("Invalid Request");
                }
                _id = new mongoose_1.Types.ObjectId(_id);
                yield (0, event_service_1.updateEventDetails)(_id, new mongoose_1.Types.ObjectId(userData === null || userData === void 0 ? void 0 : userData._id), name, new mongoose_1.Types.ObjectId(emailIdentity), description);
                (0, response_middleware_1.default)(res, true, 'Event Updated Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    updateEventRecipients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { event, users } = req.body;
                if (!event || !users) {
                    throw Error("Invalid Request");
                }
                event = new mongoose_1.Types.ObjectId(event);
                users = users.map((id) => new mongoose_1.Types.ObjectId(id));
                yield (0, event_service_1.updateEventRecipients)(event, users);
                (0, response_middleware_1.default)(res, true, 'Recipients Updated Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    addEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, emailIdentity, description } = req.body;
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                if (!name || !emailIdentity || !description || !(userData === null || userData === void 0 ? void 0 : userData._id)) {
                    throw Error("Invalid Request");
                }
                yield (0, event_service_1.addEvent)(new mongoose_1.Types.ObjectId(userData === null || userData === void 0 ? void 0 : userData._id), name, new mongoose_1.Types.ObjectId(emailIdentity), description);
                (0, response_middleware_1.default)(res, true, 'Event Added Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (!id) {
                    throw Error("Invalid Request");
                }
                yield (0, event_service_1.deleteEvent)(new mongoose_1.Types.ObjectId(id));
                (0, response_middleware_1.default)(res, true, 'Event Deleted Successfully', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    getUserEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = (0, helper_functions_1.decodeTokenFromHeaders)(req.headers.authorization);
                if (!(userData === null || userData === void 0 ? void 0 : userData._id)) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, event_service_1.getEventsOfUser)(new mongoose_1.Types.ObjectId(userData._id));
                (0, response_middleware_1.default)(res, true, '', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    getEventDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (!id) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, event_service_1.getEventDetails)(new mongoose_1.Types.ObjectId(id));
                (0, response_middleware_1.default)(res, true, '', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    getEventTemplate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (!id) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, event_service_1.eventTemplate)(new mongoose_1.Types.ObjectId(id));
                (0, response_middleware_1.default)(res, true, '', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    updateEventTemplate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let { subject, body } = req.body;
                if (!id || !(subject || body)) {
                    throw Error("Invalid Request");
                }
                const data = yield (0, event_service_1.updateEventTemplate)(new mongoose_1.Types.ObjectId(id), subject, body);
                (0, response_middleware_1.default)(res, true, 'Event Tempate Updated Successfully', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
};
exports.EventController = EventController;
__decorate([
    (0, core_1.Post)('')
], EventController.prototype, "updateEventDetails", null);
__decorate([
    (0, core_1.Post)('recipients')
], EventController.prototype, "updateEventRecipients", null);
__decorate([
    (0, core_1.Put)('')
], EventController.prototype, "addEvent", null);
__decorate([
    (0, core_1.Delete)(':id')
], EventController.prototype, "deleteEvent", null);
__decorate([
    (0, core_1.Get)('')
], EventController.prototype, "getUserEvents", null);
__decorate([
    (0, core_1.Get)('details/:id')
], EventController.prototype, "getEventDetails", null);
__decorate([
    (0, core_1.Get)('template/:id')
], EventController.prototype, "getEventTemplate", null);
__decorate([
    (0, core_1.Post)('template/:id')
], EventController.prototype, "updateEventTemplate", null);
exports.EventController = EventController = __decorate([
    (0, core_1.Controller)('event')
], EventController);
//# sourceMappingURL=event.controller.js.map