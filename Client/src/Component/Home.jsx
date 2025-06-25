import React, { useContext, useState } from "react";
import { AppContext } from "../Context/App_Context.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const { recipe, SavedRecipeById, } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter recipes based on search query
  const filteredRecipes = recipe?.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saved = async (id) => {
      const result = await SavedRecipeById(id);
      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-3">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search recipes..."
            style={{
              backgroundColor: "#333",
              color: "wheat",
              border: "2px solid #ffc107",
              borderRadius: "25px",
              padding: "15px 20px"
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <h2
          className="text-center mb-3"
          style={{ fontSize: "1.8rem", color: "#ffc107" }}
        >
          🍳 All Recipes
        </h2>

        <div className="row g-5 justify-content-start">
          {filteredRecipes?.length === 0 ? (
            <div className="col-12 text-center text-warning">
              No recipes found matching your search.
            </div>
          ) : (
            filteredRecipes?.map((data) => (
              <div key={data.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div
                  className="card bg-dark text-light h-100"
                  style={{
                    borderRadius: "10px",
                    border: "2px solid #ffc107",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={data.imgurl}
                    alt={data.title}
                    className="card-img-top"
                    style={{
                      height: "130px",
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between p-2">
                    <h5
                      className="card-title text-center mb-2"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {data.title}
                    </h5>
                    <div
                      className="d-flex justify-content-center"
                      style={{ gap: "5px" }}
                    >
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/${data.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => saved(data.id)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;