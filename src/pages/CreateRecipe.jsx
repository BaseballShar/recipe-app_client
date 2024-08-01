import RecipeForm from "../components/RecipeForm";

export default function CreateRecipe() {
  const emptyRecipe = {
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
  };

  return (
    <RecipeForm
      formMethod="post"
      formTitle="Create Recipe"
      formUrl="http://localhost:3001/recipes"
      initialFormData={emptyRecipe}
    />
  );
}
