import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './ContactForm.module.scss';
import Button from '@/app/_components/Buton/Button';

interface IContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const initialValues: IContactForm = {
        name: '',
        email: '',
        subject: '',
        message: '',
    };

    const fieldClasses = 'rounded-md px-4 py-3';

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                        (errors as any).email = 'Required'; // TODO: Fix any
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                        (errors as any).email = 'Invalid email address'; // TODO: Fix any
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
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='name'>Name</label>
                            <Field
                                type='text'
                                name='name'
                                id='name'
                                placeholder='John Doe'
                                className={`${styles.filed} ${fieldClasses}`}
                            />
                            <ErrorMessage name='name' component='div' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor='email'>Email</label>
                            <Field
                                type='text'
                                name='email'
                                id='email'
                                placeholder='your@email.com'
                                className={`${styles.filed} ${fieldClasses}`}
                            />
                            <ErrorMessage name='email' component='div' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor='subject'>Subject</label>
                            <Field
                                type='text'
                                name='subject'
                                id='subject'
                                placeholder='Subject'
                                className={`${styles.filed} ${fieldClasses}`}
                            />
                            <ErrorMessage name='subject' component='div' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor='message'>Message</label>
                            <Field
                                type='text'
                                name='message'
                                id='message'
                                component='textarea'
                                placeholder='Start typing your message...'
                                className={`${styles.filed} ${fieldClasses} h-24 min-h-24`}
                            />
                            <ErrorMessage name='message' component='div' />
                        </div>

                        <Button type='submit' disabled={isSubmitting}>
                            <>Submit</>
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
