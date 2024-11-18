import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import findFreePort from 'find-free-port';

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log('✅ Database connected successfully');

    // Get the default port from .env or use 5000
    const defaultPort = parseInt(config.port as string, 10) || 5000;

    // Find a free port if the default port is in use
    const [freePort] = await findFreePort(defaultPort);

    app.listen(freePort, () => {
      console.log(`🚀 Server is running on port ${freePort}`);
    });
  } catch (err) {
    console.error('❌ Error starting the server:', err);
  }
}

// Start the server
main().catch((err) => console.error('❌ Unexpected error:', err));
