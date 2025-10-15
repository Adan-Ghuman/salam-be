import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/error.middleware';


const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())

app.use("/api/orders",orderRoutes);
app.use("/api/users",userRoutes);

app.use(errorHandler);

export default app;