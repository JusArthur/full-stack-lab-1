import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OrganizationRepository {
  async getRoles() {
    return await prisma.role.findMany({
      include: { employees: true },
    });
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