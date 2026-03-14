import type { Department, Employee } from '../types/types.js';
import { initialDepartments } from '../data/initialData.js';

class EmployeeRepository {
  private departments: Department[] = [...initialDepartments];

  getDepartments(): Department[] {
    return this.departments;
  }

  departmentExists(name: string): boolean {
    return this.departments.some((d) => d.name === name);
  }

  addEmployee(departmentName: string, employee: Employee): void {
    const dept = this.departments.find(d => d.name === departmentName);
    if (dept) {
      dept.employees.push(employee);
    }
  }
}

export const employeeRepo = new EmployeeRepository();