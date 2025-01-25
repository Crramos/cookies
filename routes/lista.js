const express = require('express');
const router = express.Router();
const database = require('../database')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
      let favoritos;
      const usuario = req.session.user;
      const articulos = await database.articulos.sacar_todos_articulos();
      if(usuario){
        favoritos = await database.users.sacar_datos_usuario(usuario);
      }
      const total_items = articulos.length;
      console.log(articulos)
      const articulosProcesados = articulos.map((articulo) => {
        return{
          id: articulo.articuloId,
          titulo_articulo: articulo.tittle,
          imagen_articulo: './images/Fotoperfilpordefecto.png',
           //usuario_escritor: articulo.usuario_escritor, 
           usuario_escritor: "Juan",
         // descripcion: articulo.descripcion,
         descripcion: "Juan es un chico muy listo",
         //numero_likes: articulo.numero_like,
         // numero_dislikes: articulo.numero_dislike,
          //pagina_enlaces: `articulo_comunidad/${articulo.id}`,
        }
        
      });
      console.log(articulosProcesados)
      res.render('lista', { tittle: 'Juegos',
                                user:usuario ? usuario : false, 
                                numero_carrusel:0,
                                total_items: total_items,
                                articulos: articulosProcesados,
                                usuarioFavoritos : favoritos,
                               // imagen_perfil: favoritos.imagen_perfil,
      });
    }catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener las noticias');
    }
});

module.exports = router;