const {Router} = require('express');
const {connection} = require('../../config/db_config');
const router = Router();


router.get("/", (req, res)=>{
    return res.send('Conexión exitosa');
})


module.exports = router;