import SocialLink from '@/app/_components/SocialLink/SocialLink';
import { useState } from 'react';
import UpworkIcon from '@/app/_components/icons/UpworkIcon/UpworkIcon';

export interface IUpworkSocialLinkProps {
    href: string;
    iconColor: string;
    iconHoverColor: string;
}

export default function UpworkSocialLink({
    href,
    iconColor,
    iconHoverColor,
}: IUpworkSocialLinkProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SocialLink href={href} title='View my Upwork profile'>
                <UpworkIcon color={isHovered ? iconHoverColor : iconColor} />
            </SocialLink>
        </div>
    );
}
