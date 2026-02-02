import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/employees" replace />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/organization" element={<OrganizationPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;