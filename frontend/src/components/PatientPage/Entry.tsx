import { Diagnosis, Entry } from "../../types"

interface Props {
    entry: Entry
    diagnoses: Diagnosis[]
}

const Entries = ( { entry, diagnoses }: Props ) => {
    return(
        <div>
                <p>{entry.date} - {entry.description}</p>
                {entry.diagnosisCodes?.map(c => 
                    <li key={c}>
                        {c} - {diagnoses.map(d => d.code === c ? d.name : null)}
                    </li>)}
        </div>
    );
};

export default Entries