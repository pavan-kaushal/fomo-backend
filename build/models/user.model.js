"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
    emailIdentity: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'EmailIdentity' },
    password: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
}, {
    timestamps: true,
    versionKey: false
});
userSchema.index({ email: 1, password: 1 });
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.model.js.map