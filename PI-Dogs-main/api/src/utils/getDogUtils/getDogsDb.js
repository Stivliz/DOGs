const { Dog, Temperament } = require("../../db");

const getDogsDb = async () => {
  try {

    
    const dogs = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    // // Mapeamos los datos para adaptarlos al formato esperado
    // const dogsData = dogs.map((dog) => {
    //   return {
    //     id: dog.id,
    //     imagen: dog.imagen,
    //     nombre: dog.nombre,
    //     altura: dog.altura,
    //     peso: dog.peso,
    //     anios_de_vida: dog.anios_de_vida,
    //     temperamentos: dog.temperaments.map((t) => t.name),
    //   };
    // });

    return dogs;
  } catch (error) {
    console.error(error);
  }
};




module.exports = getDogsDb;
// const getDogsDb = async (req, res) => {
//   const { name } = req.query;
//   try {
//     const dogs = await Dog.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//     });
//     if (dogs.length === 0) {
//       return res.status(404).send("No se encontraron razas con ese nombre.");
//     }
//     const dogsData = dogs.map((dog) => {
//       return {
//         id: dog.id,
//         image: dog.image,
//         name: dog.name,
//         height: dog.height,
//         weight: dog.weight,
//         life_span: dog.life_span,
//         temperament: dog.temperaments.map((t) => t.name),
//       };
//     });
//     res.json(dogsData);
//   } catch (error) {
//     console.error(error);
//   }
// };