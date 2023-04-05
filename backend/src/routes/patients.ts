import express from 'express';
import patientService from '../services/patientService';
import toNewPatientObject from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getData());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const patient = patientService.getDataById(id);
    
    if (patient) {
        res.send(patient);
    }
    
    res.sendStatus(404);
});

router.post('/', (req, res) => {
    const newPatientObject = toNewPatientObject(req.body);

    const addedPatient = patientService.addData(newPatientObject);

    res.send(addedPatient);
});

export default router;