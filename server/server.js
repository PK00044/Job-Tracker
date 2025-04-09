import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes.js'; // ✅ Your route file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ MOUNT ROUTES HERE
app.use('/api/jobs', jobRoutes);

// ✅ Optional: simple root route for testing
app.get('/', (req, res) => {
  res.send('🚀 Job Tracker backend is live!');
});

// ✅ Start server
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
