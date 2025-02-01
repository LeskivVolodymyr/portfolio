import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './FormField.module.scss';

interface IFormField {
    name: string;
    type?: string;
    placeholder: string;
    component?: string;
    errors?: string;
    touched?: boolean;
    value: string;
    submitCount: number;
    autoComplete?: 'on' | 'off';
}

const FormField: React.FC<IFormField> = ({
    name,
    type = 'text',
    placeholder,
    component = 'input',
    errors,
    touched,
    value,
    submitCount,
    autoComplete = 'off',
}) => {
    const isValid = () => {
        const isEmpty = !!value;
        const isEmptyAndNotSubmitted = isEmpty && submitCount === 0;
        return !(
            errors &&
            touched &&
            (submitCount > 0 || isEmptyAndNotSubmitted)
        );
    };

    const fieldWrapperClasses = 'flex flex-col gap-1';
    const fieldClasses =
        `${styles['input-field']} rounded-md px-4 py-3 ` +
        `${isValid() ? '' : `${styles.invalid}`}`;
    const errorClasses = `${styles.error} text-sm`;

    return (
        <div className={fieldWrapperClasses}>
            <label htmlFor={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <Field
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                component={component}
                className={fieldClasses}
                autoComplete={autoComplete}
            />
            {!isValid() && (
                <ErrorMessage
                    className={errorClasses}
                    name={name}
                    component='div'
                />
            )}
        </div>
    );
};

export default FormField;
