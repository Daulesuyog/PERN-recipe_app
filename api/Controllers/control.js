import db from "../Models/db.js";
import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken";

export const getuser = async(req, res)=>{
    try{
        const result = await db.query("SELECT * FROM users");
        return res.status(200).json(result.rows);
    }catch(error){
        console.error("error",error);
        return res.status(500).json(error);
    }
}

export const register = async (req, res) =>{
    console.log("this is register data ",req.body)
    const {name, gmail, password} = req.body;
   
    try{
        const user = await db.query("SELECT * FROM users where gmail = $1", [gmail]);
        if(user.rowCount > 0){
            return res.status(400).json({"User Already Exist": "Please Login Again"})
        }
        const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await db.query(`INSERT INTO users (name, gmail, password) VALUES ($1, $2, $3) RETURNING *`, [name, gmail, hashpassword]);
    res.status(200).json({message:`Welcome! Let’s get started! ${name}`,
        user:{
            id : newUser.rows[0].id,
            name : newUser.rows[0].name,
            gmail : newUser.rows[0].gmail,
            password :newUser.rows[0].password
           }
    });
  }catch(error){
    console.error("error", error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export const login = async (req, res) => {
    const {gmail, password} = req.body;
    try{
        const user = await db.query("SELECT * FROM users WHERE gmail = $1", [gmail]);
        if(user.rowCount === 0){
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await  bcrypt.compare(password, user.rows[0].password);
        if(!isMatch){
           return res.status(400).json({message: "Invalid Gmail or Password"});
        }

        const token = jwt.sign({ userid: user.rows[0].id}, "!@#$%^&*()",{
          expiresIn : "365d"});
          return res.status(200).json({message:`Welcome to your dashboard!${user.rows[0].name}`, token,
         user:{
            id : user.rows[0].id,
       
         }
        })
    }catch(error){
        console.error("Login error", error)
        return res.status(500).json({message: "Internal server error"});
    }
}

export const profile = async (req, res) => {
    const id = req.user.id;  
        try {
      const user = await db.query(
        'SELECT id, gmail, name FROM users WHERE id = $1',
        [id]
      );
  
      if (user.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Profile fetched successfully",
        user: user.rows[0]
      });
    } catch (error) {
      console.error("Profile Error:", error);
      return res.status(500).json({ message: "Failed to fetch profile", error: error.message });
    }
  };
  