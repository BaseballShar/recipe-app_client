import axios from "axios";
import { useEffect, useState } from "react";

// Hook to manage and fetch recipes
export default function useRecipes() {
  const [recipe, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await axios.get("http://localhost:3001/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecipes();
  }, []);

  return recipe;
}
