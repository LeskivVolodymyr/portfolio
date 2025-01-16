import { ReactElement } from "react";
import Link from 'next/link'
import styles from './SocialLink.module.scss';

export interface ISocialLinkProps {
    children: ReactElement;
    href: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function SocialLink({ children, href, onMouseEnter, onMouseLeave }: ISocialLinkProps) {
    return (
        <div className={`inline-flex px-4 py-4 rounded-full ${styles.link} ${styles.primary}`}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}>
            <Link
                target='_blank'
                href={href}
            >
                {children}
            </Link>
        </div>

    );
}