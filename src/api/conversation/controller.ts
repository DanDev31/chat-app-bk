import { NextFunction, Request, Response } from "express";
import Conversation from "./model";
import Message from "../message/model";


export default {

    async getConversations(
        req:Request<{userId:string},{},{}>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { userId } = req.params;
            const conversations = await Conversation.find({
                userId
            });
            res.status(200).json(conversations);
        } catch (error) {
            next(error);
        }
    }, 
    async createConversation(
        req:Request<{},{},{ userId:string, contactId:string, message:string, date:string, isReaded:boolean }>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { userId, contactId } = req.body;
            
            const newConversation = new Conversation({
                userId,
                contactId
            });
            const conversation = await newConversation.save();

            res.status(200).json({success:true, message:"New conversation created", conversation});

        } catch (error) {
            next(error);
        }
    },
    async updateConversation(
        req:Request<{},{},{conversationId:string, userId:string, text:string, date:Date, wasReaded:boolean}>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { conversationId, userId, text, date, wasReaded } = req.body;

            const newMessage = await Message.create({
                userId,
                text,
                date,
                wasReaded
            });
            await newMessage.save();

            await Conversation.findByIdAndUpdate(
                conversationId, 
                {
                    $push: newMessage
                },
                {
                    new:true
                }
            );
            res.status(200).json({success:true, message:"New message added"}); 
        } catch (error) {
            next(error);
        }
    },
    async deleteConversation(
        req:Request<{},{},{conversationId:string}>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { conversationId } = req.body;

            await Conversation.deleteOne({
                _id:conversationId
            });
           
            res.status(200).json({success:true, message:"Conversation deleted"}); 
        } catch (error) {
            next(error);
        }
    }
}