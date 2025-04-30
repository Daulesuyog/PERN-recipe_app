import db from "../Models/db.js";
import jwt from "jsonwebtoken";

export const Authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    
    if (!token) {
      return res.status(401).json({ message: "Please Login First" });
    }

    const decoded = jwt.verify(token, "!@#$%^&*()");
    console.log("This is decoded data", decoded);

    const id = decoded.userid;

    const user = await db.query(
      "SELECT id, name, gmail FROM users WHERE id = $1",
      [id]
    );

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user.rows[0];
    next();

  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};


// import jwt from "jsonwebtoken";
// import db from "../Models/db.js";

// export const Authenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.header("Authorization");
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Please login first" });
//     }

//     const decoded = jwt.verify(token, "!@#$%^&*()");  // Replace with process.env.JWT_SECRET
//     const userId = decoded.userid;


//     const user = await db.query("SELECT id, name, gmail FROM users WHERE id = $1", [userId]);

//     if (user.rowCount === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user.rows[0];  // Attach user info to request object
//     next();
//   } catch (error) {
//     console.error("Authentication Error:", error);

//     // Handle specific JWT errors
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: "Token expired" });
//     }

//     return res.status(500).json({ message: "Authentication failed" });
//   }
// };
