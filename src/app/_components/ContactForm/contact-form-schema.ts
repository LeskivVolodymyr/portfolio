import * as Yup from 'yup';

const nameValidation = Yup.string()
    .min(2, 'Name too short (min 2 chars).')
    .max(255, 'Name too long (max 255 chars).')
    .required('Name is required.');

const emailValidation = Yup.string()
    .email('Invalid email address.')
    .required('Email is required.');

const subjectValidation = Yup.string()
    .max(500, 'Subject too long (max 500 chars).')
    .optional()
    .nullable()
    .test(
        'is-empty-or-valid',
        'Subject too short (min 2 chars).',
        (value) =>
            value === '' ||
            value === null ||
            value === undefined ||
            value?.length >= 2
    );

const messageValidation = Yup.string()
    .min(10, 'Message too short (min 10 chars).')
    .max(10000, 'Message too long (max 10,000 chars).')
    .required('Message is required.');

const contactFormSchema = Yup.object().shape({
    name: nameValidation,
    email: emailValidation,
    subject: subjectValidation,
    message: messageValidation,
});

export default contactFormSchema;
