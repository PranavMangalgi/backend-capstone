import { useEffect, useReducer, useState } from "react";
import styles from "./addjob.module.scss";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
  companyName: "",
  recruiterName: localStorage.getItem("recruiterName"),
  logo: "",
  position: "",
  salary: "",
  jobType: "",
  remote: "",
  location: "",
  companyInfo: "",
  skills: "",
  information: "",
  jobDescription: "",
};
const formReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { ...state, [action.payload.field]: action.payload.value };
    case "reset":
      return initialState;
    case "update state":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
function Addjob() {
  const { id } = useParams();

  const [state, dispatch] = useReducer(formReducer, initialState);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await axios.get(`http://localhost:4000/jobs/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log(response.data.message);
          const jobData = response.data.message;

          dispatch({ type: "update state", payload: jobData });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [id]);

  useEffect(() => {
    console.log("initialstate;", initialState);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted! job");
    // code
    const {
      companyName,
      logo,
      position,
      salary,
      jobType,
      remote,
      location,
      companyInfo,
      skills,
      information,
      jobDescription,
    } = state;
    if (
      !companyName ||
      !logo ||
      !position ||
      !salary ||
      !jobType ||
      !remote ||
      !location ||
      !companyInfo ||
      !skills ||
      !information ||
      !jobDescription
    ) {
      setError(true);
    } else {
      setError(false);

      try {
        if (id) {
          const response = await axios.patch(
            `http://localhost:4000/jobs/${id}`,
            {...state, skills:state.skills.toString()},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.status == 200) {
            console.log(" job updated!");

            navigate(`/job/${id}`);
            // navigate(-1);
          }
        } else {
          const response = await axios.post(
            "http://localhost:4000/jobs/jobposting",
            state,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 201) {
            console.log(" job created!");
            dispatch({ type: "reset" });
            navigate("/");
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    console.log(state.skills);
  }, [state.skills]);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Add job description</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name here"
              value={state.companyName}
              className={error && !state.companyName && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "companyName", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label>Add logo URL</label>
            <input
              type="text"
              placeholder="Enter the link"
              value={state.logo}
              className={error && !state.logo && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "logo", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label>Job position</label>
            <input
              type="text"
              placeholder="Enter job position"
              value={state.position}
              className={error && !state.position && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "position", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label>Monthly salary</label>
            <input
              type="text"
              placeholder="Enter Amount in rupees"
              value={state.salary}
              className={error && !state.salary && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "salary", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label htmlFor="jobtype">Job Type</label>
            <select
              name="jobType"
              id="jobType"
              value={state.jobType}
              className={error && !state.jobType && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "jobType", value: e.target.value },
                })
              }
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
          <div>
            <label htmlFor="remote/office">Remote/office</label>
            <select
              name="remote/office"
              id="remote/office"
              value={state.remote}
              className={error && !state.remote && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "remote", value: e.target.value },
                })
              }
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              value={state.location}
              className={error && !state.location && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "location", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label>Job Description</label>
            <input
              type="text"
              placeholder="Type the job description"
              value={state.jobDescription}
              className={error && !state.jobDescription && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "jobDescription", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label>About Company</label>
            <input
              type="text"
              placeholder="Type about your company"
              value={state.companyInfo}
              className={error && !state.companyInfo && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "companyInfo", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label>Skills Required</label>
            <input
              type="text"
              placeholder="Enter the must have skills"
              value={state.skills.toString()}
              className={error && !state.skills && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "skills", value: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label>Information</label>
            <input
              type="text"
              placeholder="Enter the additional information"
              value={state.information}
              className={error && !state.information && styles.error}
              onChange={(e) =>
                dispatch({
                  type: "update",
                  payload: { field: "information", value: e.target.value },
                })
              }
            />
          </div>
          <div className={styles.buttonDiv}>
            <button
              onClick={() => {
                dispatch({ type: "reset" });
                navigate(-1); //may have to change here
              }}
            >
              Cancel
            </button>
            <button type="submit">
              <div>
                <IoAddOutline />
              </div>
              <div style={{ alignSelf: "center" }}> Add Job</div>
            </button>
          </div>
        </form>
      </div>
      <div className={styles.imageContainer}></div>
    </div>
  );
}

export default Addjob;
