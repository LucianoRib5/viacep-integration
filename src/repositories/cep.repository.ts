import { prisma } from '../database/client';
import { BasicAddressInfo } from '../interfaces/basicAddressInfo.interface';

export class CepRepository {
  async findByCep(cep: string) {
    return await prisma.cep.findUnique({
      where: { cep },
    });
  }

  async findAll() {
    return await prisma.cep.findMany();
  }

  async updateFavoriteStatus (cep: string, isFavorited: boolean) {
    return await prisma.cep.update({
      where: { cep },
      data: { favorito: isFavorited },
    });
  };

  async updateAddress(cep: string, address: BasicAddressInfo) {
    return await prisma.cep.update({
      where: { cep },
      data: {
        logradouro: address.street,
        bairro: address.neighborhood,
      },
    });
  }
}
