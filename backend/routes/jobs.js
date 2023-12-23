const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
// const Job = require("../models/job");

const {
  createJobPosting,
  updateJobPosting,
  filterJobs,
  getJobPosting,
} = require("../controllers/jobsFns");

//creates a job posting
router.post("/jobposting", requireAuth, createJobPosting);

// get and updates a job posting
router
  .route("/:id")
  .get(requireAuth, getJobPosting)
  .patch(requireAuth, updateJobPosting);

//filter jobs based on skills
router.get("/", requireAuth, filterJobs);

module.exports = router;
