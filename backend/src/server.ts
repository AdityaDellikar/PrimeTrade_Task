import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

void startServer();
