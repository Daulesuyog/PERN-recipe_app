import express from "express";
import {  getuser, register, login, profile  } from "../Controllers/control.js";
import { Authenticate } from "../Middleware/auth.js";


const router = express.Router();

router.get('/', getuser );

router.post('/register',register );

router.post('/login',login);

// // for profile
router.get('/user',Authenticate,profile);

//  router.post("/logout", logout)

export default router;