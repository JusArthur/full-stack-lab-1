import type { Department, Employee } from '../types/types';
import { initialDepartments } from '../data/initialData';

class EmployeeRepository {
  private departments: Department[];

  constructor() {
    this.departments = [...initialDepartments];
  }

  getDepartments(): Department[] {
    return [...this.departments];
  }

  departmentExists(name: string): boolean {
    return this.departments.some((d) => d.name === name);
  }

  addEmployee(departmentName: string, employee: Employee): void {
    this.departments = this.departments.map((dept) => {
      if (dept.name === departmentName) {
        return {
          ...dept,
          employees: [...dept.employees, employee],
        };
      }
      return dept;
    });
  }
}

export const employeeRepo = new EmployeeRepository();