import * as yup from 'yup';

export const painEventSchema = yup.object().shape({
  severity: yup
    .number()
    .required('Pain severity is required')
    .min(0, 'Severity must be between 0 and 10')
    .max(10, 'Severity must be between 0 and 10'),
  location: yup
    .string()
    .required('Pain location is required')
    .min(2, 'Location must be at least 2 characters'),
  symptoms: yup
    .array()
    .of(yup.string())
    .default([]),
  triggers: yup
    .array()
    .of(yup.string())
    .default([]),
  notes: yup
    .string()
    .nullable(),
});
