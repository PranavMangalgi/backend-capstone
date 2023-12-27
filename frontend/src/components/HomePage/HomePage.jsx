import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./homepage.module.scss";
import recruiterImg from "../../assets/recr-image.png";
import searchIcon from "../../assets/search-icon.png";
import downIcon from "../../assets/down_vector.png";
import { IoAddOutline } from "react-icons/io5";
import peopleLogo from "../../assets/people_logo.png";
import flagLogo from "../../assets/flag.png";

import axios from "axios";
function MainPage() {
  const [jobs, setJobs] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputSkills, setInputSkills] = useState("");
  const navigate = useNavigate();
  const auth =
    localStorage.getItem("token") && localStorage.getItem("recruiterName");
  useEffect(() => {
    (async () => {
      try {
        if (selectedSkills.length > 0) {
          const response = await axios.get(
            `https://jobfinder-0qep.onrender.com/jobs/filter/${selectedSkills.toString()}`,
          );
          setJobs(response.data.message);
        } else {
          const response = await axios.get("https://jobfinder-0qep.onrender.com/jobs/");
          setJobs(response.data.message);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [selectedSkills]);

  return (
    <>
      <div className={styles.container}>
        <nav>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Jobfinder
          </div>
          <div className={styles.navBtns}>
            {auth ? (
              <div className={styles.loggedIn}>
                <p
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Logout
                </p>
                <div>
                  Hello {localStorage.getItem("recruiterName")}
                  <img src={recruiterImg} alt="no-image" />
                </div>
              </div>
            ) : (
              <>
                <button
                  className={styles.loginBtn}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className={styles.registerBtn}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </nav>
        <div className={styles.searchSection}>
          <div className={styles.inputDetails}>
            <div style={{ postion: "relative" }} className={styles.imgDiv}>
              <img src={searchIcon} alt="" />
            </div>
            <input
              type="text"
              placeholder="Type any job title"
              value={inputSkills}
              onChange={(e) => setInputSkills(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const trimmedSkill = inputSkills.trim();
                  if (trimmedSkill !== "") {
                    setSelectedSkills((prevSelectedSkills) => {
                      const lower = [...prevSelectedSkills, trimmedSkill].map(
                        (skill) => skill.toLowerCase()
                      );
                      const skills = [...new Set(lower)];
                      return skills;
                    });
                    setInputSkills("");
                  }
                }
              }}
            />
          </div>
          <div className={styles.skillSection}>
            <div className={styles.skillsDiv}>
              <div>skills</div> <img src={downIcon} alt="" />
            </div>

            <div className={styles.showSelectedSkills}>
              {selectedSkills.length > 0 &&
                selectedSkills.map((skill, idx) => {
                  return (
                    <>
                      <div className={styles.skill} key={idx}>
                        <div className={styles.skillContent}>{skill}</div>
                        <div
                          className={styles.crossLogo}
                          onClick={() => {
                            setSelectedSkills((prevSelectedSkills) => {
                              const prevSkills = [...prevSelectedSkills];
                              prevSkills.splice(idx, 1);
                              return prevSkills;
                            });
                          }}
                        >
                          X
                        </div>
                      </div>
                    </>
                  );
                })}
              {selectedSkills.length > 0 && (
                <div
                  className={styles.clear}
                  onClick={() => setSelectedSkills([])}
                >
                  Clear
                </div>
              )}
            </div>

            {auth && (
              <div className={styles.buttonDiv}>
                <button type="submit" onClick={() => navigate("/addjob")}>
                  <div>
                    <IoAddOutline />
                  </div>
                  <div style={{ alignSelf: "center" }}> Add Job</div>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.jobs}>
          {jobs &&
            jobs.map((job,idx) => {
              return (
                <>
                  <div className={styles.job} key={idx}>
                    <div className={styles.jobContent}>
                      <div>
                        <img
                          src={job.logo}
                          alt="no-image"
                          className={styles.compnayLogo}
                        />
                      </div>
                      <div className={styles.jobDesc}>
                        <h4>{job.position}</h4>
                        <div className={styles.payLocation}>
                          <div>
                            <img src={peopleLogo} alt="" />
                            11-50
                          </div>
                          <div>₹ {job.salary}</div>
                          <div className={styles.location}>
                            <img
                              src={flagLogo}
                              style={{ height: "4vh" }}
                              alt=""
                            />{" "}
                            <div>{job.location}</div>
                          </div>
                        </div>
                        <div className={styles.remote}>
                          <div>{job.remote}</div>
                          <div>{job.jobType}</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.requirements}>
                      <div className={styles.skills}>
                        {job?.skills.map((skill) => {
                          return (
                            <>
                              <div className={styles.skill}>
                                <div className={styles.skillContent}>
                                  {skill}
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                      <div className={styles.jobBtns}>
                        {auth&&<button
                          className={styles.editBtn}
                          onClick={() => navigate(`/addjob/${job._id}`)}
                        >
                          Edit job
                        </button>}
                        <button
                          className={styles.viewBtn}
                          onClick={() => navigate(`/job/${job._id}`)}
                        >
                          View job
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default MainPage;
