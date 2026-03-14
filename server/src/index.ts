import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import organizationRoutes from './routes/organizationRoutes';

const app = express();
const PORT = 3000;

app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON payloads

app.use('/api/employees', employeeRoutes);
app.use('/api/organization', organizationRoutes);

app.listen(PORT, () => {
  console.log(`Back-end running on http://localhost:${PORT}`);
});