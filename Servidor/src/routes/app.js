const { Router } = require('express');
const router = Router();

//const express = require('express').Router();

//const express2 = require('express')

//const app = express();
const { members, register_new_member, register_new_sales } = require('../controllers/index.controller')

router.get('/members', members);
router.post('/register_new_member', register_new_member)
router.post('/register_new_sale', register_new_sales)


/*app.post('/register_new_member', (req,res) => {
    const {name, lastname, dni, mail, patente, premium} = req.params;
    try{
        //let sql = `insert into member(name,lastname,dni,mail,patente,premium) values(${},${},${},${},${},${});`
        //const rows = await query(sql)
        res.status(200).json({
        message:'Nuevo miembro añadido', 
        name: name,
        lastname: lastname,
        dni: dni,
        mail: mail,
        patente: patente,
        premium: premium 
    });
    console.log(res)
    }catch(err){
        console.log(`Error: ${err}`)
    }
})*/

//app.listen(3000,() => {
//    console.log("Servidor Corriento en el puerto", 3000);
//})

module.exports = router;