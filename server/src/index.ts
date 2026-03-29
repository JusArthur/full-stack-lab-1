import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON payloads

app.use('/api/employees', employeeRoutes);
app.use('/api/organization', organizationRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Back-end running on http://localhost:${PORT}`);
  });
}

export default app;