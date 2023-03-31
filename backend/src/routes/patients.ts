import express from 'express';
import patientService from '../services/patientService';
import toNewPatientObject from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveData());
});

router.post('/', (req, res) => {
    const newPatientObject = toNewPatientObject(req.body);

    const addedPatient = patientService.addData(newPatientObject);

    res.send(addedPatient);
});

export default router;