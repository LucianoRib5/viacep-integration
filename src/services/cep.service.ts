import { NotFoundError } from '../exceptions/custom';
import { BasicAddressInfo } from '../interfaces/basicAddressInfo.interface';
import { CepRepository } from '../repositories/cep.repository';

export class CepService {
  private readonly cepRepository: CepRepository;

  constructor() {
    this.cepRepository = new CepRepository();
  }

  async getCep(cep: string) {
    try {
      const cepData = await this.cepRepository.findByCep(cep);

      if (!cepData) {
        throw new NotFoundError('CEP not found');
      }
  
      return cepData;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred while fetching the CEP');
      }   
    }
  }

  async getAllCeps() {
    try {
      const ceps = await this.cepRepository.findAll();

      if (ceps.length === 0) {
        throw new NotFoundError('No CEPs found');
      }
  
      return ceps;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred while fetching all CEPs');
      }
    }
  }

  async favoriteOrUnfavoriteCep(cep: string) {
    try {
      const cepData = await this.getCep(cep);
  
      if (cepData?.favorito) {
        await this.cepRepository.updateFavoriteStatus(cep, false);
        return { message: 'CEP unfavorited successfully.' };
      } else {
        await this.cepRepository.updateFavoriteStatus(cep, true);
        return { message: 'CEP favorited successfully.' };
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(cep: string, address: BasicAddressInfo) {
    try {
      await this.getCep(cep);
      const updatedAddress = await this.cepRepository.updateAddress(cep, address);
      return updatedAddress;
    } catch (error) {
      throw error;
    }
  }
}
