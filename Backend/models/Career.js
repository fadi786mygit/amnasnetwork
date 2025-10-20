// models/Career.js
const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    company: { 
      type: String, 
      required: true,
      trim: true
    },
    location: { 
      type: String, 
      required: true,
      trim: true
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "remote"],
      default: "full-time"
    },
    category: { 
      type: String, 
      required: true,
      default: "General"
    },
    salary: { 
      type: String,
      trim: true
    },
    description: { 
      type: String, 
      required: true 
    },
    requirements: { 
      type: [String], // Array of requirements
      default: []
    },
    responsibilities: { 
      type: [String], // Array of responsibilities
      default: []
    },
    benefits: { 
      type: [String], // Array of benefits
      default: []
    },
    applicationLink: { 
      type: String,
      trim: true
    },
    applicationEmail: { 
      type: String,
      trim: true
    },
    deadline: { 
      type: Date 
    },
    isActive: {
      type: Boolean,
      default: true
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "executive"],
      default: "mid"
    },
    tags: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

// Index for better search performance
careerSchema.index({ title: 'text', description: 'text', company: 'text' });
careerSchema.index({ category: 1, employmentType: 1, experienceLevel: 1 });
careerSchema.index({ isActive: 1, deadline: 1 });

const Career = mongoose.model("Career", careerSchema);
module.exports = Career;