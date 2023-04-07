import axios from "axios";
import { Entry, Patient, PatientFormValues, EntryFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: EntryFormValues, patientId: string | undefined) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, createEntry
};

