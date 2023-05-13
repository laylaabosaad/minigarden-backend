import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getAllUsers = async (req, res) => {
  try {
    const find = await User.find();
    res.send({
      message: "All Users:",
      data: find,
    });
  } catch (error) {
    res.send({
      message: "Users not found",
      error: error,
    });
  }
};

//Orders and find a user 3m yfoto b ba3d

const getuser = async (req, res) => {
  console.log("ZEINAB");
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.send({
      message: "the user",
      data: user,
    });
  } catch (error) {
    res.send({
      message: "User Not found???",
      error: error.message,
    });
  }
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await User.findOne({ email });

  if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
    res.send({
      _id: loginUser.id,
      fullname: loginUser.fullname,
      email: loginUser.email,
      token: generateToken(User._id),
      message: "login was successful",
    });
  } else {
    res.send({ message: "User doesn't exist. Please register" });
  }
};

//delete User

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const removeUser = await User.findByIdAndDelete(userId);
    res.json({
      message: "user deleted successfully",
      data: removeUser,
    });
  } catch (error) {
    res.json({
      message: "user deletion failed",
      error: error,
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Edit User

const editUser = async (req, res, _id) => {
  const userId = req.params.id;

  try {
    const edit = await User.findByIdAndUpdate(userId, {
      role: req.body.role,
    });
    res.json({
      message: "user was successfully editted",
    });
  } catch {
    res.json({
      message: "user edition failed",
    });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.send({
      message: "Please add all fields",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.send({
      message: "User already exist",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
      token: generateToken(User._id),
    });
  } else {
    res.send({
      message: "Registration failed",
    });
  }
};

export default {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  editUser,
  getuser,
};
