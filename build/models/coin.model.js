"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const mongoose_1 = require("mongoose");
const coinSchema = new mongoose_1.Schema({
    sourceId: { type: mongoose_1.Schema.Types.String, required: true, unique: true },
    symbol: { type: mongoose_1.Schema.Types.String, required: true, unique: true },
    name: { type: mongoose_1.Schema.Types.String, required: true },
    image: { type: mongoose_1.Schema.Types.String, required: true },
    latestPrice: { type: mongoose_1.Schema.Types.Number, required: true },
});
exports.Coin = (0, mongoose_1.model)('Coin', coinSchema);
//# sourceMappingURL=coin.model.js.map