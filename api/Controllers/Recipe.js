
import db from "../Models/db.js";


export const add = async (req, res) => {
  const {
    title,
    instructions,
    ingrediant1,
    ingrediant2,
    ingrediant3,
    ingrediant4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgurl,
  } = req.body;
  console.log(req.body);

  if (!req.user) {
    return res
      .status(500)
      .json({ message: "Unauthorized: User is not authenticated" });
  }
  try {
    const recipe = await db.query(
      "INSERT INTO recipes (title, instructions, ingrediant1, ingrediant2, ingrediant3, ingrediant4, qty1, qty2, qty3, qty4, imgurl, user_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) RETURNING *",
      [
        title,
        instructions,
        ingrediant1,
        ingrediant2,
        ingrediant3,
        ingrediant4,
        qty1,
        qty2,
        qty3,
        qty4,
        imgurl,
        //req.user
        req.user.id, 
      ]
    );
    res.status(200).json({
      message: `Recipe ${title} created successfully`,
      recipe: recipe.rows[0],
    });
  } catch (error) {
    console.error("Recipe save error:", error);
    res
      .status(500)
      .json({ message: "Failed to save recipe", error: error.message });
  }
};

export const getAllrecipe = async (req, res) =>{
  try{
    const recipe = await db.query("SELECT * FROM recipes ORDER BY created_at DESC");
    res.status(200).json({recipe:recipe.rows})
  }catch(error){
    console.error("Error fetching recipes:",error);
    res.status(500).json({message: "Failed to fetch recipes:",error:error.message})
  }
};

export const getrecipebyid = async (req, res) => {
  const id = req.params.id;
  try{
    const result = await db.query("SELECT * FROM recipes WHERE id = $1", [id]);
    if(result.rowCount === 0 ){
      return res.status(404).json({message: "Recipe does not exist"});
    }
    res.json({message: `Recipe fetched successfully by id ${result.rows[0].id}`, recipe:result.rows[0]});
  }catch(error){
    console.error("Error fetching to recipe id", error);
    res.status(500).json({message: "Failed to fetched recipe by id", error:error.message});
  }
};

export const getrecipebyUserid = async (req, res) => {
  const userid = req.params.id;

  try {
    const result = await db.query(
      "SELECT recipes.*, users.name FROM recipes JOIN users ON recipes.user_id = users.id WHERE recipes.user_id = $1",
      [userid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User has no recipe" });
    }

    return res.status(200).json({
      message: `Recipe fetched successfully by ${result.rows[0].name}`,
      recipe: result.rows
    });
  } catch (error) {
    console.error("Error fetching recipe by user id", error);
    return res.status(500).json({
      message: "Failed to fetch recipe by user id",
      error: error.message
    });
  }
};


export const savedrecipeById = async (req, res) => {
  const recipeid = req.params.id;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: User is not authenticated" });
  }

  try {
    // Check if recipe exists in recipes table
    const recipeCheck = await db.query("SELECT * FROM recipes WHERE id = $1", [recipeid]);
    if (recipeCheck.rows.length === 0) {
      return res.status(404).json({ message: "Recipe does not exist" });
    }

    // Check if recipe already saved by this user
    const existing = await db.query(
      "SELECT id FROM saved_recipes WHERE recipe_id = $1 AND user_id = $2",
      [recipeid, req.user.id]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: "Recipe already saved" });
    }

    // Save the recipe
    const result = await db.query(
      "INSERT INTO saved_recipes (recipe_id, user_id, saved_at) VALUES ($1, $2, NOW()) RETURNING *",
      [recipeid, req.user.id]
    );

    res.json({
      message: "Recipe saved successfully.....!",
      savedRecipe: result.rows[0]
    });

  } catch (error) {
    console.error("Save recipe error:", error);
    res.status(500).json({ message: "Failed to save recipe", error: error.message });
  }
};


  export const getsavedrecipe = async (req, res) => {
    try {
      const result = await db.query(`
        SELECT r.*, sr.user_id, sr.saved_at
        FROM recipes r
        JOIN saved_recipes sr ON r.id = sr.recipe_id
        ORDER BY sr.saved_at DESC
      `);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "No saved recipes found" });
      }
  
      res.status(200).json({
        message: "Saved recipes fetched successfully",
        recipes: result.rows
      });
  
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
      return res.status(500).json({
        message: "Failed to fetch saved recipes",
        error: error.message
      });
    }
  };

  export const deletesavedrecipe = async (req, res) =>{

    const recipeid = req.params.id;
    if(!req.user){
    return res.status(401).json({message: " Unauthorized: User is not authenticated"});
    }
    try{
      const result = await db.query("DELETE FROM saved_recipes WHERE recipe_id = $1 AND user_id = $2 RETURNING *", [recipeid,req.user.id]);
      if(result.rows.length === 0){
        return res.status(404).json({message: "Recipe does not exist"});
      }
      res.status(200).json({message: "Recipe deleted successfully", recipe: result.rows[0]});
    }catch(error){
      console.error("Error for delteing saved recipe;", error);
      return res.status(500).json({message: "Failed to delete saved recipe", error: error.message});
    }
  }

  export const UpdateRecipe = async (req, res) => {
    const recipeId = req.params.id;
    const { title, instructions, ingrediant1, ingrediant2, ingrediant3, ingrediant4, qty1, qty2, qty3, qty4, imgurl } = req.body;
  
    try {
      const result = await db.query(
        "UPDATE recipes SET title = $1, instructions = $2, ingrediant1 = $3, ingrediant2 = $4, ingrediant3 = $5, ingrediant4 = $6, qty1 = $7, qty2 = $8, qty3 = $9, qty4 = $10, imgurl = $11 WHERE id = $12 RETURNING *",
        [title, instructions, ingrediant1, ingrediant2, ingrediant3, ingrediant4, qty1, qty2, qty3, qty4, imgurl, recipeId]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      res.status(200).json({ message: "Recipe updated successfully", recipe: result.rows[0] });
    } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).json({ message: "Failed to update recipe", error: error.message });
    }
  }
  
  export const searchRecipes = async (req, res) => {
    const searchTerm = req.query.q;
    
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }
  
    try {
      const result = await db.query(
        `SELECT * FROM recipes 
         WHERE title ILIKE $1 
         ORDER BY created_at DESC`,
        [`%${searchTerm}%`]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ 
          message: "No recipes found matching your search",
          recipes: []
        });
      }
  
      res.status(200).json({
        message: "Search results fetched successfully",
        recipes: result.rows
      });
  
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({
        message: "Failed to perform search",
        error: error.message
      });
    }
  };