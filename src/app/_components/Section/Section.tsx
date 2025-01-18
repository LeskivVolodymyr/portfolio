import styles from './Section.module.scss';
import { ReactElement } from 'react';

interface ISectionProps {
    children: ReactElement;
    bottomSeparator?: boolean;
}

export default function Section({
    children,
    bottomSeparator = true,
}: ISectionProps) {
    return (
        <div className={styles.wrapper}>
            <section className={`pb-20 pt-7`}>{children}</section>
            {bottomSeparator && <div className={styles.separator}></div>}
        </div>
    );
}
