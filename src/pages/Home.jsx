import useRecipes from "../hooks/useRecipes.js";
import useSavedRecipeIDs from "../hooks/useSavedRecipeIDs.js";

export default function Home() {
  const recipes = useRecipes();
  const [savedRecipeIDs, updateSavedRecipeID] = useSavedRecipeIDs();

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {savedRecipeIDs.includes(recipe._id) ? (
                <button disabled={true}>Saved</button>
              ) : (
                <button onClick={() => updateSavedRecipeID(recipe._id)}>
                  Save
                </button>
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
