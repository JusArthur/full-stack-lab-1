export interface Employee {
    firstName: string;
    lastName?: string;
}

export interface Department {
    name: string;
    employees: Employee[];
}

// Role interface
export interface Role {
    firstName: string;
    lastName: string;
    title: string;
}