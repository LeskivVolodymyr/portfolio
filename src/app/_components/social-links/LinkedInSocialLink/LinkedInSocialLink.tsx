import LinkedInIcon from '@/app/_components/icons/LinkedInIcon/LinkedInIcon';
import SocialLink from '@/app/_components/SocialLink/SocialLink';
import { useState } from 'react';

export interface ILinkedInSocialLinkProps {
    href: string;
    iconColor: string;
    iconHoverColor: string;
    isBordered?: boolean;
}

export default function LinkedInSocialLink({
    href,
    iconColor,
    iconHoverColor,
    isBordered,
}: ILinkedInSocialLinkProps) {
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
                title='View my LinedIn profile'
                isBordered={isBordered}
            >
                <LinkedInIcon color={isHovered ? iconHoverColor : iconColor} />
            </SocialLink>
        </div>
    );
}
