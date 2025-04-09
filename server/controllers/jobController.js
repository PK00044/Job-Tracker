import Job from '../models/Job.js';

// Add job
export const addJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs); 
    
    res.status(500).json({ message: error.message });
  }
};


// Update job status
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
