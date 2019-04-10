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

    // server.route({
    //   method: 'GET',
    //   path: '/posts',
    //   handler: PostController.list
    // });
    
    // server.route({
    //   method: 'GET',
    //   path: '/posts/{id}',
    //   handler: PostController.get
    // });

    // server.route({
    //   method: 'POST',
    //   path: '/posts',
    //   handler: PostController.create
    // });
    
    // server.route({
    //   method: 'PUT',
    //   path: '/posts/{id}',
    //   handler: PostController.update
    // });
    
    // server.route({
    //   method: 'DELETE',
    //   path: '/posts/{id}',
    //   handler: PostController.remove
    // });
    
};

(async () => {
    try {
      await server.start();
      initRoutes(server);
  
      console.log(`Server running at: ${server.info.uri}`);
  
      const mongoURI = 'mongodb+srv://necoline:24Gssckr%5E@cluster0-bbuus.mongodb.net/test?retryWrites=true'
  
      mongoose.connect(mongoURI, { useNewUrlParser: true });
      var db = mongoose.connection;
  
      db.on('error', (err) => {
        console.log('Mongoose default connection open to ' + mongoURI);
        console.error.bind(console, 'connection error:')
        });
      db.once('open', () => {
        console.log('Connected to DB');
      });
    } catch (err) {
      console.log(err.stack);
    }
  })();