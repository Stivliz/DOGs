const  getTemperaments = require('../utils/getTemperamentUtils/getTemperamet');

const getAllTemperaments = async (req, res) => {
  try {
    const temperaments = await getTemperaments();
    if(!temperaments.length){
      return res.satus(404).send('No se encontradon generos...')
    }
    res.status(200).json(temperaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTemperaments,
};