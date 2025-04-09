import { useEffect, useState } from 'react';
import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api/jobs';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: '',
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch("https://job-tracker-o3gi.onrender.com/api/jobs");
      const data = await res.json();
  
      if (!Array.isArray(data)) {
        console.error("Backend returned non-array:", data);
        return;
      }
  
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(BASE_URL, form);

    setForm({ company: '', role: '', status: 'Applied', appliedDate: '', link: '' });
    fetchJobs();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${BASE_URL}/${id}`, { status });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-100 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">🎯 Student Job Tracker</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-6 mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Company</label>
              <input
                type="text"
                placeholder="Eg: Google"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Role</label>
              <input
                type="text"
                placeholder="Eg: SDE Intern"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Applied Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.appliedDate}
                onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Application Link</label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
          >
            ➕ Add Job
          </button>
        </form>

        {/* Job List */}
        <div className="grid sm:grid-cols-2 gap-6">
        {Array.isArray(jobs) && jobs.map((job) => (

            <div key={job._id} className="bg-white shadow rounded-lg p-5 space-y-2 border">
              <h2 className="text-xl font-bold text-gray-800">{job.company}</h2>
              <p className="text-gray-600">{job.role}</p>
              <p className="text-sm text-gray-500">📅 {new Date(job.appliedDate).toLocaleDateString()}</p>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Job Posting
              </a>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Status: {job.status}
                </span>
                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job._id, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="ml-auto text-red-500 hover:text-red-700 text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
