

const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index (request,response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request,response) {

        const body= request.body;
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = crypto.randomBytes(10).toString('HEX');
    
        console.log(body);
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
    
        return response.json({
            status: "sucesso",
            data: {
                id: id, 
                name: name,
                email: email,
                whatsapp: whatsapp,
                city: city,
                uf: uf
            }
        });

    }

}