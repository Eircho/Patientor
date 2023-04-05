import { NonSensitivePatient, Patient, NewPatientObject } from "../types";
import { v1 as uuid } from 'uuid';
import patients from "../data/patients";

const getData = () => {
    return patients;
};

const getDataById = (id: string): Patient | undefined => {
    const patient: Patient | undefined = patients.find(p => p.id === id);
    return patient;
};

const getNonSensitiveData = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addData = ( object: NewPatientObject ): Patient => {
    const newPatient = {...object, id: String(uuid())};
    
    patients.push(newPatient);

    return newPatient;
};

export default { getData, getNonSensitiveData, addData, getDataById };