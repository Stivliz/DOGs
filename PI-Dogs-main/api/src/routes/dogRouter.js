const { getAllDogs, getDogById, createdDogs} = require('../controllers/dogController')
const {Router} = require('express')
const router = Router();


router.get('/dogs', getAllDogs)
router.get('/dogs/:idRaza', getDogById)
router.get('/dogs/name',createdDogs)



module.exports = router;