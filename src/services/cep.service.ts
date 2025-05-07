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
}
