"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
const mongoose_1 = require("mongoose");
const attributeSchema = new mongoose_1.Schema({
    event: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Event' },
    name: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
    description: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
}, {
    timestamps: true,
    versionKey: false
});
attributeSchema.index({ event: 1 });
exports.Attribute = (0, mongoose_1.model)('Attribute', attributeSchema);
//# sourceMappingURL=attribute.model.js.map