import { PrismaClient } from '@prisma/client';
import { initialDepartments } from '../src/data/initialData.js';
import { organizationData } from '../src/data/organizationData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Seed Departments and initial Employees
  for (const dept of initialDepartments) {
    const department = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: { name: dept.name },
    });

    for (const emp of dept.employees) {
      await prisma.employee.create({
        data: {
          firstName: emp.firstName,
          lastName: emp.lastName,
          departmentId: department.id,
        },
      });
    }
  }

  // 2. Seed Roles and Organization Employees
  for (const orgItem of organizationData) {
    // Upsert the Role first so we only create unique titles
    const role = await prisma.role.upsert({
      where: { title: orgItem.title },
      update: {},
      create: { title: orgItem.title },
    });

    // Create the employee and attach the Role ID
    await prisma.employee.create({
      data: {
        firstName: orgItem.firstName,
        lastName: orgItem.lastName,
        roleId: role.id,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });