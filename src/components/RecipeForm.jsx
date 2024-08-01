import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeForm({
  formMethod,
  formTitle,
  formUrl,
  initialFormData,
}) {
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: initialFormData.name,
    ingredients: initialFormData.ingredients,
    instructions: initialFormData.instructions,
    imageUrl: initialFormData.imageUrl,
    cookingTime: initialFormData.cookingTime,
    userOwner: window.localStorage.getItem("userID"),
  });

  function handleFormUpdate(event) {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  }

  function handleAddIngredient() {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  }

  function handleDeleteIngredient() {
    const ingredients = [...recipe.ingredients];
    if (ingredients.length >= 2) {
      ingredients.pop();
      setRecipe({ ...recipe, ingredients });
    }
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
      await axios({
        method: formMethod,
        url: formUrl,
        data: {
          recipeID: initialFormData._id,
          recipe,
        },
        headers: {
          authorisation: cookies.access_token,
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="create-recipe">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleFormUpdate}
        />
        <div className="flex-row-start">
          <label htmlFor="ingredients">Ingredients</label>
          <button type="button" onClick={handleAddIngredient}>
            Add
          </button>
          <button type="button" onClick={handleDeleteIngredient}>
            Delete
          </button>
        </div>
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
