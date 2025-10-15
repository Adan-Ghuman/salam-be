import dotenv from 'dotenv';
import app from './app';
import { logger } from './utils/logger';
import http from 'http';
import { connectDB, disconnectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

connectDB().catch((error) => {
    logger.error({err:error},'Failed to connect to database');
});

if (process.env.VERCEL !== '1') {
    server.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
}

async function gracefulShutdown(signal:NodeJS.Signals) {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(async (err) => {
        if(err) {
            logger.error({err},'Error during server shutdown:',);
            process.exit(1);
        }
            await disconnectDB();
            logger.info('Shutdown complete. Exiting now.');
            process.exit(0);
    });
}

// Export for Vercel
export default app;
