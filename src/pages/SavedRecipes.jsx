import useSavedRecipes from "../hooks/useSavedRecipes.js";

export default function SavedRecipe() {
  const savedRecipes = useSavedRecipes();

  return (
    <div className="master-container">
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <h2>{recipe.name}</h2>
            <div className="text-center">
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <p>Instructions: {recipe.instructions}</p>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>

            <p>Cooking Time: {recipe.cookingTime} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
