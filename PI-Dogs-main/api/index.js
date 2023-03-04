
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = 3001;

// ahora al exportar conn express que es el server, se conoce con sequelize.

// Syncing all the models at once, la conexion tiene el metodo sync (sincronizar), si hacemos un console.log
//nos mostrara una promise, es decir como es una promesa, demorara, entonces lo que haremos sera que una vez
//que se sincronice y si salio todo ok, quiero que ahi despues, pongamos a escuchar en el ${PORT} al server.

conn.sync({ force: true }).then(() => { // --> succes hanlder.
  console.log('Database connected...')
  server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`); // eslint-disable-line no-console
  });
}); 


//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~