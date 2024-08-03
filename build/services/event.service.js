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
exports.getEventDetails = exports.getEventsOfUser = exports.updateEventRecipients = exports.deleteEvent = exports.updateEventTemplate = exports.eventTemplate = exports.updateEventDetails = exports.addEvent = void 0;
const event_model_1 = require("../models/event.model");
const helper_functions_1 = require("../utils/helper-functions");
const attribute_model_1 = require("../models/attribute.model");
const crypto = require('crypto');
const addEvent = (user, name, emailIdentity, description) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEventDoc = yield event_model_1.Event.findOne({
        user: user,
        name: {
            $regex: (0, helper_functions_1.formatRegex)(name)
        }
    });
    if (existingEventDoc) {
        throw Error("Event With Name Exists");
    }
    const randomBytes = crypto.randomBytes(8);
    const randomHexString = randomBytes.toString('hex');
    yield event_model_1.Event.create({
        user: user,
        name: name,
        emailIdentity: emailIdentity,
        description: description,
        apiKey: randomHexString
    });
});
exports.addEvent = addEvent;
const updateEventDetails = (id, user, name, emailIdentity, description) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEventDoc = yield event_model_1.Event.findOne({
        user: user,
        name: {
            $regex: (0, helper_functions_1.formatRegex)(name)
        },
        _id: { $ne: id }
    });
    if (existingEventDoc) {
        throw Error("Event With Name Exists");
    }
    yield event_model_1.Event.findByIdAndUpdate(id, {
        user: user,
        name: name,
        emailIdentity: emailIdentity,
        description: description,
    });
});
exports.updateEventDetails = updateEventDetails;
const eventTemplate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const event = yield event_model_1.Event.findById(id).lean();
    const subject = yield replaceIdsWithAttributes(id, (_a = event === null || event === void 0 ? void 0 : event.subject) !== null && _a !== void 0 ? _a : '');
    const body = yield replaceIdsWithAttributes(id, (_b = event === null || event === void 0 ? void 0 : event.body) !== null && _b !== void 0 ? _b : '');
    return { subject, body };
});
exports.eventTemplate = eventTemplate;
const updateEventTemplate = (id, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    subject = yield replaceAttributesWithIds(id, subject);
    body = yield replaceAttributesWithIds(id, body);
    yield event_model_1.Event.findByIdAndUpdate(id, {
        subject: subject,
        body: body
    });
});
exports.updateEventTemplate = updateEventTemplate;
const replaceIdsWithAttributes = (eventId, template) => __awaiter(void 0, void 0, void 0, function* () {
    const pattern = /{{[a-z0-9]+}}/g;
    const matches = template.match(pattern);
    if (!(matches === null || matches === void 0 ? void 0 : matches.length)) {
        return template;
    }
    const attributes = yield attribute_model_1.Attribute.find({ event: eventId }).lean();
    const attributesMap = {};
    for (let attribute of attributes) {
        attributesMap[attribute._id.toString()] = attribute;
    }
    const matchedIdsInTemplate = matches !== null && matches !== void 0 ? matches : [];
    const output = template.replace(new RegExp(matchedIdsInTemplate.join('|'), 'g'), (match) => `{{${attributesMap[match.slice(2, -2)].name}}}`);
    return output;
});
const replaceAttributesWithIds = (eventId, template) => __awaiter(void 0, void 0, void 0, function* () {
    const pattern = /{{[a-zA-Z0-9_]+}}/g;
    const matches = template.match(pattern);
    if (!(matches === null || matches === void 0 ? void 0 : matches.length)) {
        return template;
    }
    const attributes = yield attribute_model_1.Attribute.find({ event: eventId }).lean();
    const attributesMap = {};
    for (let attribute of attributes) {
        attributesMap[attribute.name] = attribute;
    }
    const attributeNamesOfEvent = new Set(Object.keys(attributesMap));
    const matchedAttributeNamesInTemplate = (matches !== null && matches !== void 0 ? matches : []).map(match => match.slice(2, -2));
    const invalidAttributeNames = matchedAttributeNamesInTemplate.filter(name => !attributeNamesOfEvent.has(name));
    if (invalidAttributeNames === null || invalidAttributeNames === void 0 ? void 0 : invalidAttributeNames.length) {
        throw Error(`Invalid Attributes : ${invalidAttributeNames.join(', ')}`);
    }
    const validAttributeNames = matchedAttributeNamesInTemplate.filter(name => attributeNamesOfEvent.has(name));
    const output = template.replace(new RegExp(validAttributeNames.map(name => `{{${name}}}`).join('|'), 'g'), (match) => `{{${attributesMap[match.slice(2, -2)]._id.toString()}}}`);
    return output;
});
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield event_model_1.Event.findByIdAndDelete(id);
    //event delete conditions
});
exports.deleteEvent = deleteEvent;
const updateEventRecipients = (eventId, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    yield event_model_1.Event.findByIdAndUpdate(eventId, {
        $set: {
            recipients: userIds
        }
    });
});
exports.updateEventRecipients = updateEventRecipients;
const getEventsOfUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield event_model_1.Event.find({ user: userId }).sort({ _id: 1 }).lean();
});
exports.getEventsOfUser = getEventsOfUser;
const getEventDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield event_model_1.Event.findById(id).lean();
});
exports.getEventDetails = getEventDetails;
//# sourceMappingURL=event.service.js.map