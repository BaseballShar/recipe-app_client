import { useLocation } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
  const location = useLocation();
  const { prevRecipe } = location.state || {};

  return (
    <RecipeForm
      formMethod="put"
      formTitle="Edit Recipe"
      formUrl="http://localhost:3001/recipes/edit"
      initialFormData={prevRecipe}
    />
  );
}
