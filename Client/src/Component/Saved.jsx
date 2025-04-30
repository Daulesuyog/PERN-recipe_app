import React, { useContext, useState } from "react";
import { AppContext } from "../Context/App_Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Saved = () => {
  const {saveRecipe, deleteSavedRecipe,} = useContext(AppContext);
  

  // Handle delete action
  const handledelete = async (id) => {
    const result = await deleteSavedRecipe(id);
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  
  return (
    <div className="container my-4">
      <h2 className="text-center text-warning mb-4" style={{ fontSize: "2rem" }}>
        🍽️ Saved Recipes
      </h2>

      <div className="row g-5 justify-content-start">
        {saveRecipe?.map((recipe) => (
          <div className="col-lg-2 col-md-3 col-sm-4 col-6" key={recipe.id}>
            <div
              className="card text-white bg-dark h-100"
              style={{
                borderRadius: "10px",
                border: "2px solid #ffc107",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                overflow: "hidden",
              }}
            >
              <img
                src={recipe.imgurl}
                className="card-img-top"
                alt={recipe.title}
                style={{
                  height: "130px",
                  objectFit: "cover",
                  borderRadius: "10px 10px 0 0",
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between p-2">
                <h5 className="card-title text-center text-info mb-2" style={{ fontSize: "0.95rem" }}>
                  {recipe.title}
                </h5>

                <div className="d-flex justify-content-center" style={{ gap: "6px" }}>
                  <Link
                    to={`/${recipe.id}`}
                    className="btn btn-sm btn-warning"
                    style={{ fontSize: "0.75rem" }}
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handledelete(recipe.id)}
                    className="btn btn-sm btn-danger"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Delete
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;



// import React, { useContext } from "react";
// import { AppContext } from "../Context/App_Context";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// const Saved = () => {
//   const { saveRecipe,  deleteSavedRecipe, UpdateRecipe } = useContext(AppContext);

//   const [updatedRecipeData, setUpdatedRecipeData] = useState({
//     title: "",
//     instructions: "",
//     ingrediant1: "",
//     ingrediant2: "",
//     ingrediant3: "",
//     ingrediant4: "",
//     qty1: "",
//     qty2: "",
//     qty3: "",
//     qty4: "",
//     imgurl: "",
//   });

//   const handledelete = async (id) => {
//       const result = await deleteSavedRecipe(id);
//       toast.success(result.data.message, {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
    
//   }

//   const handleupdate = async (id) => {
//     // Call UpdateRecipe with the updated recipe data
//     const result = await UpdateRecipe(id, ...Object.values(updatedRecipeData));
//     toast.success(result.data.message, {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//     });
//   };

//   // Handle input change for updated recipe data
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedRecipeData({
//       ...updatedRecipeData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="container my-4">
//       <h2
//         className="text-center text-warning mb-4"
//         style={{ fontSize: "2rem" }}
//       >
//         🍽️ Saved Recipes
//       </h2>

//       <div className="row g-5 justify-content-start">
//         {saveRecipe?.map((recipe) => (
//           <div className="col-lg-2 col-md-3 col-sm-4 col-6" key={recipe.id}>
//             <div
//               className="card text-white bg-dark h-100"
//               style={{
//                 borderRadius: "10px",
//                 border: "2px solid #ffc107",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 src={recipe.imgurl}
//                 className="card-img-top"
//                 alt={recipe.title}
//                 style={{
//                   height: "130px",
//                   objectFit: "cover",
//                   borderRadius: "10px 10px 0 0",
//                 }}
//               />

//               <div className="card-body d-flex flex-column justify-content-between p-2">
//                 <h5
//                   className="card-title text-center text-info mb-2"
//                   style={{ fontSize: "0.95rem" }}
//                 >
//                   {recipe.title}
//                 </h5>

//                 <div className="d-flex justify-content-center" style={{ gap: "6px" }}>
//                   <Link
//                     to={`/${recipe.id}`}
//                     className="btn btn-sm btn-warning"
//                     style={{ fontSize: "0.75rem" }}
//                   >
//                     View
//                   </Link>
//                 <button
//                    onClick={() => handledelete(recipe.id)}
//                     className="btn btn-sm btn-danger"
//                     style={{ fontSize: "0.75rem" }}
//                   >
//                     Delete
//                 </button>
//                 <button
//                    onClick={() => handleupdate(recipe.data)}
//                     className="btn btn-sm btn-warning"
//                     style={{ fontSize: "0.75rem" }}
//                   >
//                     Update
//                 </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Saved;
