'use client';

import LinkedInSocialLink, {
    ILinkedInSocialLinkProps,
} from '@/app/_components/social-links/LinkedInSocialLink/LinkedInSocialLink';
import ContactMeButton, {
    IContactMeButtonProps,
} from '@/app/_components/ContactMeButton/ContactMeButton';
import GitHubSocialLink, {
    IGitHubSocialLinkProps,
} from '@/app/_components/social-links/GitHubSocialLink/GithubSocialLink';
import UpworkSocialLink, {
    IUpworkSocialLinkProps,
} from '@/app/_components/social-links/UpworkSocialLink/UpworkSocilaLink';
import { useIconColors } from '@/app/_hooks/useIconColors';

export default function HomeContacts() {
    const { iconColor, iconHoverColor } = useIconColors();

    const contactMeButtonProps: IContactMeButtonProps = {
        iconColor,
        iconHoverColor,
    };

    const linkedInSocialLinkProps: ILinkedInSocialLinkProps = {
        href: 'https://www.linkedin.com/in/leskiv-v-d/', // TODO: Move to config
        iconColor,
        iconHoverColor,
    };

    const gitHubSocialLinkProps: IGitHubSocialLinkProps = {
        href: 'https://github.com/LeskivVolodymyr/', // TODO: Move to config
        iconColor,
        iconHoverColor,
    };

    const upworkSocialLinkProps: IUpworkSocialLinkProps = {
        href: 'https://www.upwork.com/freelancers/volodymyrleskiv', // TODO: Move to config
        iconColor,
        iconHoverColor,
    };

    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <ContactMeButton {...contactMeButtonProps} />
            <div className='flex gap-4 justify-center'>
                <LinkedInSocialLink {...linkedInSocialLinkProps} />
                <GitHubSocialLink {...gitHubSocialLinkProps} />
                <UpworkSocialLink {...upworkSocialLinkProps} />
            </div>
        </div>
    );
}
