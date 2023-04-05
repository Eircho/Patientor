import { Box, Table, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../../types';
import HealthRatingBar from '../HealthRatingBar';

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

    console.log(patient)
    console.log(patientDiagnoses)
    
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

            <Box>
                <Typography align="center" variant="h6">
                Entries
                </Typography>
            </Box>
            <Table style={{ marginBottom: "1em" }}>
                <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Diagnose codes</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {patient.entries.map(e => 
                        <TableRow key={e.id}>
                            <TableCell>{e.date}</TableCell>
                            <TableCell>{e.description}</TableCell>
                            <TableCell>{e.diagnosisCodes?.map(c => <p key={c}>{c}</p>)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <h3>Diagnoses descriptions</h3>
            {patientDiagnoses.map(d => <p key={d.code}>{d.code} - {d.name}</p>)}
        </div>
    );
};

export default PatientPage;