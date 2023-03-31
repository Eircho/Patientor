import { NewPatientObject, Gender } from "./types";

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }

    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth)) {
        throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
    }

    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error("Incorrect or missing ssn: " + ssn);
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }

    return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(value => value.toString()).includes(gender);
};

const toNewPatientObject = (object: unknown): NewPatientObject => {
    if (!object || typeof object !== 'object') {
        throw new Error("Incorrect or missing data");
    }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatientObject: NewPatientObject = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };

        return newPatientObject;
    }

    throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientObject;