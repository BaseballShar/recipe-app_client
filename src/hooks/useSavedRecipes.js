import axios from "axios";
import { useEffect, useState } from "react";

export default function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    async function fetchSavedRecipes() {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`,
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSavedRecipes();
  }, []);

  return savedRecipes;
}
