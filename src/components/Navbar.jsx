import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  function handleLogout() {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      {!cookies.access_token ? (
        <Link to={"/auth"}>Login / Register</Link>
      ) : (
        <>
          <Link to={"/create-recipe"}>Create Recipe</Link>
          <Link to={"/saved-recipes"}>Saved Recipes</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
