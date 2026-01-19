import './App.css';
import { Page } from './components/layout/Page';
import DepartmentSection from './components/Department/DepartmentSection';
import type { Department } from './types/types';

const departments: Department[] = [
    {
        name: "Executive Management",
        employees: [
            { firstName: "Jane", lastName: "Doe" }, 
            { firstName: "Michael", lastName: "Jordan" }
        ]
    },
    {
        name: "Finance",
        employees: [
            { firstName: "Alice", lastName: "Johnson" },
            { firstName: "Bob", lastName: "Brown" }
        ]
    },
];

function App() {
    return (
        <Page>
            {departments.map((dept, index) => (
                <DepartmentSection key={index} dept={dept} />
            ))}
        </Page>
    );
}

export default App;