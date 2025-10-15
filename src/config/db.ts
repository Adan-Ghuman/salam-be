import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const connectDB = async () => {
    const URI = process.env.MONGO_URI;

    if(!URI) {
        throw new Error("MONGO_URI is not defined");
    }
try {
    const conn = await mongoose.connect(URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);

} catch (error) {
    logger.error({err:error},'Error connecting to MongoDB:');
    process.exit(1);
}
};

export const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        logger.info('MongoDB disconnected');
    } catch (error) {
        logger.error( {err:error},'Error disconnecting from MongoDB:');
    }
};