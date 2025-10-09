import { SyntheticEvent, useState } from 'react';
import { EntryWithoutId } from '../../types';
import { Autocomplete, TextField } from '@mui/material';

interface OccupationalProps {
  addEntry: (entry: EntryWithoutId) => void;
  codes: string[];
}

const OccupationalForm = ({ addEntry, codes }: OccupationalProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (startDate !== '' && endDate !== '') {
      addEntry({
        description,
        date,
        specialist,
        employerName,
        diagnosisCodes,
        type: 'OccupationalHealthcare',
        sickLeave: {
          startDate,
          endDate,
        },
      });
    } else {
      addEntry({
        description,
        date,
        specialist,
        employerName,
        diagnosisCodes,
        type: 'OccupationalHealthcare',
      });
    }
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
      <div>
        <label>
          Employer
          <input
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          ></input>
        </label>
      </div>
      <div>Sick Leave</div>
      <div>
        <label>
          Start date
          <input
            type="date"
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
          ></input>
        </label>
      </div>
      <div>
        <label>
          End date
          <input
            type="date"
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
          ></input>
        </label>
      </div>
      <button>add</button>
    </form>
  );
};

export default OccupationalForm;
