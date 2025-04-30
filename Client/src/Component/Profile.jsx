import React, { useContext } from "react";
import { AppContext } from "../Context/App_Context.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { recipe, userRecipe, user, deleteSavedRecipe, } = useContext(AppContext);

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
    <div 
      className="container text-center my-4"
      style={{ 
      
        color: "white",
        minHeight: "80vh",
        padding: "20px"
      }}
    >
      <h2 className="mb-4" style={{ color: "yellow" }}>Welcome {user.name}</h2>

      <div className="row justify-content-center g-15">
        {userRecipe?.map((data) => (
          <div key={data.id} className="col-6 col-sm-4 col-md-3">
            <div 
              className="card h-100 shadow-sm border-warning"
              style={{ 
                backgroundColor: "#333",
                color: "white"
              }}
            >
              <img
                src={data.imgurl}
                className="card-img-top"
                alt={data.title}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  border: "2px solid yellow",
                  borderRadius: "15px",
                }}
              />
              <div 
                className="card-body p-2"
                style={{ backgroundColor: "#222" }}
              >
                <h5 
                  className="card-title mb-0"
                  style={{ color: "white" }}
                >
                  {data.title}
                </h5>
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
        ))}
      </div>
    </div>
  );
}

export default Profile;



// import React, { useContext } from "react";
// import { AppContext } from "../Context/App_Context";

// function Profile() {
//   const { user, userRecipe } = useContext(AppContext);

//   // Check if user and userRecipe are available before rendering
//   if (!user || !userRecipe) {
//     return <div></div>;  // Or any other loading indicator you'd prefer
//   }

//   return (
//     <div className="container text-center my-3">
//       <h1>Welcome {user.name}</h1>
//       <h1>Welcome {user.gmail}</h1>

//       <div className="text-center mx-auto" style={{ width: "1200px" }}>
//         <div className="row d-flex justify-content-center align-items-center">
//           {userRecipe?.length > 0 ? (
//             userRecipe.map((data) => (
//               <div key={data._id} className="col-md-3 my-3 gap-1">
//                 <div className="d-flex justify-content-center align-items-center p-3">
//                   <img
//                     src={data.imgURL}
//                     className="card-img-top"
//                     alt="..."
//                     style={{
//                       width: "200px",
//                       height: "200px",
//                       borderRadius: "10px",
//                       border: "2px solid yellow",
//                     }}
//                   />
//                 </div>

//                 <div className="card-body">
//                   <h5 className="card-title">{data.title}</h5>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div>No recipes available</div>  // Handle case if there are no recipes
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;


// // import React, { useContext } from "react";
// // import { AppContext } from "../Context/App_Context";
// // function Profile(){
// //     const {user, userRecipe} = useContext(AppContext)
// //     return (
// //         <div>
// //             <div className="container text-center my-3">
// //             <h1>Welcome {user.name}</h1>
// //             <h1>Welcome {user.gmail}</h1>
// //             </div>
// //             <div className="text-center mx-auto " style={{ width: "1200px" }}>
// //         <div className="row d-flex justify-content-center align-items-center">
// //           {userRecipe?.map((data) => (
// //             <div key={data._id} className="col-md-3 my-3 gap-1">
              
// //                 <div className="d-flex justify-content-center align-items-center p-3">
// //                   <img
// //                     src={data.imgURL}
// //                     className="card-img-top"
// //                     alt="..."
// //                     style={{ width: "200px", height: "200px",borderRadius:"10px",border:"2px solid yellow" }}
// //                   />
// //                 </div>

// //                 <div className="card-body">
// //                   <h5 className="card-title">{data.title}</h5>
// //                 </div>
             
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //         </div>
// //     )
// // }

// // export default Profile;