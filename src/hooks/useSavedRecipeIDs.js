import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function useSavedRecipeIDs() {
  const [savedRecipeIDs, setSavedRecipeIDs] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    async function fetchSavedRecipeIDs() {
      try {
        const res = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
        );
        setSavedRecipeIDs(res.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    }

    if (cookies.access_token) fetchSavedRecipeIDs();
  }, []);

  async function addSavedRecipeID(recipeID) {
    try {
      const res = await axios.put(
        "http://localhost:3001/recipes/save",
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
      setSavedRecipeIDs(res.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteSavedRecipeID(recipeID) {
    try {
      const res = await axios.put(
        "http://localhost:3001/recipes/unsave",
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
      setSavedRecipeIDs(res.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  }

  return [savedRecipeIDs, addSavedRecipeID, deleteSavedRecipeID];
}
