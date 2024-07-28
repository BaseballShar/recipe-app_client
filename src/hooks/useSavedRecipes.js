import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function useSavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    async function fetchSavedRecipes() {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
        );
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    }

    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  async function updateSavedRecipe(recipeID) {
    try {
      const res = await axios.put(
        "http://localhost:3001/recipes",
        {
          userID,
          recipeID,
        },
        {
          headers: {
            authorisation: cookies.access_token,
          },
        },
      );
      setSavedRecipes(res.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  }

  return [savedRecipes, updateSavedRecipe];
}
