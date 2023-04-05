import { Box, Table, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../../types';
import HealthRatingBar from '../HealthRatingBar';
import Entry from './Entry';

interface Props {
    patients: Patient[],
    diagnoses: Diagnosis[]
}

const PatientPage = ({ patients, diagnoses }: Props) => {
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
            {patient.entries.map(e => 
                <Entry entry={e} diagnoses={patientDiagnoses} key={e.id}/>
            )}
        </div>
    );
};

export default PatientPage;