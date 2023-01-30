import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


type CustomRequest = Request & {
    user?:unknown;
}

export const verifyToken = (
    req:CustomRequest,
    res:Response,
    next:NextFunction
) => {
    const token = req.headers["x-access-token"] as string;
    
    jwt.verify(token, config.server.jwt as string, (err, decoded) => {
        if(err){
            return res.status(401).json({message:"Invalid token"});
        }
        req.user = decoded;
        next();
    });
}