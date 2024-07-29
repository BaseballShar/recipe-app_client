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
      <Link className="link" to={"/"}>
        Home
      </Link>
      {!cookies.access_token ? (
        <Link className="link" to={"/auth"}>
          Login / Register
        </Link>
      ) : (
        <>
          <Link className="link" to={"/create-recipe"}>
            Create Recipe
          </Link>
          <Link className="link" to={"/saved-recipes"}>
            Saved Recipes
          </Link>
          <span className="link" onClick={handleLogout}>
            Logout
          </span>
        </>
      )}
    </div>
  );
}
