import { IClinic } from '@interfaces/clinic-interface';
import db from "./../../models/"

async function getAll(): Promise<IClinic[]> {
    const clinics = await db.Clinic.findAll()
    return clinics;
}

async function add(clinic: IClinic): Promise<void> {
    const createdClinic = await db.Clinic.create(clinic)
    return createdClinic
}

export default {
    getAll,
    add,
} as const;
