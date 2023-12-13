const mongoose = require("mongoose");
const jobPostSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  recruiterName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: { type: String, required: true },
  jobType: { type: String, enum: ["Full-time", "Part-time"], required: true },
  remote: { type: String, enum: ["Remote", "Office"], required: true },
  location: { type: String, required: true },
  companyInfo: { type: String, required: true },
  skills: { type: [String], required: true },
  information: { type: String, required: true },
  createdAt: { type: Date, immutable: true, default: Date.now },
});

module.exports = mongoose.model("Job", jobPostSchema);
