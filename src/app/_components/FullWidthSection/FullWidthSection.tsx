'use client';

import styles from './FullWidthSection.module.scss';
import { ReactElement } from 'react';

interface ISectionProps {
    children: ReactElement;
    bottomSeparator?: boolean;
    id?: string;
}

export default function FullWidthSection({
    children,
    bottomSeparator = true,
    id,
}: ISectionProps) {
    return (
        <section className={`${styles.section}`} id={id}>
            <div className={`md:py-24 py-5`}> {children}</div>
            {bottomSeparator && (
                <div aria-hidden className={styles.separator}></div>
            )}
        </section>
    );
}
