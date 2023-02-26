import {Request, Response, NextFunction } from "express";
import { hashPassword, ValidatePassword } from "./helpers";
import User from "../user/model";
import jwt from "jsonwebtoken";
import services from "./services";
import config from "../../config";



export default {

    async register(
        req:Request<{},{},{ name:string, email:string, password:string }>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { name, email, password } = req.body;

            const hashedPassword = await hashPassword(password);

            const userFound = await services.findUser(email);

            if(userFound){
                res.status(400).json({
                    message:"A user is already registered with this email."
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password:hashedPassword
                })
    
                const user = await newUser.save();
                res.status(200).json(user);
            }

        } catch (error) {
            next(error);
        }
    },

    async login(
        req:Request<{},{},{ email:string, password:string }>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { email, password } = req.body;

            const user = await services.findUser(email);

            if(!user){
                return res.status(400).json({message:"User not found."});
            }
            const isValidPassword = ValidatePassword(password, user?.password);
            !isValidPassword && res.status(400).json({message:"Wrong password!"})

            const userContacts = await User.findById(user._id).populate('contacts', 'name email');
            const { accessToken } = await services.createTokens({id:user._id, email:user.email});
            
            const userInfo = {
                id:user._id,
                name:user.name,
                email:user.email,
                contacts: userContacts?.contacts || [],
                accessToken
            };
           

            res.cookie("access_token", accessToken, {
                httpOnly:true,
                secure:true
            });
            res.status(200).json(userInfo);

        } catch (error) {
            next(error);
        }
    },

    async verifyRefreshToken(
        req:Request<{},{},{refreshToken:any}>,
        res:Response,
        next:NextFunction
    ){
        const {refreshToken } = req.body;
         jwt.verify(refreshToken, config.server.jwt as string, (err:any, decoded:any) => {
            if (err) {
                return res.status(401).json({ message: "Invalid refresh token" });
              }

              const newAccessToken = jwt.sign({ userId: decoded._id }, 'mysecret', {
                expiresIn: "1h"
              });

              res.status(200).json({
                accessToken:newAccessToken
              })
         } )
    }

}