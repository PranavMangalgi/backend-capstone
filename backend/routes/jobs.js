const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
// const Job = require("../models/job");

const {
  createJobPosting,
  updateJobPosting,
  filterJobs,
  getJobPosting,
  getAllJobs,
} = require("../controllers/jobsFns");

//gets all the jobs
router.get("/", getAllJobs);

//creates a job posting
router.post("/jobposting", requireAuth, createJobPosting);

// get and updates a job posting
router
  .route("/:id")
  .get(requireAuth, getJobPosting)
  .patch(requireAuth, updateJobPosting);

//filter jobs based on skills
router.get("/filter/:skills", filterJobs);

module.exports = router;
