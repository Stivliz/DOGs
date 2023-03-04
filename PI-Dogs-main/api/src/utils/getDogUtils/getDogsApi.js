const axios = require('axios');

const dogsApi  = async() =>{
   // const url = 'https://api.thedogapi.com/v1/breeds/?api_key=live_2H2eGFzhmlTNBlX2T51n8MFeeziYxIfZ';
    
    const dogs = []
    try {

        const response =  await axios.get(`https://api.thedogapi.com/v1/breeds`)
            response?.data.map((dog) =>{ // ? si llega algo mapearrrrr
                dogs.push({
                    id: dog.id,
                    name: dog.name,
                    image: dog.image.url,
                    height:dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                    temperament: dog.temperament
                })
            })
    
        return dogs;

    } catch (error) {
        console.error(error)
    }
}

module.exports = dogsApi;