import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditRecipe() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevRecipe } = location.state || {};
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: prevRecipe.name,
    ingredients: prevRecipe.ingredients,
    instructions: prevRecipe.instructions,
    imageUrl: prevRecipe.imageUrl,
    cookingTime: prevRecipe.cookingTime,
    userOwner: window.localStorage.getItem("userID"),
  });

  function handleFormUpdate(event) {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  }

  function handleAddIngredient() {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  }

  function handleUpdateIngredient(event, idx) {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await axios.put(
        "http://localhost:3001/recipes/edit",
        { recipeID: prevRecipe._id, recipe },
        {
          headers: {
            authorisation: cookies.access_token,
          },
        },
      );
      alert("Recipe updated!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="create-recipe">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleFormUpdate}
        />
        <label htmlFor="ingredients">Ingredients</label>
        <button type="button" onClick={handleAddIngredient}>
          Add ingredient
        </button>
        {recipe.ingredients.map((_, idx) => (
          <input
            key={idx}
            type="text"
            value={recipe.ingredients[idx]}
            onChange={(e) => handleUpdateIngredient(e, idx)}
          />
        ))}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleFormUpdate}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleFormUpdate}
        />
        <label htmlFor="cookingTime">Cooking Time (mins)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleFormUpdate}
        />
        <button type="submit">Update</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}
