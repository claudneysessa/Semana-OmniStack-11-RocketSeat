/* eslint-disable linebreak-style */

const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll( async ()=>{
    await connection.destroy();
  });

  it('Criar uma nova ONG', async ()=>{
    const response = await request(app)
        .post('/ongs')
        .send({
          name: 'Patinhas Carentes',
          email: 'patinhascarentes@gmail.com',
          whatsapp: '27999677326',
          city: 'vitória',
          uf: 'ES',
        });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
