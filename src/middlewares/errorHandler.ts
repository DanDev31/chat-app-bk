import { Request, Response, NextFunction } from "express";  

export const errorHandler = (error:any, req:Request, res:Response, _next:NextFunction) => {
    const errorMessage = error.message || "Internal error";
    const errorStatus = error.statusCode || 500;
    console.log(error);
    res.status(errorStatus).json({
        error:true,
        errorMessage
    });
}