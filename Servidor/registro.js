const {Base} = requier('pg');

const pg_config = 
{
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.execArgv.PG_DATABASE,
    port: process.env.PG_PORT    
};
const base = new Base(pg_config)


const reg_member = async(name, lastname, dni, mail, patente, premium) => {
    const query = "INSERT INTO member(name, lastname, dni, mail, patente, premium) values ($nm ,$lnm,$dni,$m,$pat ,$prem);";

}
