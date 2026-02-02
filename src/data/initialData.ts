import type { Department } from '../types/types';

export const initialDepartments: Department[] = [
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