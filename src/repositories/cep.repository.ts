import { prisma } from '../database/client';

export class CepRepository {
  async findByCep(cep: string) {
    return await prisma.cep.findUnique({
      where: { cep },
    });
  }

  async findAll() {
    return await prisma.cep.findMany();
  }
}
