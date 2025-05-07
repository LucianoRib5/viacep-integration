import express from 'express';
import cepRoutes from './routes/cep.routes';

const app = express();

app.use(express.json());

app.use('/ceps', cepRoutes);

export default app;
