
const axios = require('axios');
const { Temperament } = require('../../db');

const getTemperaments = async () => {
    
      // const response = await axios.get(`https://api.thedogapi.com/v1/temperament`);
      // const breeds = response.data;

      // for(let i = 0; i < breeds.length; i++){
      //   const {name} = breeds[i]
      //   await Temperament.findOrCreate({ where: { name } });
      // }

      // const temperamentDb = await Temperament.findAll()
      // return temperamentDb
      let temperements = await Temperament.findAll()
      if (temperements.length === 0) {
          let id = 0;
          let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
          apiDogs = apiDogs.data
  
          let mapTempers = []
          let tableTempers = []
          apiDogs.forEach((el) => {
              //const m = el.temperament.split(',')
              //console.log(m)
              //const temperamentDog = el.temperament.split(',')
              el.temperament ?
                  el.temperament.split(',').forEach((temper) => {
                      if (!mapTempers.includes(temper.trim())) {
                          mapTempers.push(temper.trim())
                          tableTempers.push({
                              // id: ++id,
                              name: temper.trim()
                          })
                      }
                  }) :
                  null
          })
  
          temperements = await Temperament.bulkCreate(tableTempers)
      }
  
      return temperements
}

// const getTemperaments = async () => {
//   try {
//     const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
//     const breeds = response.data;

//     // Obtener todos los temperamentos únicos de las razas de perros
//     const temperaments = breeds.reduce((acc, breed) => {
//       const breedTemperaments = breed.temperament ? breed.temperament.split(', ') : [];
//       return [...acc, ...breedTemperaments];
//     }, []);
//     const uniqueTemperaments = [...new Set(temperaments)];

//     // Guardar los temperamentos en la base de datos
//     const createdTemperaments = await Promise.all(
//       uniqueTemperaments.map((name) => Temperament.findOrCreate({ where: { name } }))
//     );

//     return createdTemperaments.map((t) => t[0]);
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error al obtener los temperamentos desde la API');
//   }
// };

// const getTemperaments = async () => {
//   try {

//     //Busco los temperamentos de la base de datos.

//     const temperamentsDb = await Temperament.findAll();

//     //verifico si realmente estan en la DB, si lo estan me los traigo

//     if(temperamentsDb.length){
//       return temperamentsDb.map((t) => t.name)
//     }

//     //si no hay temperamentos en la base de datos entonces me los traigo de la APi,
//     //y los guardo en la DB.

//     const infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds`)
//     const temperamentApi = infoApi.data

//     //Utilizar el método reduce para iterar sobre el array de objetos que se obtiene de la API.
//     //utilizamos el metodo reduce, para ir metiendo lo que encontremos en la api al acumulador:
//     const temperaments = temperamentApi.reduce((acc, dog) => {
//       //Dentro de cada iteración, se verifica si el objeto tiene la propiedad temperament
//       //si existe en la api, la propiedad temperament, entonces lo que haremos sera
//       if(dog.temperament){
//         //Si la propiedad temperament existe, se divide su valor (una cadena) en un array de subcadenas
//         // utilizando el método split.
        
//         //crear una constante llamada split, que almacenara, las propiedades temperament, que vienen como en  
//         //estructura de cadena de esta forma ("Loyal, Independent, Intelligent, Brave")
//         //y con split, lo que hacemos es convertir esas cadenas en un array de subcadenas asi:
//         //[ 'Loyal', ' Independent', ' Intelligent', ' Brave' ]
//         const split = dog.temperament.split(',')
//         console.log(split) // si consologuiamos esto tendriamos esto: [ 'Loyal', ' Independent', ' Intelligent', ' Brave' ]
        
//         //El array de subcadenas se concatena con el acumulador utilizando 
//         //el operador spread ... dentro de un array.
        
//         //despues aca retornaremos en si un array de todas los array de subcadenas que estan almacenados
//         //en split, y lo concatenaremos al acc, que es el acumulador que en si es un array.  
//         return [...acc, ...split]//entonces el retorno de esto quedaria asi: 
//         // [ 'Stubborn', ' Curious', ' Playful', ' Adventurous', ' Active', ' Fun-loving', 'Aloof', 
//         //' Clownish', ' Dignified', ' Independent', ' Happy', 'Wild', ' Hardworking', ' Dutiful', 
//         //'Outgoing', ' Friendly', ' Alert', ' Confident', ' Intelligent', ' Courageous', 'Loyal', 
//         //' Independent', ' Intelligent', ' Brave', 'Docile', ' Alert', ' Responsive', ' Dignified',
//         // ' Composed', ' Friendly', ' Receptive', ' Faithful', ' Courageous' ]
//       }else{
//         //Si el objeto no tiene la propiedad temperament, se retorna el acumulador tal cual sin 
//         //hacer ninguna modificación.
//         return acc //dado el caso de  que no haya en la api la propiedad temperament, entonces se retornara acc
//         //que en si es el array acumulador = []
//       }
//     }, [])

//     //Entonces, al final de la iteración, la función retorna un array con todas las subcadenas de 
//     //la propiedad temperament de los objetos que se encontraron en la API. Cada subcadena es un elemento 
//     //del array retornado.

//     //Creamos una variable uniqueTemperaments, que se encargara de eliminar los elementos repetidos
//     //de temperaments: osea, temperaments devuelve esto:
//     // [ 'Stubborn', ' Curious', ' Playful', ' Adventurous', ' Active', ' Fun-loving', 'Aloof', 
//     //' Clownish', ' Dignified', ' Independent', ' Happy', 'Wild', ' Hardworking', ' Dutiful', 
//     //'Outgoing', ' Friendly', ' Alert', ' Confident', ' Intelligent', ' Courageous', 'Loyal', 
//     //' Independent', ' Intelligent', ' Brave', 'Docile', ' Alert', ' Responsive', ' Dignified',
//     // ' Composed', ' Friendly', ' Receptive', ' Faithful', ' Courageous' ], 
//     //Podemos ver que hay datos repetidos como Intelligent entonces al quitar los datos repetidos,
//     //nos quedaria asi: 

//     // [ 'Stubborn', ' Curious', ' Playful', ' Adventurous', ' Active', ' Fun-loving', 'Aloof', ' Clownish',
//     // ' Dignified', ' Independent', ' Happy', 'Wild', ' Hardworking', ' Dutiful', 'Outgoing', ' Friendly', 
//     // ' Alert', ' Confident', ' Intelligent', ' Courageous', 'Loyal', ' Brave', 'Docile', ' Responsive', 
//     // ' Composed', ' Receptive', ' Faithful' ]

//     const uniqueTemperaments = [...new Set(temperaments)]
    
//     //ya obtenido los temperamts, en un array sin elementos repetidos entonces lo que haremos sera
//     //insertarlos en la base de datos

//    // Insertamos los temperamentos únicos en la base de datos
//    const result = await Temperament.bulkCreate(
//     uniqueTemperaments.map((name) => ({ name }))
//     );


//     // Retornamos los nombres de los temperamentos que se han insertado en la base de datos
//     return result.map((t) => t.name);
    
//   } catch (error) {
//     console.error(error)
//   }
// }


 module.exports = getTemperaments;


