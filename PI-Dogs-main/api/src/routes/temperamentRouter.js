const {getAllTemperaments} = require("../controllers/temperamentController")
const {Router} = require('express')
const router = Router();

router.get('/temperaments', getAllTemperaments)

module.exports = router