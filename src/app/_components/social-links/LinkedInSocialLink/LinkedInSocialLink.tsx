import LinkedInIcon from '@/app/_components/icons/LinkedInIcon/LinkedInIcon';
import SocialLink from '@/app/_components/SocialLink/SocialLink';
import {useState} from 'react';

export interface ILinkedInSocialLinkProps {
    href: string;
    iconColor: string;
    iconHoverColor: string;
}

export default function LinkedInSocialLink({
                                               href,
                                               iconColor,
                                               iconHoverColor,
                                           }: ILinkedInSocialLinkProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SocialLink href={href} title='View my LinedIn profile'>
                <LinkedInIcon color={isHovered ? iconHoverColor : iconColor}/>
            </SocialLink>
        </div>
    );
}
