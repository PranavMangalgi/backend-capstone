import { useState } from "react";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);
  const [exists, setExists] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError(true);
    } else {
      setError(false);
      setExists(false);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/login",
          form
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("recruiterName", response.data.recruiterName);
          navigate("/");
        }
      } catch (e) {
        if (e.response.status === 401 || e.response.status === 500) {
          console.log("incorrect password");
          setIncorrect(true);
        }
        if (e.response.status === 404) {
          setExists(true);
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formsContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Already have an account?</h2>
            <p>Your personal job finder is here</p>
          </div>
          <div className="input">
            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={form.email}
                className={error && !form.email && styles.error}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setExists(false);
                  setIncorrect(false);
                }}
              />
              {exists && (
                <p style={{ color: "red", fontSize: ".85rem" }}>
                  No such user exists
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                id="password"
                className={error && !form.password && styles.error}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setIncorrect(false);
                }}
              />
              {incorrect && (
                <p style={{ color: "red", fontSize: ".85rem" }}>
                  Either email or password is incorrect
                </p>
              )}
            </div>
          </div>

          <button type="submit">Sign in</button>
        </form>
        <p className={styles.para}>
          {`Don't have an account?`}
          <Link to="/register">
            <b> Sign Up</b>
          </Link>
        </p>
      </div>
      <div className={styles.imageContainer}>
        <h2>Your Personal Job Finder</h2>
      </div>
    </div>
  );
}

export default Login;
