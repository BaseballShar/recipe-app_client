import axios from "axios";
import { useEffect, useState } from "react";

export default function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    async function fetchSavedRecipes() {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`,
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
