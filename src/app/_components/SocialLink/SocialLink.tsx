import { ReactElement } from "react";
import Link from 'next/link'
import styles from './SocialLink.module.scss'

export interface ISocialLinkProps {
    children: ReactElement;
    href: string;
}

export default function SocialLink({ children, href }: ISocialLinkProps) {
    return (
        <div className={`inline-flex px-4 py-4 rounded-full ${styles.link} ${styles.primary}`}>
            <Link
                target='_blank'
                href={href}
            >
                {children}
            </Link>
        </div>
    );
}