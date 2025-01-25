const database = {};

database.users = require('./models/user.model');
database.articulos = require('./models/articulos.model');

function initializeUsers(){
    const NAMES = ["carlos", "paloma", "alvaro", "javi"];
    NAMES.forEach((username) => {
        database.users.register(username, "1234");
    });
}

function initializeArticulos(){
    const articulos = [
    {
        Id:1,
        tittle:"maria maria",
    },
    {
        Id:2,
        tittle:"Ven acá corriendo",
    },
    {
     Id:3,
     tittle:"que el",
    },
    {
        Id:4,
        tittle:"chocolatillo",
    },
    {
        Id:5,
        tittle:"Se lo están comiendo"
    }
    ]
    database.articulos.register(articulos);
}

function initializeDB(){
    initializeUsers();
    initializeArticulos();
    console.log("Base de datos inicializada");
}

initializeDB();

module.exports = database;
