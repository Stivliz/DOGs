//const dogsApi = require("../utils/getDogUtils/getDogsApi")
const axios = require('axios')
const allInfoDogs = require("../utils/getDogUtils/getAllDogs")
const { Dog, Temperament } = require("../db");


const getAllDogs = async (req, res)  => {

    try {
        const { name } = req.query;
        const allDogs = await allInfoDogs()
        
        if (name ) {
          let dogsName = allDogs.filter((dogs) =>
            dogs.name.toLowerCase().includes(name.toLowerCase())
          );
          dogsName.length
            ? res.status(200).json(dogsName)
            : res.status(404).send("No se encuentra el perro :c");
        } else {
         return res.status(200).json(allDogs)
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}


const getDogById = async(req, res) =>{
  
  try {
   
    const {idRaza} = req.params;
    if(!isNaN(idRaza)){
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`)
      const dogDetailsApi = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.image,
        height: response.data.height,
        weight: response.data.weight,
        life_span: response.data.life_span,
        temperament: response.data.temperament
      }
      res.status(200).json(dogDetailsApi)
    }else{
      const dogsDbId = await Dog.findByPk(id, {
        includes: [ 
          {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          }
         ]
      })
     return res.status(200).json(dogsDbId)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const createdDogs = async(req, res) => {
  try {
    const { name, image, height, weight, life_span, temperament } = req.body;
    if(!name || !height || !temperament)
    return res.status(404).send("Ausencia de datos obligatorios");

    const newDog = await Dog.create({ name, image, height, weight, life_span, temperament  });

    const dogsDb =  await Temperament.findAll({
      where: {
        name: temperament,
      },
    });

    newDog.addTemperament(dogsDb);
    res.status(200).send(newDog);
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// const getDogsByName = async (req, res) => {
//   try {
//     const { name } = req.query;
//     if (!name) {
//       return res.status(400).json({ message: "Missing required parameter 'name'" });
//     }
//     const allDogsApi = await dogsApi();
//     const allDogsDb = await dogsDb();
//     const matchingDogs = [...allDogsApi, ...allDogsDb].filter((dog) =>
//       dog.nombre.toLowerCase().includes(name.toLowerCase())
//     );
//     if (matchingDogs.length === 0) {
//       return res.status(404).json({ message: `No dogs found with name '${name}'` });
//     }
//     res.json(matchingDogs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


 // const getDogByName = async (req, res) => {


// const getDogByID = async (req, res) => {

// }


// const createDog = async (req, res) => {
//   try {
//     const { imagen, nombre, altura, peso, anios_de_vida, temperament } = req.body;
//     const newDog = await Dog.create({ imagen, nombre, altura, peso, anios_de_vida });
//     const associatedTemperaments = await Temperament.findAll({
//       where: { name: temperament }
//     });
//     await newDog.addTemperaments(associatedTemperaments);
//     res.status(200).json(newDog);

//     res.status(200).json(newDog);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// };



module.exports ={
  getAllDogs,
  getDogById,
  createdDogs

  
}