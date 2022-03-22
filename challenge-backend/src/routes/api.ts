import { Router } from 'express';
import clinicsRouter from './clinics-router';

const baseRouter = Router();
baseRouter.use('/clinics', clinicsRouter);

export default baseRouter;
