import { PrismaClient } from '@prisma/client';
import type { Employee } from '../types/types.js';

const prisma = new PrismaClient();

class EmployeeRepository {
  // Move the paginated fetch logic here
  async getDepartments(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [departments, totalCount] = await Promise.all([
      prisma.department.findMany({
        skip: skip,
        take: limit,
        include: {
          employees: {
            include: { role: true }
          }
        },
        orderBy: { id: 'asc' } 
      }),
      prisma.department.count()
    ]);

    return { departments, totalCount };
  }

  async departmentExists(name: string): Promise<boolean> {
    const count = await prisma.department.count({ where: { name } });
    return count > 0;
  }

  async addEmployee(departmentName: string, employee: Employee): Promise<boolean> {
    const dept = await prisma.department.findUnique({ where: { name: departmentName } });
    
    if (!dept) return false;

    await prisma.employee.create({
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        departmentId: dept.id,
      },
    });
    return true;
  }
}

export const employeeRepo = new EmployeeRepository();