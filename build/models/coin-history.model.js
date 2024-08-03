"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinHistory = void 0;
const mongoose_1 = require("mongoose");
const coinHistorySchema = new mongoose_1.Schema({
    coin: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    price: { type: mongoose_1.Schema.Types.Number, required: true },
    time: { type: mongoose_1.Schema.Types.Date, required: true }
});
coinHistorySchema.index({ coin: 1 });
exports.CoinHistory = (0, mongoose_1.model)('CoinHistory', coinHistorySchema);
//# sourceMappingURL=coin-history.model.js.map