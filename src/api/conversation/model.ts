import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    message:[
        {
            type:Schema.Types.ObjectId,
            ref:'Message'
        }
    ]
},
{
    timestamps:true
});

export default mongoose.model("Conversation", conversationSchema);