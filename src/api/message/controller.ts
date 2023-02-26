import { NextFunction, Request, Response } from "express";
import Message from "./model";


export default {
    async getMessages(
        req:Request<{conversationId?:string},{},{}>,
        res:Response,
        next:NextFunction
    ){
      
        try {
            const { conversationId } = req.params; 
            const messages = await Message.find({
                conversationId
            });
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }

    },
    async createMessage(
        req:Request<{},{},{userId:string, contactId:string, conversationId?:string, text:string, wasReaded:boolean}>,
        res:Response,
        next:NextFunction
    ){
        try {
            const {userId, conversationId, text, wasReaded} = req.body; 
            const newMessage = new Message({
                userId,
                conversationId,
                text,
                wasReaded
            });
            const messageCreated = await newMessage.save();

            res.status(200).json(messageCreated);
        } catch (error) {
            next(error);
        }

    }
}