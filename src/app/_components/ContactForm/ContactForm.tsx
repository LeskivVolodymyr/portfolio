import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './ContactForm.module.scss';

interface IContactForm{
    name: string,
    email: string,
    subject: string,
    message: string
}

export default function ContactForm() {

    const initialValues: IContactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    const fieldClasses = 'border border-gray-300 rounded-md p-2';

    return(

    <div>
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='flex flex-col gap-4'>
                    <Field type="text" name="name" className={`${styles.filed} ${fieldClasses}`} />
                    <ErrorMessage name="name" component="div" />

                    <Field type="text" name="email"  className={`${styles.filed} ${fieldClasses}`}/>
                    <ErrorMessage name="email" component="div" />

                    <Field type="text" name="subject"  className={`${styles.filed} ${fieldClasses}`}/>
                    <ErrorMessage name="subject" component="div" />

                    <Field type="text" name="message" component="textarea"  className={`${styles.filed} ${fieldClasses}`}/>
                    <ErrorMessage name="message" component="div" />


                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);
}

