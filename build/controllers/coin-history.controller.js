"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.CoinHistoryController = void 0;
const core_1 = require("@overnightjs/core");
const coin_service_1 = require("../services/coin.service");
const response_middleware_1 = __importDefault(require("../utils/response.middleware"));
let CoinHistoryController = class CoinHistoryController {
    getCoins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let coins = yield (0, coin_service_1.coinList)();
                return (0, response_middleware_1.default)(res, true, 'success', coins);
            }
            catch (error) {
                return (0, response_middleware_1.default)(res, false, error.message);
            }
        });
    }
};
exports.CoinHistoryController = CoinHistoryController;
__decorate([
    (0, core_1.Get)('')
], CoinHistoryController.prototype, "getCoins", null);
exports.CoinHistoryController = CoinHistoryController = __decorate([
    (0, core_1.Controller)('coin-history')
], CoinHistoryController);
//# sourceMappingURL=coin-history.controller.js.map