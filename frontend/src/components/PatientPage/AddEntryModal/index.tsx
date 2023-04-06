import { Dialog, DialogTitle, DialogContent, Divider, Alert, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { EntryFormValues, EntryType } from '../../../types';
import { useState } from 'react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = useState<EntryType>();

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find(g => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  return(
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      
      <DialogContent>
      <InputLabel>Entry Type</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={type || ""}
          onChange={onTypeChange}
          defaultValue=""
        >
        {Object.values(EntryType).map(option =>
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        )}
        </Select>
      </DialogContent>
      
      {type ? 
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={type}/>
      </DialogContent> :
      null
      }
    </Dialog>
  );
}

export default AddEntryModal;