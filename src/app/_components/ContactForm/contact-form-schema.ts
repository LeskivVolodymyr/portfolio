import * as Yup from 'yup';

const contactFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Does not look like a real name. It is too short!')
        .max(255, 'Too Long!')
        .required('Required.'),

    email: Yup.string().email('Invalid email').required('Required.'),

    subject: Yup.string()
        .min(2, 'Does not look like a real subject. It is too short!')
        .max(500, 'Too Long!')
        .optional(),

    message: Yup.string()
        .min(10, 'It is too short. Can you please provide more information? ')
        .max(10000, "Too Long! Let's discuss it in a call!")
        .required('Required'),
});

export default contactFormSchema;
