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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinList = exports.fetchCoinDataFromSource = void 0;
const environment_config_1 = __importDefault(require("../environment.config"));
const axios_1 = __importDefault(require("axios"));
const coin_model_1 = require("../models/coin.model");
const coin_history_model_1 = require("../models/coin-history.model");
const fetchCoinDataFromSource = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.coingecko.com/api/v3/coins/markets`;
    try {
        const response = yield axios_1.default.get(url, {
            params: Object.assign(Object.assign({ vs_currency: environment_config_1.default.currency, order: 'market_cap_desc', per_page: environment_config_1.default.coinCount, page: 1 }, ((ids === null || ids === void 0 ? void 0 : ids.length) ? { ids: ids === null || ids === void 0 ? void 0 : ids.join(',') } : {})), { sparkline: 'false' }),
            headers: {
                'X-CoinAPI-Key': environment_config_1.default.apiKey
            }
        });
        let now = new Date();
        for (let doc of response.data) {
            const coin = yield coin_model_1.Coin.findOneAndUpdate({ sourceId: doc.id }, {
                $set: { latestPrice: doc.current_price },
                $setOnInsert: {
                    symbol: doc.symbol,
                    name: doc.name,
                    image: doc.image,
                }
            }, { upsert: true });
            yield coin_history_model_1.CoinHistory.create({
                coin: coin === null || coin === void 0 ? void 0 : coin._id,
                time: now,
                price: coin === null || coin === void 0 ? void 0 : coin.latestPrice
            });
        }
    }
    catch (error) {
        console.log("Couldnt fetch Coin data");
    }
});
exports.fetchCoinDataFromSource = fetchCoinDataFromSource;
const coinList = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield coin_model_1.Coin.find().sort({ _id: 1 }).lean();
});
exports.coinList = coinList;
//# sourceMappingURL=coin.service.js.map