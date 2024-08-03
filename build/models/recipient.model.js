"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipient = void 0;
const mongoose_1 = require("mongoose");
const recipientSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
    email: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
}, {
    timestamps: true,
    versionKey: false
});
recipientSchema.index({ email: 1, password: 1 });
exports.Recipient = (0, mongoose_1.model)('Recipient', recipientSchema);
//# sourceMappingURL=recipient.model.js.map