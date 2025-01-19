import { ReactElement } from 'react';
import Link from 'next/link';
import styles from './SocialLink.module.scss';

export interface ISocialLinkProps {
    children: ReactElement;
    href: string;
}

export default function SocialLink({ children, href }: ISocialLinkProps) {
    return (
        <Link
            target='_blank'
            href={href}
            className={`inline-flex p-4 rounded-full ${styles.link}`}
        >
            {children}
        </Link>
    );
}
