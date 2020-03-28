
const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(req, res) {
    const {paginaAtual = 1, registroPorPagina = 5} = req.query;
    const [count] = await connection('ongs').count();

    res.header('X-Total-Count', count['count(*)']);

    return res.json(
        await connection('ongs')
            .limit(registroPorPagina)
            .offset((paginaAtual - 1) * registroPorPagina)
            .select('*'),
    );
  },

  async create(req, res) {
    const {name, email, whatsapp, city, uf} = req.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({id});
  },
};
