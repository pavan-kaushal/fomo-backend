"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailIdentity = void 0;
const mongoose_1 = require("mongoose");
const emailIdentitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    email: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
    isVerified: { type: mongoose_1.Schema.Types.Boolean, required: true, default: false },
}, {
    timestamps: true,
    versionKey: false
});
emailIdentitySchema.index({ email: 1 }, { unique: true });
emailIdentitySchema.index({ user: 1 });
exports.EmailIdentity = (0, mongoose_1.model)('EmailIdentity', emailIdentitySchema);
//# sourceMappingURL=email-identity.model.js.map