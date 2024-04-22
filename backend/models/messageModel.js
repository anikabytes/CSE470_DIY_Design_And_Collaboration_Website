import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },

    message: {
        type: String,
        default: ''
    }

});

const Message = mongoose.model('Message', messageSchema);


export default Message;
