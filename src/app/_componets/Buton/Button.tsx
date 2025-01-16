import { ReactElement } from "react";
import styles from './Button.module.scss';

export enum ButtonType {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
}

export interface IButtonProps {
    children: ReactElement;
    buttonType?: ButtonType;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function Button({ children, buttonType = ButtonType.primary, onMouseEnter, onMouseLeave }: IButtonProps) {
    const buttonClasses = `text-base font-bold px-5 py-4 rounded-full ${styles.button} ${styles[buttonType]}`;
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