import { Box, Table, TableHead, Typography, TableCell, TableRow, TableBody, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import patientService from '../../services/patients'
import { Patient, Diagnosis, EntryFormValues } from '../../types';
import HealthRatingBar from '../HealthRatingBar';
import Entry from './Entry';
import AddEntryModal from './AddEntryModal';

interface Props {
    patients: Patient[],
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>,
    diagnoses: Diagnosis[]
}

const PatientPage = ({ patients, setPatients, diagnoses }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: EntryFormValues) => {
        try {
          const entry = await patientService.createEntry(values, id);
          const patient = patients.find(p => p.id === id);
          if (patient) {
            patient?.entries.push(entry);
            setPatients(patients.map(p => p.id === patient.id ? patient : p));
            setModalOpen(false);
          }
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
    };

    const id = useParams().id;

    const patient = patients.find(p => p.id === id);
    const patientDiagnoses = diagnoses.filter(d => patient?.entries.find(e => e.diagnosisCodes?.includes(d.code)))

    if (!patient) {
        return(
            <div className='App'>
                Invalid patient
            </div>
        )
    }
    
    return(
        <div className='App'>
            <Box>
                <Typography align="center" variant="h6">
                {patient.name}
                </Typography>
            </Box>
            <Table style={{ marginBottom: "1em" }}>
                <TableHead>
                <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>Occupation</TableCell>
                    <TableCell>SSN</TableCell>
                    <TableCell>Health Rating</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.occupation}</TableCell>
                    <TableCell>{patient.ssn}</TableCell>
                    <TableCell>
                        <HealthRatingBar showText={false} rating={1} />
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <h3>Entries</h3>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatient}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
            {patient.entries.map(e => 
                <Entry entry={e} diagnoses={patientDiagnoses} key={e.id}/>
            )}
        </div>
    );
};

export default PatientPage;