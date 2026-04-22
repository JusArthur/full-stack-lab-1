import { employeeRepo } from '../repositories/EmployeeRepository.js';

export const employeeService = {
  getDepartments: async (page: number = 1, limit: number = 5) => {
    // Delegate the DB call to the repository
    const { departments, totalCount } = await employeeRepo.getDepartments(page, limit);

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
      // Delegate to repository
      const success = await employeeRepo.addEmployee(departmentName, employeeData);

      if (!success) {
        return { success: false, message: 'Department not found' };
      }

      return { success: true, message: 'Employee added successfully' };
    } catch (error) {
      return { success: false, message: 'Database error while adding employee' };
    }
  }
};