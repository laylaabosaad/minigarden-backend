import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContactUsSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, {
  timestamps:true

});
  
const ContactUs = mongoose.model("contactus", ContactUsSchema);
export default ContactUs