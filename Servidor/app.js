const { query } = require('express');
const express = require('express');

const app = express();

app.post('/register_new_member', (req,res) => {
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
    console.log(name)
    }catch(err){
        console.log(`Error: ${err}`)
    }
})

app.listen(3000,() => {
    console.log("Servidor Corriento en el puerto", 3000);
})

