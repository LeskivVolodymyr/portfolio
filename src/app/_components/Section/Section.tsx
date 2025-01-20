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
        <section className='max-w-full overflow-visible md:mb-12 mb-6' id={id}>
            <div className='md:pb-20 md:pt-7 pb-10 pt-3.5'> {children}</div>
            {bottomSeparator && (
                <div aria-hidden className={styles.separator}></div>
            )}
        </section>
    );
}
