import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    required: true
  },
  appliedDate: {
    type: Date,
    required: true
  },
  
}, { timestamps: true });

export default model('Job', jobSchema);
