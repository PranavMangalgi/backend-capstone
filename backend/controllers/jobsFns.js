const Job = require("../models/job");

const createJobPosting = async (req, res, next) => {
  try {
    const {
      companyName,
      recruiterName,
      logo,
      position,
      salary,
      jobType,
      remote,
      location,
      companyInfo,
      skills,
      jobDescription,
      information,
    } = req.body;

    let skillsArr = [];
    if (typeof skills === "string") {
      skillsArr = skills.split(",").map((skill) => skill.trim());
    }

    const newJobPost = await Job.create({
      companyName,
      recruiterName,
      logo,
      position,
      salary,
      jobType,
      remote,
      location,
      companyInfo,
      skills: skillsArr,
      jobDescription,
      information,
    });
    await newJobPost.save();
    res
      .status(201)
      .json({ status: "SUCCESS", message: "Job posting created!" });
  } catch (e) {
    next(e);
  }
};

const updateJobPosting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Job post not found!" });
    }
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
      jobDescription,
      information,
    } = req.body;

    job.companyName = companyName;
    job.logo = logo;
    job.position = position;
    job.jobDescription = jobDescription;
    job.salary = salary;
    job.jobType = jobType;
    job.remote = remote;
    job.location = location;
    job.companyInfo = companyInfo;
    job.information = information;

    let skillsArr = [];
    if (typeof skills === "string") {
      skillsArr = skills.split(",").map((skill) => skill.trim());
    }
    job.skills = skillsArr;

    await job.save();
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Job posting updated!" });
  } catch (e) {
    next(e);
  }
};

const getJobPosting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Job post not found!" });
    }

    res.status(200).json({ status: "SUCCESS", message: job });
  } catch (e) {
    next(e);
  }
};

const filterJobs = async (req, res, next) => {
  try {
    const { skills } = req.params;
    let skillsCopy = [];
    if (typeof skills === "string") {
      skillsCopy = skills.split(",").map((skill) => skill.trim());
    }
    const jobs = await Job.find({ skills: { $in: skillsCopy } });
    if (jobs) {
      res.status(200).json({ status: "success", message: jobs });
    } else {
      res.status(204).json({ status: "NO RECORD", message: "No such record" });
    }
  } catch (e) {
    next(e);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({});
    if (!jobs) {
      res.json({ status: "ERROR", message: "no jobs in db" });
    }
    res.status(200).json({ status: "SUCCESS", message: jobs });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateJobPosting,
  createJobPosting,
  filterJobs,
  getJobPosting,
  getAllJobs,
};
