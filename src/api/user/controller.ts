import { NextFunction, Request, Response } from 'express';
import User from './model';
import Contact from '../contacts/model';


export default {
    async getUser(
        req:Request<{userId:string},{},{}>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            if(!user) return res.status(400).json({message:'User not found.'});

            res.status(200).json({user})
        } catch (error) {
            next(error);
        }
    },
    async getContactInfo(
        req:Request<{email:string},{},{}>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { email } = req.params;
            const user = await User.findOne({ email });
            if(!user) return res.status(400).json({message:'User not found.'});
            const contactInfo = {
                id:user._id,
                name:user.name,
                email:user.email
            };

            res.status(200).json(contactInfo);
        } catch (error) {
            next(error);
        }
    },
    async addContactToUser(
        req:Request<{},{},{ userId:string, contactEmail:string }>,
        res:Response,
        next:NextFunction
    ){
        try {
            const { userId, contactEmail } = req.body;
            const user = await User.findOne({ email:contactEmail });
            if(!user) return res.status(500).json({message:'Internal server error.'});

            const userContacts = await User.findById(userId).populate('contacts');

            if(userContacts){
                let contacts = userContacts.contacts;
                const foundContact = contacts.find(contact => contact._id.toString() === user._id.toString());
                if(foundContact) return res.status(200).json({message:'This person is already in your contact list.'})
            };

            const newContact = new Contact({
                _id:user._id,
                userId,
                name:user.name,
                email:user.email
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