const { query } = require('express');
const { Pool } = require('pg');
const { Kafka } = require('kafkajs');

const connectionData = {
    user:'postgres',
    database:'gremio',
    password:'postgres',
    port:'5432'
};

const pool = new Pool(connectionData)

const members = async (req,res) => {
        //return await pool.query(`select * from ${res}`).then((consulta) => {
        /*return await pool.query(`select * from users`).then((consulta) => {
            const arr = consulta.rows.map((row) => {
                try {
                    if(res == 'users') {
                        const {name, lastname, dni, mail, patente, premium} = row;
                        
                        return {name, lastname, dni, mail, patente, premium}
                        
                    }
                } catch(e) {
                    console.log(e);
                }
            })
            return arr
        })*/
        //res.send('hola');
        const response2 = await pool.query('SELECT * FROM members')
        console.log(response2.rows)
    }

const register_new_member = async (req,res) => {
    const {name,lastname,dni,mail,patente,premium} = req.query
    try{
        //console.log(name)
        res.json('HolaaaS')
        let sql = 'insert into members (name,lastname,dni,mail,patente,premium) values($1,$2,$3,$4,$5,$6)';
        const algo = [name,lastname,dni,mail,patente,premium]
        let rows = pool.query(sql,algo)
    }catch(err){
        console.log(`Error: ${err}`)
    }
}

const register_new_sales = async (req,res) => {
    const {client,count_sopaipillas,hours, stock, ubication} = req.query
    try{
        res.json('Holass')
        let sql = 'insert into sales (client,count_sopaipillas,hours,stock,ubication) values($1,$2,$3,$4,$5)'
        const algo = [client,count_sopaipillas,hours,stock,ubication]
        pool.query(sql,algo)
    }catch(err){
        console.log(`Error: ${err}`)
    }
}
    //const response2 = await pool.query('SELECT * FROM users');
    //console.log(response2.rows)

    /*pool.connect((err, pool, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        pool.query('select * from users',(err, result) => {
            release()
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log(`Resultados: ${result.rows}`)
        })
    })*/

    //pool.connect();

    //const response = await pool.query('SELECT * FROM  users');

    //console.log(response.rows);
    
    //await pool.end();
    
    //const response = await pool.query(');
    //console.log(response.rows);

module.exports = {
    members,
    register_new_member,
    register_new_sales
}