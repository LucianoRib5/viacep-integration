import request from 'supertest';
import app from '../app';
import { prisma } from '../database/client';

const cepMock = {
  cep: '12345-678',
  logradouro: 'Rua Teste',
  complemento: '',
  bairro: 'Bairro Teste',
  localidade: 'Cidade Teste',
  uf: 'RS',
  ibge: '0000000',
  ddd: '11',
  siafi: '1234'
};

beforeAll(async () => {
  await prisma.cep.upsert({
    where: {
      cep: cepMock.cep
    },
    update: {},
    create: {
      ...cepMock,
      favorito: false
    }
  });
});

afterAll(async () => {
  await prisma.cep.delete({
    where: {
      cep: cepMock.cep
    }
  });

  await prisma.$disconnect();
});

describe('GET /ceps/:cep', () => {
  it('should return a cep by param', async () => {
    const res = await request(app).get(`/ceps/${cepMock.cep}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('cep', cepMock.cep);
  });

  it('should return 400 for invalid cep format', async () => {
    const res = await request(app).get(`/ceps/123`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 for non-existent cep', async () => {
    const res = await request(app).get(`/ceps/99999-999`);
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /ceps', () => {
  it('should return all ceps', async () => {
    const res = await request(app).get('/ceps');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('POST /ceps/:cep/favorite', () => {
  it('should favorite a cep', async () => {
    const res = await request(app).post(`/ceps/${cepMock.cep}/favorite`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'CEP favorited successfully.');
  });

  it('should unfavorite the same cep', async () => {
    const res = await request(app).post(`/ceps/${cepMock.cep}/favorite`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'CEP unfavorited successfully.');
  });
});

describe('PUT /ceps/:cep', () => {
  it('should update street and neighborhood', async () => {
    const res = await request(app)
      .put(`/ceps/${cepMock.cep}`)
      .send({ street: 'Nova Rua', neighborhood: 'Novo Bairro' });

    expect(res.statusCode).toBe(200);
    expect(res.body.logradouro).toBe('Nova Rua');
    expect(res.body.bairro).toBe('Novo Bairro');
  });

  it('should return 400 for invalid body', async () => {
    const res = await request(app)
      .put(`/ceps/${cepMock.cep}`)
      .send({ street: '', neighborhood: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error.body');
  });
});
