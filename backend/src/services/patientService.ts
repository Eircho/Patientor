import patientData from "../data/patients";
import { NonSensitivePatient, Patient, NewPatientObject } from "../types";
import { v1 as uuid } from 'uuid';

const getData = () => {
    return patientData;
};

const getNonSensitiveData = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addData = ( object: NewPatientObject ): Patient => {
    const newPatient = {...object, id: String(uuid())};
    
    patientData.push(newPatient);

    return newPatient;
};

export default { getData, getNonSensitiveData, addData };