import React, { RefObject, useRef } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import Button from '@/app/_components/Button/Button';
import contactFormSchema from '@/app/_components/ContactForm/contact-form-schema';
import { IContactForm } from '@/app/interfaces/IContactForm';
import { connect } from '@/app/_lib/api-client';
import { contactFormToFormData } from '@/app/utils/mapper';
import ReCAPTCHA from 'react-google-recaptcha';
import RecaptchaMessage from '@/app/_components/RecaptchaMessage/RecaptchaMessage';
import Recaptcha from '@/app/_components/Recaptcha/Recaptcha';
import FormField from '@/app/_components/FormField/FormFiled';
import Loader from '@/app/_components/Loader/Loader';
import Toast from '@/app/_components/Toast/Toast';

export default function ContactForm() {
    const recaptchaRef: RefObject<ReCAPTCHA | null> = useRef<ReCAPTCHA>(null);
    const toastRef = useRef<{ show: (message: string, type?: string) => void }>(
        null
    );
    const errorMessages = 'Something went wrong. Please try again.';

    const initialValues: IContactForm = {
        name: '',
        email: '',
        subject: '',
        message: '',
        captcha: '',
    };

    const handleSubmit = async (
        values: IContactForm,
        helpers: FormikHelpers<IContactForm>
    ) => {
        try {
            helpers.setSubmitting(true);
            values.captcha = await recaptchaRef.current?.executeAsync();
            const response = await connect(contactFormToFormData(values));
            if (response.status === 200) {
                helpers.resetForm();
                toastRef.current!.show(
                    'Your message has been sent successfully!',
                    'success'
                );
            } else {
                showErrorMessage();
            }
        } catch {
            showErrorMessage();
        } finally {
            helpers.setSubmitting(false);
            recaptchaRef.current?.reset();
        }
    };

    const showErrorMessage = () => {
        toastRef.current!.show(errorMessages, 'error');
    };

    return (
        <div className='max-w-screen-sm'>
            <Formik
                initialValues={initialValues}
                validationSchema={contactFormSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, isSubmitting, submitCount }) => (
                    <>
                        <Form className='flex flex-col gap-4'>
                            <FormField
                                name='name'
                                placeholder='John Doe'
                                errors={errors['name']}
                                touched={touched['name']}
                                value={values['name']}
                                submitCount={submitCount}
                            />
                            <FormField
                                name='email'
                                type='email'
                                placeholder='your@email.com'
                                errors={errors['email']}
                                touched={touched['email']}
                                value={values['email']}
                                submitCount={submitCount}
                                autoComplete='on'
                            />
                            <FormField
                                name='subject'
                                placeholder='Subject'
                                errors={errors['subject']}
                                touched={touched['subject']}
                                value={values['subject']}
                                submitCount={submitCount}
                            />
                            <FormField
                                name='message'
                                component='textarea'
                                placeholder='Start typing your message...'
                                errors={errors['message']}
                                touched={touched['message']}
                                value={values['message']}
                                submitCount={submitCount}
                            />

                            <Recaptcha recaptchaRef={recaptchaRef} />
                            <RecaptchaMessage />
                            <Button type='submit' disabled={isSubmitting}>
                                <>Submit</>
                            </Button>
                        </Form>
                        {isSubmitting && <Loader />}
                        <Toast ref={toastRef} />
                    </>
                )}
            </Formik>
        </div>
    );
}
