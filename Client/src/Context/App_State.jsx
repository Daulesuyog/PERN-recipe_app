
import React, { useEffect, useState } from "react";
import { AppContext } from "./App_Context.jsx";
import axios from "axios";

function AppState(props) {
  const url = "http://localhost:3000/api";

  const [token, setToken] = useState("");
  const [recipe, setrecipe] = useState([]);
  const [saveRecipe, setsaveRecipe] = useState([]);
  const [user, setuser] = useState([]);
  const [userId, setuserId] = useState("");
  const [userRecipe, setuserRecipe] = useState([]);
  const [isAuthenticate, setisAuthenticate] = useState(false);
  const [reload, setreload] = useState(true);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/recipes`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.recipe);
      setrecipe(api.data.recipe);
    };
    fetchRecipe()
    getsavedrecipe()
    Profile()
    recipeByUser(userId);
    
  }, [token,userId,reload]);

  useEffect(() => {
  if(token){
    localStorage.setItem("token",token)
  }
  const tokenFromLocalStorage = localStorage.getItem("token",token);
  if(tokenFromLocalStorage)
  {
    setToken(tokenFromLocalStorage);
    setisAuthenticate(true)
  }
  }, [token,reload])
  


  // Register function
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/register`,
      { name, gmail, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    // setToken(api.data.token);
    // localStorage.setItem("token", api.data.token);
    // setisAuthenticate(true);
    return api;
  };

  // Login function
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/login`,
      { gmail, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    setToken(api.data.token);
    // localStorage.setItem("token",api.data.token);
     setisAuthenticate(true);
    return api;
  };

  // Add recipe function
  const addRecipe = async (
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
    imgurl
  ) => {
    try {
      console.log("Adding recipe with token:", token); 
      const api = await axios.post(
        `${url}/add`,
        {
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
        },
        {
          headers: { "Content-Type": "application/json",Authorization: token, },
          withCredentials: true,
        }
      );
      console.log("Recipe added:", api.data); // Debugging: Log API response
      setreload(!reload);
      return api;
  }catch(error){
    console.error("Error in Addrecipe", error)
  }
}

  // Get recipe by ID
  const RecipeById = async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(api);
        return api;
  };

  // Save recipe by ID
  const SavedRecipeById = async (id) => {
        const api = await axios.post(`${url}/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ,
        },
        withCredentials: true,
      });
      console.log(api);
      setreload(!reload);  // Update the state to trigger reloading
      return api;
   
  };
  

  // Get all saved recipes
  const getsavedrecipe = async () => {
    const api = await axios.get(`${url}/saved`, 
      {
      headers: { "Content-Type": "application/json", },
      withCredentials: true,
    }
  );
    console.log("get saved recipe", api.data.recipes);
    setsaveRecipe(api.data.recipes);
  };

  // Get user profile
  const Profile = async () => {
    const api = await axios.get(`${url}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,  // Make sure token is sent
        },
        withCredentials: true,
      });
      setuserId(api.data.user.id);
      setuser(api.data.user); 
  };
  
  // Get recipes by user ID
  const recipeByUser = async (id) => {
    const api = await axios.get(`${url}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",  
      },
      withCredentials: true,
    });
    // console.log("user Specific recipe ",api)
    setuserRecipe(api.data.recipe)
  };

  const deleteSavedRecipe = async (id) => {
    const api = await axios.delete(`${url}/saved/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      withCredentials: true,
    });
    console.log("Deleted recipe", api.data);
    setreload(!reload);
    return api;
  };

  const searchRecipes = async (query) => {
    const api = await axios.get(`${url}/search`, {
      params: { q: query },
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return api.data.recipes;
  };

  // const UpdateRecipe = async (
  //   title,
  //   instructions,
  //   ingrediant1,
  //   ingrediant2,
  //   ingrediant3,
  //   ingrediant4,
  //   qty1,
  //   qty2,
  //   qty3,
  //   qty4,
  //   imgurl,) => {
  //     try{
  //       const api = await axios.put(`${url}/update/${id}`, {
  //         title,
  //       instructions,
  //       ingrediant1,
  //       ingrediant2,
  //       ingrediant3,
  //       ingrediant4,
  //       qty1,
  //       qty2,
  //       qty3,
  //       qty4,
  //       imgurl,
  //       },
  //       {
  //         headers: {
  //          "Content-Type": "application/json", Authorization:token
  //         },
  //         withCredentials: true
  //       }
  //       );
  //       console.log("Updated recipe", api.data);
  //       setreload(!reload);
  //       return api;
  //     }catch(error){
  //       console.error("Error in UpdateRecipe", error)
  //     }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token", token); 
    setToken("");
    setisAuthenticate(false);
  };

  return (
    <div>
      <AppContext.Provider
        value={{
          login,
          register,
          addRecipe,
          recipe,
          RecipeById,
          SavedRecipeById,
          saveRecipe,
          userRecipe,
          user,
          logout,
          isAuthenticate,
          setisAuthenticate,
          reload,
          setreload,
          setToken,
          token,
          userId,
          setuserId,
          deleteSavedRecipe,
          searchRecipes
    
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
}


export default AppState;

//193-388 line suyog's code
// import React, { useEffect, useState } from "react";
// import { AppContext } from "./App_Context.jsx";
// import axios from "axios";

// function AppState(props) {
//   const url = "http://localhost:3000/api";

//   const [token, setToken] = useState("");
//   const [recipe, setrecipe] = useState([]);
//   const [saveRecipe, setsaveRecipe] = useState([]);
//   const [user, setuser] = useState([]);
//   const [userId, setuserId] = useState("");
//   const [userRecipe, setuserRecipe] = useState([]);
//   const [isAuthenticate, setisAuthenticate] = useState(false);
//   const [reload, setreload] = useState(true);

//   // Fetch recipes and check authentication on component mount
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const api = await axios.get(`${url}/`, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       setrecipe(api.data.recipe);
//     };
//     fetchRecipe();
//     getsavedrecipe();
//     Profile();
//     recipebyuserId();
//   }, [token, userId, reload]);

//   // Check for token in localStorage on app load
//   useEffect(() => {
//     const tokenFromLocalStorage = localStorage.getItem("token");
//     if (tokenFromLocalStorage) {
//       setToken(tokenFromLocalStorage);
//       setisAuthenticate(true); // User is authenticated if token exists
//     }
//   }, []);

//   // Register function
//   const register = async (name, gmail, password) => {
//     const api = await axios.post(
//       `${url}/register`,
//       { name, gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     localStorage.setItem("token", api.data.token); // Store token in localStorage
//     setisAuthenticate(true); // Set authentication state to true
//     return api;
//   };

//   // Login function
//   const login = async (gmail, password) => {
//     const api = await axios.post(
//       `${url}/login`,
//       { gmail, password },
//       { headers: { "Content-Type": "application/json" }, withCredentials: true }
//     );
//     setToken(api.data.token);
//     localStorage.setItem("token", api.data.token); // Store token in localStorage
//     setisAuthenticate(true); // Set authentication state to true
//     return api;
//   };

//   // Add recipe function
//   const addRecipe = async (
//     title,
//     instructions,
//     ingrediant1,
//     ingrediant2,
//     ingrediant3,
//     ingrediant4,
//     qty1,
//     qty2,
//     qty3,
//     qty4,
//     imgURL
//   ) => {
//     const api = await axios.post(
//       `${url}/add`,
//       {
//         title,
//         instructions,
//         ingrediant1,
//         ingrediant2,
//         ingrediant3,
//         ingrediant4,
//         qty1,
//         qty2,
//         qty3,
//         qty4,
//         imgURL,
//       },
//       {
//         headers: { "Content-Type": "application/json", Authorization: token },
//         withCredentials: true,
//       }
//     );
//     setreload(!reload);
//     return api;
//   };

//   // Get recipe by ID
//   const RecipeById = async (id) => {
//     const api = await axios.get(`${url}/${id}`, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     return api;
//   };

//   // Save recipe by ID
//   const SavedRecipeById = async (id) => {
//     const api = await axios.post(
//       `${url}/${id}`,
//       {},
//       {
//         headers: { "Content-Type": "application/json", Authorization: token },
//         withCredentials: true,
//       }
//     );
//     console.log(api);
//     setreload(!reload);
//     return api;
//   };

//   // Get all saved recipes
//   const getsavedrecipe = async () => {
//     const api = await axios.get(
//       `${url}/saved`,
//       {},
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );
//     console.log("get saved recipe", api.data.recipe);
//     setsaveRecipe(api.data.recipe);
//   };

//   // Get user profile
//   const Profile = async () => {
//     const api = await axios.get(`${url}/user`, {
//       headers: { "Content-Type": "application/json", Authorization: token },
//       withCredentials: true,
//     });
//     setuserId(api.data.user._id);
//     setuser(api.data.user);
//   };

//   // Get recipes by user ID
//   const recipebyuserId = async (id) => {
//     const api = await axios.get(`${url}/user/${id}`, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     setuserRecipe(api.data.recipe);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token"); // Remove token
//     setToken(""); // Clear token from state
//     setisAuthenticate(false); // Set authentication status

//     window.location.href = "/login"; // Redirect to login page
// };


//   return (
//     <div>
//       <AppContext.Provider
//         value={{
//           login,
//           register,
//           addRecipe,
//           recipe,
//           RecipeById,
//           SavedRecipeById,
//           saveRecipe,
//           userRecipe,
//           user,
//           logout,
//           isAuthenticate,
//           setisAuthenticate,
//         }}
//       >
//         {props.children}
//       </AppContext.Provider>
//     </div>
//   );
// }
