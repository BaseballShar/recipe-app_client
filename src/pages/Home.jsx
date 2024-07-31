import { Link, useNavigate } from "react-router-dom";
import useRecipes from "../hooks/useRecipes.js";
import useSavedRecipeIDs from "../hooks/useSavedRecipeIDs.js";

export default function Home() {
  const recipes = useRecipes();
  const [savedRecipeIDs, addSavedRecipeID, deleteSavedRecipeID] =
    useSavedRecipeIDs();
  const navigate = useNavigate();

  return (
    <div className="master-container">
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h2>{recipe.name}</h2>
            <div className="text-center">
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            {savedRecipeIDs.includes(recipe._id) ? (
              <button onClick={() => deleteSavedRecipeID(recipe._id)}>
                Delete
              </button>
            ) : (
              <button onClick={() => addSavedRecipeID(recipe._id)}>Save</button>
            )}
            <button
              onClick={() =>
                navigate("/edit-recipe", {
                  state: {
                    prevRecipe: recipe,
                  },
                })
              }
            >
              Edit
            </button>
            <p>Instructions: {recipe.instructions}</p>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>

            <p>Cooking Time: {recipe.cookingTime} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
