
const connection = require('../database/connection');

module.exports = {
  async delete(req, res) {
    const {id} = req.params;
    const ongId = req.headers.ongId;

    const incident = await connection('incidents')
        .where('id', id)
        .select('ongId')
        .first();

    if (incident.ongId !== ongId) {
      return res.status(401).json({error: 'Operação Negada!'});
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  },

  async index(req, res) {
    const {paginaAtual = 1, registrosPorPagina = 5} = req.query;
    const [count] = await connection('incidents').count();

    res.header('X-Total-Count', count['count(*)']);

    return res.json(
        await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(registrosPorPagina)
            .offset((paginaAtual - 1) * registrosPorPagina)
            .select([
              'incidents.*',
              'ongs.name',
              'ongs.email',
              'ongs.whatsapp',
              'ongs.city',
              'ongs.uf',
            ]),
    );
  },

  async create(req, res) {
    const {title, description, value} = req.body;

    const ongId = req.headers.ong_id;

    const [id] = await connection('incidents').insert({
      title: title,
      description: description,
      value: value,
      ong_id: ongId,
    });

    return res.json({id});
  },
};
