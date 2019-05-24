const Hapi = require('hapi')
const mongoose = require('mongoose');
const HealthCheck = require('./controllers/healthcheck');
const PostController = require('./controllers/post');

const apipath = '/api/v1';

const port = 1338;

const server = new Hapi.Server({
  port: port,
  host: 'localhost',
  routes: {
    cors: true,
  },
});

const initRoutes = server => {
    //HealthCheck route
    server.route({
      method: 'GET',
      path: '/ping',
      handler: HealthCheck.ping,
      config: {
        auth: false,
      },
    });

    server.route({
      method: 'GET',
      path: '/posts/list',
      handler: PostController.list,
      config: {
        auth: false,
      },
    });
    
    server.route({
      method: 'GET',
      path: '/posts/get/{id}',
      handler: PostController.get,
      config: {
        auth: false,
      },
    });

    server.route({
      method: 'POST',
      path: '/posts/create',
      handler: PostController.create,
      config: {
        auth: false,
      },
    });
    
    server.route({
      method: 'PUT',
      path: '/posts/update/{id}',
      handler: PostController.update,
      config: {
        auth: false,
      },
    });
    
    server.route({
      method: 'DELETE',
      path: '/posts/remove/{id}',
      handler: PostController.remove,
      config: {
        auth: false,
      },
    });
    
};

(async () => {
    try {
      await server.start();
      initRoutes(server);
  
      console.log(`Server running at: ${server.info.uri}`);
  
      const mongoURI = 'mongodb+srv://neco:sir2019@cluster0-tjdkc.mongodb.net/test?retryWrites=true'
  
      mongoose.connect(mongoURI, { useNewUrlParser: true });
      var db = mongoose.connection;
  
      db.on('error', (err) => {
        console.log('connected to DB')
        console.error.bind(console, 'connection error:')
        });
      db.once('open', () => {
        console.log('Connected to DB');
      });
    } catch (err) {
      console.log(err.stack);
    }
  })();