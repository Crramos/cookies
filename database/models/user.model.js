const bcrypt = require('bcrypt');
const articulos = require('./articulos.model');

users = {};

users.data = {};

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = async function (username, password){
    //TODO Añadir comprobaciones sobre username y password
    if(users.data.hasOwnProperty(username)){
        throw new Error (`Ya existe el usuario ${username}.`);
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error (`Error al generar el hash de ${username}.`);
        }
        users.data[username] = {username, hash, favoritos:[], last_Login: new Date().toISOString()}
    });
	return true;
}

users.isLoginRight = async function(username,password){
    if(!users.data.hasOwnProperty(username)){
        return false;
    }
    return await users.comparePass(password, users.data[username].hash);
}

users.sacar_datos_usuario = async function(username){
    if(!users.data.hasOwnProperty(username)){
        return false;
    }
    return users.data[username].favoritos;
}

users.añadir_favoritos = async function (username, articuloId){
    if(!(users.data.hasOwnProperty(username) && articulos.comprobar_existencia(articuloId) )){
        return false;
    }
    if (!Array.isArray(users.data[username].favoritos)) {
        users.data[username].favoritos = [];
    }
    users.data[username].favoritos.push(articuloId);
	return true;
}

module.exports = users;
