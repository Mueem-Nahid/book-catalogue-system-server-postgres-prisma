import { Server } from 'http';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

// database connection
async function bootstrap() {
  try {

    server = app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port} ...`);
    });
  } catch (error) {
    console.log(`Failed to connect database.`, error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
