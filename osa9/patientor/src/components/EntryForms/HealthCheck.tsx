import { SyntheticEvent, useState } from 'react';
import { EntryWithoutId, HealthCheckRating } from '../../types';
import { Autocomplete, TextField } from '@mui/material';

interface HealthFormProps {
  addEntry: (entry: EntryWithoutId) => void;
  codes: string[];
}

const HealthCheckForm = ({ addEntry, codes }: HealthFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    addEntry({
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
      type: 'HealthCheck',
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
      <div>
        <label>
          Healthcheck rating
          {Object.values(HealthCheckRating)
            .filter((h) => typeof h === 'number')
            .map((h) => {
              return (
                <label key={h}>
                  {h}
                  <input
                    type="radio"
                    onChange={() => setHealthCheckRating(h)}
                    name="HealthcheckRating"
                  ></input>
                </label>
              );
            })}
        </label>
      </div>
      <button>add</button>
    </form>
  );
};

export default HealthCheckForm;
