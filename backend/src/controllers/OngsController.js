/* eslint-disable max-len */
/* eslint-disable camelcase */

const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(req, res) {
    // const cstr = 'Driver={SQL Anywhere 16};Uid=dba;Pwd=erp@dbm@spa;Dsn=DEVCSS16_BETA;';
    // const odbc = require('odbc');
    // const pool = await odbc.pool(cstr);
    // const info = await pool.query('SELECT * FROM DBM.RESULTADO');

    // return res.json(info);

    const {pagina_atual = 1, registros_por_pagina = 5} = req.query;
    const [count] = await connection('ongs').count();

    res.header('X-Total-Count', count['count(*)']);

    return res.json(
        await connection('ongs')
            .limit(registros_por_pagina)
            .offset((pagina_atual - 1) * registros_por_pagina)
            .select('*'),
    );
  },

  async create(req, res) {
    const {name, email, whatsapp, city, uf} = req.body;

    console.log(req.body);

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
