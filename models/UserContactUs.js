import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserContactUsSchema = new Schema(
  {
   fullname: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userContact = mongoose.model("usercontactus", UserContactUsSchema);
export default userContact;
