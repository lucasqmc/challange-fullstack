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
    if (
        !clinic ||
        !clinic.name || clinic.address_type.trim() === '' ||
        !clinic.cnpj || clinic.address_type.trim() === '' ||
        !clinic.address_type || clinic.address_type.trim() === '' ||
        !clinic.number || clinic.address_type.trim() === '' ||
        !clinic.neighborhood || clinic.address_type.trim() === '' ||
        !clinic.complement || clinic.address_type.trim() === '' ||
        !clinic.city || clinic.address_type.trim() === '' ||
        !clinic.state || clinic.address_type.trim() === '' ||
        !clinic.country || clinic.address_type.trim() === '' ||
        !clinic.lat  ||
        !clinic.long 
        ) {
        throw new ParamMissingError();
    }
    await clinicService.addOne(clinic)
    return res.status(CREATED).end();
});

export default router;
