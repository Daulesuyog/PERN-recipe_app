import express from "express";

import {add, getAllrecipe, getrecipebyid, getrecipebyUserid, getsavedrecipe, savedrecipeById, deletesavedrecipe, UpdateRecipe, searchRecipes} from "../Controllers/Recipe.js";

import { Authenticate } from "../Middleware/auth.js";

const router = express.Router();
//create recipe
// router.post("/add",add);
router.post('/add', Authenticate, add)

// //get all recipe
router.get('/recipes',getAllrecipe)

// //get savedrecipe by id
router.get('/saved',getsavedrecipe)

//search recipe
router.get('/search', savedrecipeById)

// //get request by id
router.get('/:id', getrecipebyid)

// //get request by userid
router.get("/user/:id",getrecipebyUserid)

// //savedrecipe by id
router.post("/:id", Authenticate, savedrecipeById)

// //delete saved recipe by id
router.delete("/saved/:id", Authenticate, deletesavedrecipe);

// //get updaterecipe by id
 router.put("/update/:id", Authenticate, UpdateRecipe);




export default router;