import { CepRepository } from '../repositories/cep.repository';

export class CepService {
  private readonly cepRepository: CepRepository;

  constructor() {
    this.cepRepository = new CepRepository();
  }

  async getCep(cep: string) {
    const cepData = await this.cepRepository.findByCep(cep);

    if (!cepData) {
      throw new Error('CEP not found');
    }

    return cepData;
  }

  async getAllCeps() {
    const ceps = await this.cepRepository.findAll();

    if (!ceps) {
      throw new Error('No CEPs found');
    }

    return ceps;
  }

  async favoriteOrUnfavoriteCep(cep: string) {
    const existing = await this.cepRepository.findByCep(cep);

    if (!existing) {
      throw new Error('CEP not found');
    }
  
    if (existing.favorito) {
      await this.cepRepository.updateFavoriteStatus(cep, false);
      return { message: 'CEP unfavorited successfully.' };
    } else {
      await this.cepRepository.updateFavoriteStatus(cep, true);
      return { message: 'CEP favorited successfully.' };
    }
  };
}
