// import React from 'react'
import styles from "./viewjob.module.scss";
import stipendLogo from "../../assets/stipend_logo.png";
import calendarImg from "../../assets/calendar_img.png";
import { useEffect, useState } from "react";
import recruiterImg from "../../assets/recr-image.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function ViewJob() {
  const { id } = useParams();
  const [job, setJob] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://jobfinder-0qep.onrender.com/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJob(response.data.message);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  function createdTime(time) {
    if (!time) {
      return;
    } else {
      const currentDate = new Date();
      const isoDate = new Date(time);
      const timeDifference = Math.abs(
        isoDate.getTime() - currentDate.getTime()
      );

      const hoursDifference = Math.floor(timeDifference / (1000 * 3600));
      const minutesDifference = Math.floor(
        (timeDifference % (1000 * 3600)) / (1000 * 60)
      );
      const secondsDifference = Math.floor(
        (timeDifference % (1000 * 60)) / 1000
      );

      if (hoursDifference >= 24) {
        const daysDifference = Math.floor(hoursDifference / 24);
        return `${daysDifference} ${daysDifference === 1 ? "day" : "days"}`;
      } else if (hoursDifference > 0) {
        return `${hoursDifference}h`;
      } else if (minutesDifference > 0) {
        return `${minutesDifference}m`;
      } else {
        return `${secondsDifference}s`;
      }
    }
  }

  const auth =
    localStorage.getItem("token") && localStorage.getItem("recruiterName");
  return (
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
                  localStorage.removeItem("recruiterName");
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
      <h1>
        {job.position} {job.remote} job at {job.companyName}
      </h1>

      <div className={styles.info}>
        <div className={styles.jobType}>
          <div>{createdTime(job.createdAt)}</div>
          <div style={{ position: "relative", bottom: ".3rem" }}>.</div>
          <div>{job.remote}</div>
          <img src={job.logo} alt="" />
        </div>
        <div>
          <div className={styles.editBtnDiv}>
            <h1>{job.position}</h1>
            {auth && (
              <button
                onClick={() => {
                  navigate(`/addjob/${id}`);
                }}
              >
                Edit job
              </button>
            )}
          </div>
          <div className={styles.location}>{job.location}</div>
        </div>
        <div className={styles.stipendDuration}>
          <div className="stipend">
            <div className={styles.stipendFirst}>
              <img src={stipendLogo} alt="no-logo" /> <span>Stipend</span>
            </div>
            <div>Rs {job.salary}/month</div>
          </div>
          <div className="duation">
            <div>
              <img src={calendarImg} alt="no-img" /> <span>Duration</span>
            </div>
            <div>6 months</div>
          </div>
        </div>
        <div>
          <h3>About company</h3>
          <p>{job.companyInfo}</p>
          <h3>About the job/internship</h3>
          <p>{job.jobDescription}</p>
          <h3>Skill(s) required</h3>
          <div className={styles.skills}>
            {job.skills?.map((skill) => (
              <div key={skill} className={styles.skill}>
                {skill}
              </div>
            ))}
          </div>
          <h3>Additional Information</h3>
          <p>{job.information}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewJob;
