

const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async create(request,response) {

        const body = request.body;
        const { id } = request.body;

        console.log(body);

        const ong = await connection('ongs')
            .where('id',id)
            .select('*')
            .first();

        if (!ong){
            return response.status(400).json({
                status: "erro",
                message: "ONG nao localizada para o ID informado!"
            });
        }

        return response.json(ong);

    }

}