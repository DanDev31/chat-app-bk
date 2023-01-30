"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, _next) => {
    const errorMessage = error.message || "Internal error";
    const errorStatus = error.statusCode || 500;
    console.log(error);
    res.status(errorStatus).json({
        error: true,
        errorMessage
    });
};
exports.errorHandler = errorHandler;
