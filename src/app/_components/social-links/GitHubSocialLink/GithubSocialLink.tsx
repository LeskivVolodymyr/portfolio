import SocialLink from '@/app/_components/SocialLink/SocialLink';
import { useState } from 'react';
import GitHubIcon from '@/app/_components/icons/GitHubIcon/GitHubIcon';

export interface IGitHubSocialLinkProps {
    href: string;
    iconColor: string;
    iconHoverColor: string;
    isBordered?: boolean;
}

export default function GitHubSocialLink({
    href,
    iconColor,
    iconHoverColor,
    isBordered,
}: IGitHubSocialLinkProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <SocialLink
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                href={href}
                title='View my GitHub profile'
                isBordered={isBordered}
            >
                <GitHubIcon color={isHovered ? iconHoverColor : iconColor} />
            </SocialLink>
        </div>
    );
}
