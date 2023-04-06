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

router.get('/:id/entries', (req, res) => {
    const id = req.params.id;

    const patient = patientService.getDataById(id);
    
    if (patient) {
        res.send(patient.entries);
    }
    
    res.sendStatus(404);
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;

    const patient = patientService.getDataById(id);
    
    if (patient) {
        if (req.body.type === "HealthCheck") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
            const {description, date, specialist, diagnosisCodes, healthCheckRating, type} = req.body;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const newEntryObject = { description, date, specialist, diagnosisCodes, healthCheckRating, type };

            const entry = patientService.addEntry(newEntryObject, id);

            res.send(entry);
        }
        else if (req.body.type === "Hospital") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
            const {description, date, specialist, diagnosisCodes, discharge, type} = req.body;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const newEntryObject = { description, date, specialist, diagnosisCodes, discharge, type };

            const entry = patientService.addEntry(newEntryObject, id);

            res.send(entry);
        }
        else if (req.body.type === "OccupationalHealthcare") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
            const {description, date, specialist, diagnosisCodes, employerName, sickLeave, type} = req.body;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const newEntryObject = { description, date, specialist, diagnosisCodes, employerName, sickLeave, type };

            const entry = patientService.addEntry(newEntryObject, id);

            res.send(entry);
        }
        
        res.sendStatus(404);
    }
    
    res.sendStatus(404);
});

router.post('/', (req, res) => {
    const newPatientObject = toNewPatientObject(req.body);

    const addedPatient = patientService.addData(newPatientObject);

    res.send(addedPatient);
});

export default router;