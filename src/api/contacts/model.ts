import mongoose, { Schema } from 'mongoose';


interface IContact {
    _id:mongoose.Schema.Types.ObjectId;
    userId:mongoose.Schema.Types.ObjectId;
    name:string;
    email:string;
}

const contactSchema = new Schema<IContact>({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
},
{
    timestamps:true
});

export default mongoose.model('Contact', contactSchema);