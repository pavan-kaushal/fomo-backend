"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
    emailIdentity: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'EmailIdentity' },
    description: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
    recipients: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Recipient' }],
    apiKey: { type: mongoose_1.Schema.Types.String, trim: true },
    subject: { type: mongoose_1.Schema.Types.String, trim: true },
    body: { type: mongoose_1.Schema.Types.String, trim: true },
}, {
    timestamps: true,
    versionKey: false
});
eventSchema.index({ user: 1 });
eventSchema.index({ user: 1, recipients: 1 });
exports.Event = (0, mongoose_1.model)('Event', eventSchema);
//# sourceMappingURL=event.model.js.map