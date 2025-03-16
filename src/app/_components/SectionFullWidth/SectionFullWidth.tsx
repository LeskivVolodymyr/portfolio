import styles from './SectionFullWidth.module.scss';
import { ReactElement } from 'react';

interface ISectionFullWidthProps {
    children: ReactElement;
    bottomSeparator?: boolean;
    id?: string;
}

export default function SectionFullWidth({
    children,
    bottomSeparator = true,
    id,
}: ISectionFullWidthProps) {
    return (
        <section
            className={`${styles.section} relative w-screen left-1/2`}
            id={id}
        >
            <div className='md:py-24 py-10'> {children}</div>
            {bottomSeparator && (
                <div aria-hidden className={styles.separator}></div>
            )}
        </section>
    );
}
