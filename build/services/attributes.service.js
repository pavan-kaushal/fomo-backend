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
exports.getEventAttributeData = exports.deleteAttribute = exports.updateAttribute = exports.addAttribute = void 0;
const attribute_model_1 = require("../models/attribute.model");
const event_model_1 = require("../models/event.model");
const addAttribute = (eventId, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDoc = yield attribute_model_1.Attribute.findOne({
        event: eventId,
        name: {
            $regex: new RegExp(name.trim(), 'i')
        }
    }).lean();
    if (existingDoc) {
        throw Error(`Attribute with name ${existingDoc.name} exists`);
    }
    yield attribute_model_1.Attribute.create({
        event: eventId,
        name: name,
        description: description
    });
});
exports.addAttribute = addAttribute;
const updateAttribute = (id, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDoc = yield attribute_model_1.Attribute.findOne({
        name: {
            $regex: new RegExp(name.trim(), 'i')
        },
        _id: { $ne: id }
    }).lean();
    if (existingDoc) {
        throw Error(`Attribute with name ${existingDoc.name} exists`);
    }
    yield attribute_model_1.Attribute.findByIdAndUpdate(id, {
        name: name,
        description: description
    });
});
exports.updateAttribute = updateAttribute;
const deleteAttribute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const attribute = yield attribute_model_1.Attribute.findById(id).lean();
    const event = yield event_model_1.Event.findById(attribute === null || attribute === void 0 ? void 0 : attribute.event).lean();
    const key = `{{${id.toString()}}}`;
    if (((_a = event === null || event === void 0 ? void 0 : event.subject) !== null && _a !== void 0 ? _a : '').includes(key) || ((_b = event === null || event === void 0 ? void 0 : event.body) !== null && _b !== void 0 ? _b : '').includes(key)) {
        throw Error("Attribute is being used in the template");
    }
    //delete user data related to attribute
    yield attribute_model_1.Attribute.findByIdAndDelete(id);
});
exports.deleteAttribute = deleteAttribute;
const getEventAttributeData = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_model_1.Event.findById(eventId).lean();
    const attributes = yield attribute_model_1.Attribute.find({
        event: eventId
    }).sort({ _id: 1 }).lean();
    return attributes.map(doc => {
        var _a, _b;
        return Object.assign(Object.assign({}, doc), { isInUse: (((_a = event === null || event === void 0 ? void 0 : event.body) === null || _a === void 0 ? void 0 : _a.length) && event.body.includes(`{{${doc._id.toString()}}}`))
                || (((_b = event === null || event === void 0 ? void 0 : event.subject) === null || _b === void 0 ? void 0 : _b.length) && event.subject.includes(`{{${doc._id.toString()}}}`)) });
    });
});
exports.getEventAttributeData = getEventAttributeData;
//# sourceMappingURL=attributes.service.js.map