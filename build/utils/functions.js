"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTokenFromHeaders = void 0;
const jwt_decode_1 = require("jwt-decode");
const decodeTokenFromHeaders = (authorizationHeader) => {
    const token = authorizationHeader.substring('Bearer '.length);
    try {
        const decodedToken = (0, jwt_decode_1.jwtDecode)(token);
        return decodedToken;
    }
    catch (error) {
        throw Error(`Error Decoding Token: ${JSON.stringify(error)}`);
    }
};
exports.decodeTokenFromHeaders = decodeTokenFromHeaders;
//# sourceMappingURL=functions.js.map