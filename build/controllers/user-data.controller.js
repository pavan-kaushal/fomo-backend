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
exports.UserDataController = void 0;
const core_1 = require("@overnightjs/core");
const response_middleware_1 = __importDefault(require("../utils/response.middleware"));
const multer_1 = __importDefault(require("multer"));
let UserDataController = class UserDataController {
    constructor() {
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = null;
                (0, response_middleware_1.default)(res, true, 'Logged In', data);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                (0, response_middleware_1.default)(res, true, 'Upload Successful', null);
            }
            catch (error) {
                (0, response_middleware_1.default)(res, false, error.message, error);
            }
        });
    }
};
exports.UserDataController = UserDataController;
__decorate([
    (0, core_1.Post)('download')
], UserDataController.prototype, "login", null);
__decorate([
    (0, core_1.Post)('upload'),
    (0, core_1.Middleware)([(0, multer_1.default)().single('excel')])
], UserDataController.prototype, "addUser", null);
exports.UserDataController = UserDataController = __decorate([
    (0, core_1.Controller)('user-data')
], UserDataController);
//# sourceMappingURL=user-data.controller.js.map