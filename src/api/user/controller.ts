import { NextFunction, Request, Response } from 'express';
import User from './model';
import Contact from '../contacts/model';


export default {
    async getUser(
        req:Request<{},{},{ email:string }>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if(!user) return res.status(400).json({message:'User not found.'});

            res.status(200).json({user})
        } catch (error) {
            next(error);
        }
    },
    async addContactToUser(
        req:Request<{},{},{ userId:string, contactId:string }>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { userId, contactId } = req.body;
            const userInfo = await User.findById(contactId);
            if(!userInfo) return res.status(500).json({message:'Internal server error.'});

            const userContacts = await User.findById(userId).populate('contacts');

            if(userContacts){
                let contacts = userContacts.contacts;
                const foundContact = contacts.find(contact => contact._id.toString() === contactId);
                if(foundContact) return res.status(200).json({message:'This person is already in your contact list.'})
            };

            const newContact = new Contact({
                _id:contactId,
                userId,
                name:userInfo.name,
                email:userInfo.email
            });

            await newContact.save();

            await User.findByIdAndUpdate(userId, {
                $push: { contacts: newContact }},
                { new:true }
            );

            res.status(200).json({message:'Contact added successfully'});
        } catch (error) {
            next(error);
        }
    },
    async getUserContacts(
        req:Request<{ userId:string },{},{}>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { userId } = req.params;
            if(!userId) return res.status(401).json({message:'User id is required.'});
       
            const userContacts = await User.findById(userId).populate('contacts', 'name email');
            if(userContacts && userContacts.contacts.length === 0) return res.status(200).json({message:'You have no contacts yet. Add some!.'});
            res.status(200).json({contacts:userContacts?.contacts});
        } catch (error) {
            next(error);
        }
    }
};