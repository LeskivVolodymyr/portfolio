import React from 'react';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FormikTouched,
    FormikValues,
    FormikErrors,
} from 'formik';
import styles from './ContactForm.module.scss';
import Button from '@/app/_components/Button/Button';
import contactFormSchema from '@/app/_components/ContactForm/contact-form-schema';
import { IContactForm } from '@/app/interfaces/IContactForm';
import { connect } from '@/app/_lib/api-client';
import { contactFormToFormData } from '@/app/utils/mapper';

export default function ContactForm() {
    const initialValues: IContactForm = {
        name: '',
        email: '',
        subject: '',
        message: '',
    };

    const fieldWrapperClasses = 'flex flex-col gap-1';
    const fieldClasses = `${styles[`input-field`]} rounded-md px-4 py-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]`;
    const errorClasses = `${styles.error} text-sm`;

    const showErrors = (
        fieldName: string,
        errors: FormikErrors<FormikValues>,
        touched: FormikTouched<FormikValues>,
        values: FormikValues,
        submitCount: number
    ) => {
        const hasError = !!errors[fieldName];
        const hasTouched = touched[fieldName];
        const isEmpty = !!values[fieldName];
        const isEmptyAndNotSubmitted = isEmpty && submitCount === 0;
        return (
            hasError &&
            hasTouched &&
            (submitCount > 0 || isEmptyAndNotSubmitted)
        );
    };

    return (
        <div className='max-w-screen-sm'>
            <Formik
                initialValues={initialValues}
                validationSchema={contactFormSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    const formData: FormData = contactFormToFormData(values);
                    await connect(formData);
                    setSubmitting(false);
                }}
            >
                {({ values, errors, touched, isSubmitting, submitCount }) => (
                    <Form className='flex flex-col gap-4'>
                        <div className={fieldWrapperClasses}>
                            <label htmlFor='name'>Name</label>
                            <Field
                                type='text'
                                name='name'
                                id='name'
                                placeholder='John Doe'
                                className={fieldClasses}
                            />
                            {showErrors(
                                'name',
                                errors,
                                touched,
                                values,
                                submitCount
                            ) && (
                                <ErrorMessage
                                    className={errorClasses}
                                    name='name'
                                    component='div'
                                />
                            )}
                        </div>

                        <div className={fieldWrapperClasses}>
                            <label htmlFor='email'>Email</label>
                            <Field
                                type='text'
                                name='email'
                                id='email'
                                placeholder='your@email.com'
                                className={fieldClasses}
                            />
                            {showErrors(
                                'email',
                                errors,
                                touched,
                                values,
                                submitCount
                            ) && (
                                <ErrorMessage
                                    className={errorClasses}
                                    name='email'
                                    component='div'
                                />
                            )}
                        </div>

                        <div className={fieldWrapperClasses}>
                            <label htmlFor='subject'>Subject</label>
                            <Field
                                type='text'
                                name='subject'
                                id='subject'
                                placeholder='Subject'
                                className={fieldClasses}
                            />
                            {showErrors(
                                'subject',
                                errors,
                                touched,
                                values,
                                submitCount
                            ) && (
                                <ErrorMessage
                                    className={errorClasses}
                                    name='subject'
                                    component='div'
                                />
                            )}
                        </div>

                        <div className={fieldWrapperClasses}>
                            <label htmlFor='message'>Message</label>
                            <Field
                                type='text'
                                name='message'
                                id='message'
                                component='textarea'
                                placeholder='Start typing your message...'
                                className={`${fieldClasses} h-24 min-h-24`}
                            />
                            {showErrors(
                                'message',
                                errors,
                                touched,
                                values,
                                submitCount
                            ) && (
                                <ErrorMessage
                                    className={errorClasses}
                                    name='message'
                                    component='div'
                                />
                            )}
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
