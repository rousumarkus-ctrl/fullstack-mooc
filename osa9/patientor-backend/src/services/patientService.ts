import {
  NewPatient,
  Patient,
  NonSensitivePatient,
  EntryWithoutId,
  Entry,
} from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw Error('hi');
  }
  patient.entries?.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsNoSSN: getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};
