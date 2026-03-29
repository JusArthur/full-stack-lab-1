import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class EmployeeRepository {
  async getDepartments() {
    // Fetch departments and include their related employees
    return await prisma.department.findMany({
      include: { employees: true },
    });
  }

  async departmentExists(name: string): Promise<boolean> {
    const count = await prisma.department.count({
      where: { name },
    });
    return count > 0;
  }

  async addEmployee(departmentName: string, employee: { firstName: string; lastName?: string }) {
    // Find the department to get its ID
    const dept = await prisma.department.findUnique({
      where: { name: departmentName },
    });
    
    if (dept) {
      // Create the employee linked to the department
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