import express from 'express';

import patientService from '../services/patientService';

import diagData from '../../data/diagnoses';

import { toNewEntry, toNewPatient } from '../utils';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

router.get('/diagnoses', (_req, res) => {
  const diagnoses: Diagnosis[] = diagData;
  res.send(diagnoses);
});

router.get('/patients', (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

router.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/patients/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patientId = req.params.id;
    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/patients/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
