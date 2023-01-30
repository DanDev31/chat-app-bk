import mongoose, { Schema } from "mongoose";

interface IMessage{
    userId:Schema.Types.ObjectId,
    conversation:Schema.Types.ObjectId;
};

const messageSchema = new Schema<IMessage>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    conversation:{
        type:Schema.Types.ObjectId,
        ref:'Conversation'
    } 
},
{
    timestamps:true
});

export default mongoose.model("Message", messageSchema);