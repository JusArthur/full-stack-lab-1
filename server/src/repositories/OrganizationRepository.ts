import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OrganizationRepository {
  async getRoles(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [roles, totalCount] = await Promise.all([
      prisma.role.findMany({
        skip,
        take: limit,
        include: { employees: true },
        orderBy: { title: 'asc' } 
      }),
      prisma.role.count()
    ]);

    return { roles, totalCount };
  }

  async roleExists(title: string): Promise<boolean> {
    const role = await prisma.role.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive',
        },
      },
    });
    return role !== null;
  }

  async addRole(role: { title: string }): Promise<void> {
    await prisma.role.create({
      data: {
        title: role.title,
      },
    });
  }
}

export const organizationRepo = new OrganizationRepository();