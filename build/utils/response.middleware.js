"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums/enums");
const responseMiddleware = (res, success, message, data, code = enums_1.RESPONSE_CODES.DEFAULT) => {
    return res.send({
        data: data,
        success: success,
        message: message,
        code: code,
    });
};
exports.default = responseMiddleware;
//# sourceMappingURL=response.middleware.js.map