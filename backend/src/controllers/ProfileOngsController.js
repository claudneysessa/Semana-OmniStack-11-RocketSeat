
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const {paginaAtual = 1, registrosPorPagina = 5} = req.query;
    const ongId = req.headers.ong_id;

    const incidents = await connection('incidents')
        .where('ong_id', ongId)
        .limit(registrosPorPagina)
        .offset((paginaAtual - 1) * registrosPorPagina)
        .select('*');

    return res.json(incidents);
  },
};
