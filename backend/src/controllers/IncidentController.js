

const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index (request,response) {

        const { page=1 } = request.query;

        // console.log(page);

        /* Formato 1 */
        
        const count = await connection('incidents').count();
        // console.log(count[0]);

        /* Formato 2 */

        const [c] = await connection('incidents').count();
        // console.log(c);        

        const incidents = await connection('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
            
        console.log( "ddd: " +  count[0]['count(*)']);

        response.header('X-Total-Count', c['count(*)']);

        return response.json(incidents);
        
    },

    async create(request,response) {

        const body= request.body;
        const { title, description, value } = request.body;
    
        const ong_id = request.headers.ong_id;

        console.log(body);
    
        const result = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        const id = result[0];
    
        return response.json({
            status: "sucesso",
            data: {
                id: id,
                title: title,
                ong_id: ong_id,
                description: description,
                value: value
            }
        });

    },

    async delete(request,response) {
        
        const { id } = request.params;
        const ong_id = request.headers.ong_id;

        console.log(id);
        console.log(ong_id);

        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();

        console.log(incident.ong_id);

        if (incident.ong_id != ong_id){
            return response.status(400).json({
                status: "erro",
                message: "Operacao nao autorizada"
            });
        }

        await connection('incidents')
            .where('id',id)
            .delete();

        return response.status(204).send();

    }

}