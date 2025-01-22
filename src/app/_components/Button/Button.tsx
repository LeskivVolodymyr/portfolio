import { ReactElement } from 'react';
import styles from './Button.module.scss';

export interface IButtonProps {
    children: ReactElement;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onclick?: () => void;
}

export default function Button({
    children,
    disabled = false,
    type = 'button',
    onMouseEnter,
    onMouseLeave,
    onclick,
}: IButtonProps) {
    const buttonClasses = `flex justify-center text-base font-bold px-5 py-4 rounded-full ${styles.button}`;

    return (
        <button
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchStart={onMouseEnter}
            onTouchEnd={onMouseLeave}
            onClick={onclick}
            className={buttonClasses}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}
