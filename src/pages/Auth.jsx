import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

function Login() {
  const [accountData, setAccountData] = useState({
    username: "",
    password: "",
  });

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        accountData,
      );
      alert("Login successful!");
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AccountForm
      title="Login"
      accountData={accountData}
      setAccountData={setAccountData}
      handleSubmit={handleSubmit}
    />
  );
}

function Register() {
  const [accountData, setAccountData] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(event) {
    // Prevent stupidly clearing my console!
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", accountData);
      alert("Registeration successful! Please proceed to login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AccountForm
      title="Register"
      accountData={accountData}
      setAccountData={setAccountData}
      handleSubmit={handleSubmit}
    />
  );
}

function AccountForm({ title, accountData, setAccountData, handleSubmit }) {
  const handleFormUpdate = (event) => {
    setAccountData({ ...accountData, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={accountData.username}
              onChange={handleFormUpdate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={accountData.password}
              onChange={handleFormUpdate}
            />
          </div>
        </div>
        <button type="submit">{title}</button>
      </form>
    </div>
  );
}
