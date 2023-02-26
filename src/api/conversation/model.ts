import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    contactId:{
        type:Schema.Types.ObjectId
    }
},
{
    timestamps:true
});

export default mongoose.model("Conversation", conversationSchema);