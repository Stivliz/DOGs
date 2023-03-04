const { getAllDogs, getDogById, createdDogs} = require('../controllers/dogController')
const {Router} = require('express')
const router = Router();


router.get('/dogs', getAllDogs)
router.get('/dogs/:idRaza', getDogById)
router.post('/dogs',createdDogs)


module.exports = router;