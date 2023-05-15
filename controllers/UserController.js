import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const jwtSecret= "secret"

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
  const userid = req.params.userid;
  try {
    const user = await User.findById(userid).select("fullname email");
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
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const loginUser = await User.findOne({ email });

//   if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
//     res.send({
//       _id: loginUser.id,
//       fullname: loginUser.fullname,
//       email: loginUser.email,
//       token: generateToken(User._id),
//       message: "login was successful",
//     });
//   } else {
//     res.send({ message: "User doesn't exist. Please register" });
//   }
// };

// login a user
 const loginUser = async (req, res) => {
  // Check if username and password is provided
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  } else
    try {
      const user = await User.findOne({ email: req.body.email });
      // comparing given password with hashed password
      bcrypt.compare(req.body.password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email: req.body.email, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user._id,
            token: token,
            role: user.role,
          });
        } else {
          res.status(400).json({ message: "Login not succesful.Check your password or email" });
        }
      });
    } catch (error) {
      res.status(400).json({
        message: "User doesn't exist. Please register",
        error: error.message,
      });
    }
 };


 // logout
 const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User successfully logged out" });
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

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

//Update User role

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
   try {
     const existingUser = await User.findOne({ email: req.body.email });
     if (existingUser) {
       return res.status(400).json({ error: "Email address already in use" });
     }

     if (
       !req.body ||
       !req.body.fullname ||
       !req.body.password ||
       !req.body.email
     ) {
       return res.status(400).json({ error: "Missing required fields" });
     }

     if (req.body.password.length < 6) {
       return res
         .status(400)
         .json({ error: "Password must be at least 6 characters long" });
     }

     // hash the password
     const hash = await bcrypt.hash(req.body.password, 10);
     const user = await User.create({
       fullname: req.body.fullname,
       password: hash,
       email: req.body.email,
     });

     const maxAge = 3 * 60 * 60;
     const token = jwt.sign(
       { id: user._id, fullname: req.body.fullname, role: user.role },
       jwtSecret,
       {
         expiresIn: maxAge, // 3hrs in sec
       }
     );
     res.cookie("jwt", token, {
       httpOnly: true,
       maxAge: maxAge * 1000, // 3hrs in ms
     });
     res.status(201).json({
       message: "User successfully created",
       user: user._id,
       token: token,
       role: "User",
     });
   } catch (error) {
     console.log(error);
     res
       .status(500)
       .json({ error: "User not successfully created", error: error.message });
   }
 };


export default {
  signupUser,
  loginUser,
  logout,
  getAllUsers,
  deleteUser,
  editUser,
  getuser,
};
