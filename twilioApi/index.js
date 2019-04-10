const Hapi = require('hapi')
const HealthCheck = require('./controllers/healthcheck');

const apipath = '/api/v1';

const port = 1337;

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
};

(async () => {
    try {
      await server.start();
      initRoutes(server);
  
      console.log(`Server running at: ${server.info.uri}`);
  
    //   const mongoURI = //URI
  
    //   mongoose.connect(mongoURI, { useNewUrlParser: true });
    //   var db = mongoose.connection;
  
    //   db.on('error', (err) => {
    //     console.log('Mongoose default connection open to ' + mongoURI);
    //     console.error.bind(console, 'connection error:')
    //     });
    //   db.once('open', () => {
    //     console.log('Connected to DB');
    //   });
    } catch (err) {
      console.log(err.stack);
    }
  })();