import { useReducer, useState } from "react";
import styles from "./register.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  password: "",
};
const formReducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "mobile":
      return { ...state, mobile: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reset":
      return initialState;
    // case "exists": return {...initialState, email:state.email} // user exists
    default:
      return state;
  }
};

function Register() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(false);
  const [exists, setExists] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted! registration ");
    const { name, email, password, mobile } = state;
    if (!name || !email || !password || !mobile || !consent) {
      setError(true);
    } else {
      setError(false);
      setExists(false);
      try {
        const response = await axios.post(
          "http://localhost:4000/api/register",
          state
        );

        console.log("response.status:", response);
        if (response.status === 201) {
          console.log("User created successfully!");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("recruiterName", response.data.recruiterName);
          dispatch({ type: "reset" });
          navigate('/')
        }
      } catch (error) {
        if (error?.response.status) {
          console.log("User exists:", error.response.data.message);
          document.querySelector("#email").classList.add(styles.error);
          setExists(true);
        }
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formsContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Create an account</h2>
            <p>Your personal job finder is here</p>
          </div>
          <div className="input">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={state.name}
                onChange={(e) => {
                  dispatch({ type: "name", payload: e.target.value });
                }}
                className={error && !state.name && styles.error}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={state.email}
                className={error && !state.email && styles.error}
                onChange={(e) => {
                  dispatch({ type: "email", payload: e.target.value });
                }}
              />
              {exists && (
                <p style={{ color: "red", fontSize: ".85rem" }}>
                  User with this email already exists
                </p>
              )}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Mobile"
                value={state.mobile}
                className={error && !state.mobile && styles.error}
                onChange={(e) => {
                  const inputText = e.target.value
                    .replace(/\D/g, ``)
                    .slice(0, 10);
                  dispatch({ type: "mobile", payload: inputText });
                }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={state.password}
                className={error && !state.password && styles.error}
                onChange={(e) => {
                  dispatch({ type: "password", payload: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={styles.consent}>
            <input
              type="checkbox"
              checked={consent}
              onClick={() => setConsent((prev) => !prev)}
            />
            <p style={{ color: error && !consent && "red" }}>
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
          </div>

          <button type="submit">Create Account</button>
        </form>
        <p className={styles.para}>
          Already have an account? <Link to='/login'><b>Sign in</b></Link>
        </p>
      </div>
      <div className={styles.imageContainer}>
        <h2>Your Personal Job Finder</h2>
      </div>
    </div>
  );
}

export default Register;
