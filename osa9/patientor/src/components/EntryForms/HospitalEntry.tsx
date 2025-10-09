import { SyntheticEvent, useState } from 'react';
import { EntryWithoutId } from '../../types';
import { Autocomplete, TextField } from '@mui/material';

interface HospitalFormProps {
  addEntry: (entry: EntryWithoutId) => void;
  codes: string[];
}

const HospitalForm = ({ addEntry, codes }: HospitalFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    addEntry({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: 'Hospital',
      discharge: {
        date: dischargeDate,
        criteria,
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Description
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Specialist
          <input
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          ></input>
        </label>
      </div>
      <Autocomplete
        multiple
        options={codes}
        value={diagnosisCodes}
        onChange={(_event, newValue) => setDiagnosisCodes(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Diagnosis codes"></TextField>
        )}
        filterSelectedOptions
      ></Autocomplete>
      <div>Discharge</div>
      <div>
        <label>
          Discharge date
          <input
            type="date"
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Criteria
          <input
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          ></input>
        </label>
      </div>
      <button>add</button>
    </form>
  );
};

export default HospitalForm;
