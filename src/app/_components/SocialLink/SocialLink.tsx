import { ReactElement } from 'react';
import Link from 'next/link';
import styles from './SocialLink.module.scss';

export interface ISocialLinkProps {
    children: ReactElement;
    href: string;
    title: string;
    isBordered?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}

export default function SocialLink({
    children,
    href,
    title,
    isBordered = true,
    onFocus,
    onBlur,
}: ISocialLinkProps) {
    return (
        <Link
            target='_blank'
            href={href}
            className={`inline-flex p-4 rounded-full ${styles.link} ${isBordered ? '' : styles['no-border']}`}
            title={title}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <div className={styles['size-wrapper']}>{children}</div>
        </Link>
    );
}
