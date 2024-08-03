"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
require('dotenv').config('../.env');
const core_1 = require("@overnightjs/core");
const environment_config_1 = __importDefault(require("./environment.config"));
const mongoose_1 = __importDefault(require("mongoose"));
const express = __importStar(require("express"));
const coin_controller_1 = require("./controllers/coin.controller");
const coin_history_controller_1 = require("./controllers/coin-history.controller");
class App extends core_1.Server {
    constructor() {
        super();
        this.port = environment_config_1.default.port;
        this.jwtEscapeUrls = ['/auth/signin', '/auth/signup'];
        this.corsPolicy();
        this.middleware();
        this.connectDb();
    }
    corsPolicy() {
        express.Router();
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user, authorization");
            next();
        });
    }
    middleware() {
        this.app.enable('trust proxy');
        this.app.use(express.json({ limit: '1024mb' }));
        this.app.use(express.urlencoded({ extended: false }));
    }
    connectDb() {
        return __awaiter(this, void 0, void 0, function* () {
            let dbUrl = 'mongodb://' + environment_config_1.default.dbhost + '/' + environment_config_1.default.dbname;
            if (environment_config_1.default.dbusername && environment_config_1.default.dbpassword && environment_config_1.default.dbsource) {
                dbUrl = 'mongodb://' + environment_config_1.default.dbusername + ':' +
                    environment_config_1.default.dbpassword + '@' + environment_config_1.default.dbhost +
                    '/' + environment_config_1.default.dbname + '?authSource=' + environment_config_1.default.dbsource;
            }
            try {
                mongoose_1.default.connection.on('connected', () => { console.log('Db connected'); });
                mongoose_1.default.connection.on('close', () => { console.log('lost Db connection'); });
                mongoose_1.default.connection.on('reconnected', () => { console.log('Db reconnected'); });
                mongoose_1.default.connection.on('error', () => { console.log('Db connection error'); });
                mongoose_1.default.set('strictQuery', true);
                yield mongoose_1.default.connect(dbUrl, {}).then(() => {
                    this.loadControllers();
                });
            }
            catch (err) {
                console.log('Error while db connection ' + JSON.stringify(err));
            }
        });
    }
    loadControllers() {
        super.addControllers([
            new coin_controller_1.CoinController(),
            new coin_history_controller_1.CoinHistoryController(),
        ]);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log("Server ready at port: " + this.port);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map