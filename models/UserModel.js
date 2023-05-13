import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin","user"],
      default: "user"
    },
  
  },

  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", User);
export default UserModel;
