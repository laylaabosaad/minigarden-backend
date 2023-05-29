// import jwt from "jsonwebtoken";
// const jwtSecret = "secret";
// // authenticate an admin
// export const adminAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" });
//       } else {
//         if (decodedToken.role !== "admin") {
//           return res.status(401).json({ message: "Not authorized" });
//         } else {
//           next();
//         }
//       }
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" });
//   }
// };
// // authenticate a user
// export const userAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" });
//       } else {
//         if (decodedToken.role !== "user") {
//           return res.status(401).json({ message: "Not authorized" });
//         } else {
//           next();
//         }
//       }
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" });
//   }
// };



import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

const isAuthenticated = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //get user from token
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Check user's role
      const allowedRoles = ["admin", "user"];
      if (!user.role || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default isAuthenticated;
