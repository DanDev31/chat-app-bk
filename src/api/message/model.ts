import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    conversationId:{
        type:Schema.Types.ObjectId,
        ref:'Conversation'
    },
    text:{
        type:String,
    },
    wasReaded:{
       type:Boolean 
    }
},
{
    timestamps:true
});

export default mongoose.model("Message", messageSchema);