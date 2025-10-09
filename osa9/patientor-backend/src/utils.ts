import { Gender, NewPatient, EntryWithoutId, HealthCheckRating } from './types';
import { z } from 'zod';

/* const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseString = (single: unknown): string => {
  if (!isString(single)) {
    throw new Error('Incorrect string');
  }

  return single;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
}; */

const baseEntryWithoutId = z.object({
  date: z.iso.date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
});

const healthCheckSchema = baseEntryWithoutId.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

const hospitalSchema = baseEntryWithoutId.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

const occupationalSchema = baseEntryWithoutId.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const entryWithoutIdSchema = z.discriminatedUnion('type', [
  hospitalSchema,
  occupationalSchema,
  healthCheckSchema,
]);

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  //entries: z.array(entryWithoutIdSchema).optional(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  return entryWithoutIdSchema.parse(object);
};
