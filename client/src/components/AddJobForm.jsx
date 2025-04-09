import { useState } from 'react';
import axios from 'axios';

const AddJobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData); // 🔁 Adjust backend URL if needed
      setFormData({ company: '', role: '', status: 'Applied', appliedDate: '', link: '' });
      onJobAdded(); // 📢 Notify parent to reload jobs
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} required />
      <input name="link" placeholder="Application Link" value={formData.link} onChange={handleChange} />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJobForm;
