articulos = {};

articulos.data = {};

articulos.register = async function (articulo){
    //TODO Añadir comprobaciones sobre username y password
   for(let i = 0; i< articulo.length;i++){
    articuloId= articulo[i].Id;
    console.log(articuloId);
    tittle = articulo[i].tittle; 
    console.log(tittle);
    if(articulos.data.hasOwnProperty(articuloId)){
        throw new Error (`Ya está asignado el ID ${articuloId}.`);
    }
    articulos.data[articuloId] = {articuloId, tittle}
    }
    console.log(articulos.data);
    return true;
}

articulos.sacar_datos_articulo = async function(articuloId){
    if(!articulos.data.hasOwnProperty(articuloId)){
        return false;
    }
    return articulos.data[tittle];
}
articulos.sacar_todos_articulos = async function(){
    return Object.values(articulos.data);
}
articulos.comprobar_existencia = async function(articuloId){
    if(!articulos.data.hasOwnProperty(articuloId)){
        return false;
    }
    return true;
}
module.exports = articulos;
