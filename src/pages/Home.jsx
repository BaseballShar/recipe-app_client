import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await axios.get("http://localhost:3001/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchSavedRecipes() {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  async function saveRecipe(recipeID) {
    try {
      const res = await axios.put(
        "http://localhost:3001/recipes",
        {
          userID,
          recipeID,
        },
        {
          headers: {
            authorisation: cookies.access_token,
          },
        },
      );
      setSavedRecipes(res.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {savedRecipes.includes(recipe._id) ? (
                <button disabled={true}>Saved</button>
              ) : (
                <button onClick={() => saveRecipe(recipe._id)}>Save</button>
              )}
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
