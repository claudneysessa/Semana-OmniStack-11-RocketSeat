/* eslint-disable linebreak-style */

const app = require('./app');
const config = process.env.NODE_ENV;

app.set('port', process.env.PORT || 3333);

app.listen(app.get('port'), () => {
  console.log('\nAPI iniciada com sucesso!\n');
  console.log('Rodando em:');
  console.log(` - ${config}`);
  console.log('Dados de Conexão');
  console.log(` - Porta: ${app.get('port')}`);
});
