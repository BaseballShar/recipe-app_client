import useRecipes from "../hooks/useRecipes.js";
import useSavedRecipeIDs from "../hooks/useSavedRecipeIDs.js";

export default function Home() {
  const recipes = useRecipes();
  const [savedRecipeIDs, updateSavedRecipeID] = useSavedRecipeIDs();

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
              <button disabled={true}>Saved</button>
            ) : (
              <button onClick={() => updateSavedRecipeID(recipe._id)}>
                Save
              </button>
            )}
            <p>Instructions: {recipe.instructions}</p>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>

            <p>Cooking Time: {recipe.cookingTime} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
