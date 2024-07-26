import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: window.localStorage.getItem("userID"),
  });

  const navigate = useNavigate();

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
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe created!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleFormUpdate} />
        <label htmlFor="ingredients">Ingredients</label>
        <button type="button" onClick={handleAddIngredient}>
          Add ingredient
        </button>
        {recipe.ingredients.map((_, idx) => (
          <input
            key={idx}
            type="text"
            onChange={(e) => handleUpdateIngredient(e, idx)}
          />
        ))}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleFormUpdate}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleFormUpdate}
        />
        <label htmlFor="cookingTime">Cooking Time (mins)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleFormUpdate}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
