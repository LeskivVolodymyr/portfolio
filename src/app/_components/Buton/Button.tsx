import { ReactElement } from 'react';
import styles from './Button.module.scss';

export interface IButtonProps {
    children: ReactElement;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function Button({
    children,
    onMouseEnter,
    onMouseLeave,
}: IButtonProps) {
    const buttonClasses = `flex justify-center text-base font-bold px-5 py-4 rounded-full ${styles.button}`;

    return (
        <button
            className={buttonClasses}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </button>
    );
}
