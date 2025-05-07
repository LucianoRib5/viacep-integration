import axios from 'axios';
import { prisma } from '../database/client';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  ddd?: string;
  siafi?: string;
}

export const syncViaCepData = async () => {
  try {
    const response = await axios.get<ViaCepResponse[]>(
      'https://viacep.com.br/ws/RS/Porto%20Alegre/Domingos/json/'
    );

    const data = response.data;

    for (const cep of data) {
      await prisma.cep.upsert({
        where: { cep: cep.cep },
        update: {},
        create: {
          cep: cep.cep,
          logradouro: cep.logradouro,
          complemento: cep.complemento || '',
          bairro: cep.bairro,
          localidade: cep.localidade,
          uf: cep.uf,
          ibge: cep.ibge,
          ddd: cep.ddd,
          siafi: cep.siafi
        }
      });
    }

    console.log(`Sincronização concluída: ${data.length} registros processados`);
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
};
