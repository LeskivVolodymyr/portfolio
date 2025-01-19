import SocialLink from '@/app/_components/SocialLink/SocialLink';
import {useState} from 'react';
import GitHubIcon from '@/app/_components/icons/GitHubIcon/GitHubIcon';

export interface IGitHubSocialLinkProps {
    href: string;
    iconColor: string;
    iconHoverColor: string;
}

export default function GitHubSocialLink({
                                             href,
                                             iconColor,
                                             iconHoverColor,
                                         }: IGitHubSocialLinkProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SocialLink href={href} title='View my GitHub profile'>
                <GitHubIcon color={isHovered ? iconHoverColor : iconColor}/>
            </SocialLink>
        </div>
    );
}
