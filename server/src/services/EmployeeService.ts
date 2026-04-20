import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const employeeService = {
  getDepartments: async (page: number = 1, limit: number = 5) => {
    const skip = (page - 1) * limit;

    // Run count and fetch concurrently for better performance
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

    return {
      data: departments,
      meta: {
        totalItems: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        itemsPerPage: limit
      }
    };
  },

  addEmployee: async (departmentName: string, employeeData: any) => {
    try {
      const department = await prisma.department.findUnique({
        where: { name: departmentName }
      });

      if (!department) {
        return { success: false, message: 'Department not found' };
      }

      await prisma.employee.create({
        data: {
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          departmentId: department.id,
        }
      });

      return { success: true, message: 'Employee added successfully' };
    } catch (error) {
      return { success: false, message: 'Database error while adding employee' };
    }
  }
};