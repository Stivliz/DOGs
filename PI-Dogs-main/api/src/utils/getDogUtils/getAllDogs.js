const  getDogsDb  = require('../getDogUtils/getDogsDb');
const  getDogsApi  = require('../getDogUtils/getDogsApi');

const getAllDogs = async () => {
  // Obtener todas las razas de perros de la base de datos que coinciden con el nombre
  const infoDogsDb = await getDogsDb();

  // Obtener todas las razas de perros de la API que coinciden con el nombre
  const infoDogsApi = await getDogsApi();
//  console.log(typeof infoDogsApi)
 // const totalDogs = [...infoDogsApi, ...infoDogsDb]
  //const totalDogs = infoDogsApi.concat(infoDogsDb)
  const totalDogs = infoDogsApi ? infoDogsApi.concat(infoDogsDb) : infoDogsDb;

  return totalDogs;
};

module.exports = getAllDogs;