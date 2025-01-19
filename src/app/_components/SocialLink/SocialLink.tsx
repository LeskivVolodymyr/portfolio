import {ReactElement} from 'react';
import Link from 'next/link';
import styles from './SocialLink.module.scss';

export interface ISocialLinkProps {
    children: ReactElement;
    href: string;
    title: string;
}

export default function SocialLink({
                                       children,
                                       href,
                                       title,
                                   }: ISocialLinkProps) {
    return (
        <Link
            target='_blank'
            href={href}
            className={`inline-flex p-4 rounded-full ${styles.link}`}
            title={title}
        >
            {children}
        </Link>
    );
}
