import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import { Diagnosis, Entry, EntryWithoutId, Patient } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HealthCheckForm from './EntryForms/HealthCheck';
import OccupationalForm from './EntryForms/Occupational';
import HospitalForm from './EntryForms/HospitalEntry';

enum Forms {
  HealthCheck,
  Hospital,
  Occupational,
  None,
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

//const HospitalEntry = ({ entry }) => {};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          Discharged: {entry.discharge.date} {entry.discharge.criteria}
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          Employer: {entry.employerName}
          {entry.sickLeave && (
            <div>
              Sick leave from {entry.sickLeave.startDate} to{' '}
              {entry.sickLeave.endDate}
            </div>
          )}
        </div>
      );
    case 'HealthCheck':
      return <div> Rating: {entry.healthCheckRating}</div>;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [openForm, setOpenForm] = useState<Forms>(Forms.None);

  const [notification, setNotification] = useState('');
  useEffect(() => {
    if (typeof id == 'string') {
      patientService
        .getPatient(id)
        .then((returned) => {
          setPatient(returned);
        })
        .catch(() => 'Getting patient failed');
      patientService.getDiagnoses().then((returned) => setDiagnoses(returned));
    }
  }, [id]);
  const addEntry = (entry: EntryWithoutId) => {
    if (typeof id == 'string') {
      patientService
        .createEntry(id, entry)
        .then((response) => {
          if (patient) {
            const newEntries = patient.entries.concat(response);
            setPatient({ ...patient, entries: newEntries });
          }
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            setNotification(error.response?.data);
            setTimeout(() => setNotification(''), 5000);
          } else {
            console.log(error);
          }
        });
    }
  };

  if (!patient) return <div>Patient not found</div>;
  const codes = diagnoses.map((d) => d.code);

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>gender: {patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {notification !== '' && <p style={{ color: 'red' }}>{notification}</p>}
      <button onClick={() => setOpenForm(Forms.HealthCheck)}>
        Healthcheck
      </button>
      <button onClick={() => setOpenForm(Forms.Occupational)}>
        Occupational
      </button>
      <button onClick={() => setOpenForm(Forms.Hospital)}>Hospital</button>
      <button onClick={() => setOpenForm(Forms.None)}>Close</button>
      {openForm === Forms.HealthCheck && (
        <HealthCheckForm codes={codes} addEntry={addEntry}></HealthCheckForm>
      )}
      {openForm === Forms.Occupational && (
        <OccupationalForm codes={codes} addEntry={addEntry}></OccupationalForm>
      )}
      {openForm === Forms.Hospital && (
        <HospitalForm codes={codes} addEntry={addEntry}></HospitalForm>
      )}

      <h4>entries</h4>
      {patient.entries.map((e) => {
        return (
          <div key={e.id} style={{ border: '2px solid black' }}>
            <p>
              {e.date} {e.description}
            </p>
            <ul>
              {e.diagnosisCodes?.map((d) => {
                return (
                  <li key={d}>
                    {d} {diagnoses.find((a) => a.code === d)?.name}
                  </li>
                );
              })}
            </ul>
            <EntryDetails entry={e}></EntryDetails>
            <p>diagnose by {e.specialist}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
