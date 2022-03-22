import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import clinicService from '@services/clinic-service';
import { ParamMissingError } from '@shared/errors';

const router = Router();
const { CREATED, OK } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
    const clinics = await clinicService.getAll()
    return res.status(OK).json(clinics);
});

router.post('/', async (req: Request, res: Response) => {
    const clinic = req.body;
    if (!clinic) {
        throw new ParamMissingError();
    }
    const createdClinic = await clinicService.addOne(clinic)
    return res.status(CREATED).end();
});

export default router;
