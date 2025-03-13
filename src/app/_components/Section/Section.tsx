import styles from './Section.module.scss';
import { ReactElement } from 'react';

interface ISectionProps {
    children: ReactElement;
    bottomSeparator?: boolean;
    id?: string;
}

export default function Section({
    children,
    bottomSeparator = true,
    id,
}: ISectionProps) {
    return (
        <section className='max-w-full overflow-visible' id={id}>
            <div className='md:py-24 py-5'> {children}</div>
            {bottomSeparator && (
                <div aria-hidden className={styles.separator}></div>
            )}
        </section>
    );
}
