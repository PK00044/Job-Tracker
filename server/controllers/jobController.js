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

export const getJobs = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (date) {
      // Match only the date part (ignoring time)
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      filter.appliedDate = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    const jobs = await Job.find(filter).sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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
