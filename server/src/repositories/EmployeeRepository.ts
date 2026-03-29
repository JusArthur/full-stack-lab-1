import { PrismaClient } from '@prisma/client';
import type { Employee } from '../types/types.js';

// Initialize the Prisma Client
const prisma = new PrismaClient();

class EmployeeRepository {
  // Fetch departments directly from the database
  async getDepartments() {
    return await prisma.department.findMany({
      include: { employees: true },
    });
  }

  // Check if department exists in the DB
  async departmentExists(name: string): Promise<boolean> {
    const count = await prisma.department.count({
      where: { name },
    });
    return count > 0;
  }

  // Add the employee to the database linked to the department
  async addEmployee(departmentName: string, employee: Employee): Promise<void> {
    // First, find the department to get its internal database ID
    const dept = await prisma.department.findUnique({
      where: { name: departmentName },
    });
    
    if (dept) {
      // Create a new employee record and set the foreign key
      await prisma.employee.create({
        data: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          departmentId: dept.id,
        },
      });
    }
  }
}

export const employeeRepo = new EmployeeRepository();