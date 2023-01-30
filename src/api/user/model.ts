import mongoose, { Schema } from "mongoose";


type Contact = {
    _id:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    name:string;
    email:string;
}

type Conversation = {
    _id:Schema.Types.ObjectId;
    text:string;
}

interface IUser {
    name:string;
    email:string;
    password:string;
    contacts:Contact[];
    conversations:Conversation[];
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contacts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Contact'
        }
    ],
    conversations:[
        {
            type:Schema.Types.ObjectId,
            ref:'Conversation'
        }
    ]
},
{
    timestamps:true
});

export default mongoose.model("User", userSchema);