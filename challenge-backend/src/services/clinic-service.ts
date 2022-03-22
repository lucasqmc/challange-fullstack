import clinicRepo from '@repos/clinic-repo';
import { IClinic } from '@interfaces/clinic-interface';

function getAll(): Promise<IClinic[]> {
    return clinicRepo.getAll();
}

function addOne(clinic: IClinic): Promise<void> {
    return clinicRepo.add(clinic);
}

export default {
    getAll,
    addOne,
} as const;
