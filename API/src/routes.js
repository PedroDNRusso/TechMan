const express = require('express');
const routes = express.Router();


const Usuario = require('./controllers/usuario');
const Equipamento = require('./controllers/equipamentos');
const Comentario = require('./controllers/comentario');

routes.get('/', (req, res) => {
    res.json({ titulo: 'API Pedidos respondendo' });
});

routes.get('/usuarios', Usuario.read);
routes.post('/usuarios', Usuario.create);
routes.post('/usuarioslgn', Usuario.login);

routes.get('/equipamentos', Equipamento.read);
routes.post('/equipamentos', Equipamento.create);
routes.put('/equipamentos/:id', Equipamento.update);
routes.delete('/equipamentos/:id', Equipamento.del);

routes.get('/comentarios', Comentario.read);
routes.post('/comentarios', Comentario.create);

module.exports = routes;