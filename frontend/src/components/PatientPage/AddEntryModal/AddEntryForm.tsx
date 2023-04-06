import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, InputLabel, Select, MenuItem, SelectChangeEvent  } from '@mui/material';

import { Discharge, EntryFormValues, EntryType, HealthCheckRating, SickLeave } from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  type: EntryType
}

const AddEntryForm = ({ onCancel, onSubmit, type }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [discharge, setDischarge] = useState<Discharge>( { date: undefined, criteria: undefined } );
  const [sickLeave, setSickLeave] = useState<SickLeave>( {startDate: undefined, endDate: undefined} );
  const [employerName, setEmployerName] = useState('');

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case EntryType.Hospital:
        return onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge,
          type: "Hospital"
        });
      case EntryType.HealthCheck:
        return onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
          type: "HealthCheck"
        });
      case EntryType.OccupationalHealthcare:
        return onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave,
          type: "OccupationalHealthcare"
        });
      default:
        assertNever(type)
    }
  };

  const createCodesArray = (value: string | undefined) => {
    if (value) {
      const codeArray = value.split(" ");
      return setCodes(codeArray);
    }

    return setCodes([]);
  };

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      console.log(Object.values(HealthCheckRating))
      const rating = Object.values(HealthCheckRating).find(g => g.toString() === value);
      if (rating) {
        setHealthCheckRating(Number(rating));
      }
    }
  };

  switch (type) {
    case EntryType.Hospital:
      return (
        <div>
          <form onSubmit={addEntry}>
            <TextField
              label="Date"
              fullWidth 
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Discharge Date"
              fullWidth
              value={discharge.date}
              onChange={({ target }) => setDischarge( { date: target.value, criteria: discharge.criteria } )}
            />
            <TextField style={{ marginTop: 20 }}
              label="Discharge Criteria"
              fullWidth
              value={discharge.criteria}
              onChange={({ target }) => setDischarge( { date: discharge.date, criteria: target.value } )}
            />
            <TextField style={{ marginTop: 20 }}
              label="Diagnosis Codes"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => createCodesArray(target.value)}
            />
    
            <Grid style={{ marginTop: 20 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    case EntryType.HealthCheck:
      return (
        <div>
          <form onSubmit={addEntry}>
            <TextField
              label="Date"
              fullWidth 
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
            <Select
              label="Gender"
              fullWidth
              value={type || ""}
              onChange={onRatingChange}
              defaultValue=""
            >
            {Object.values(HealthCheckRating).map(option =>
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )}
            </Select>
            <TextField style={{ marginTop: 20 }}
              label="Diagnosis Codes"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => createCodesArray(target.value)}
            />
    
            <Grid style={{ marginTop: 20 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <form onSubmit={addEntry}>
            <TextField
              label="Date"
              fullWidth 
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField style={{ marginTop: 20 }}
              label="Sick leave start date"
              fullWidth
              value={sickLeave?.startDate}
              onChange={({ target }) => setSickLeave( { startDate: target.value, endDate: sickLeave?.endDate } )}
            />
            <TextField style={{ marginTop: 20 }}
              label="Sick leave end date"
              fullWidth
              value={sickLeave?.endDate}
              onChange={({ target }) => setSickLeave( { endDate: target.value, startDate: sickLeave?.startDate } )}
            />
            <TextField style={{ marginTop: 20 }}
              label="Diagnosis Codes"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => createCodesArray(target.value)}
            />
    
            <Grid style={{ marginTop: 20 }}>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    default:
      assertNever(type)
      return(
        <div>

        </div>
      );
  }
};

export default AddEntryForm;