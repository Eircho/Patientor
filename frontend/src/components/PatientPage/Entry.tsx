import { Diagnosis, Entry } from "../../types"

interface Props {
    entry: Entry
    diagnoses: Diagnosis[]
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Entries = ( { entry, diagnoses }: Props ) => {
    switch (entry.type) {
        case "Hospital":
            return(
                <div>
                        <fieldset>
                            <legend>{entry.date}</legend>
                            <p>Description: {entry.description}</p>
                            <p>Specialist: {entry.specialist}</p>
                            <p>Discharge date: {entry.discharge.date}</p>
                            <p>Discharge criteria: {entry.discharge.criteria}</p>
                            {entry.diagnosisCodes?.map(c => 
                                <li key={c}>
                                    {c} - {diagnoses.map(d => d.code === c ? d.name : null)}
                                </li>)}
                        </fieldset>
                </div>
            );
        case "OccupationalHealthcare":
            return(
                <div>
                        <fieldset>
                            <legend>{entry.date}</legend>
                            <p>Description: {entry.description}</p>
                            <p>Specialist: {entry.specialist}</p>
                            <p>Employer name: {entry.employerName}</p>
                            {entry.sickLeave ? 
                                <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> :
                                null
                            }
                            {entry.diagnosisCodes?.map(c => 
                                <li key={c}>
                                    {c} - {diagnoses.map(d => d.code === c ? d.name : null)}
                                </li>)}
                        </fieldset>
                </div>
            );
        case "HealthCheck":
            return(
                <div>
                        <fieldset>
                            <legend>{entry.date}</legend>
                            <p>Description: {entry.description}</p>
                            <p>Specialist: {entry.specialist}</p>
                            <p>Health Check Rating: {entry.healthCheckRating}</p>
                            {entry.diagnosisCodes?.map(c => 
                                <li key={c}>
                                    {c} - {diagnoses.map(d => d.code === c ? d.name : null)}
                                </li>)}
                        </fieldset>
                </div>
            );
        default:
            return assertNever(entry)
    }
};

export default Entries