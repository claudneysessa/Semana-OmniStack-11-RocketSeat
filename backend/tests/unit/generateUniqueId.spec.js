/* eslint-disable linebreak-style */

const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Geração do ID único', () => {
  it('Tamanho do ID gerado deve ter 8 caracteres', () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
