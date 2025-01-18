'use client';

import LinkedInSocialLink, {
    ILinkedInSocialLinkProps,
} from '@/app/_components/social-links/LinkedInSocialLink/LinkedInSocialLink';
import dynamic from 'next/dynamic';
import { ComponentType, useEffect, useState } from 'react';
import { getCssVariable } from '@/app/helpers/getCssVariable';
import { useTheme } from '@/app/context/ThemeContext';
import { IContactMeButtonProps } from '@/app/_components/ContactMeButton/ContactMeButton';
import GitHubSocialLink, {
    IGitHubSocialLinkProps,
} from '@/app/_components/social-links/GitHubSocialLink/GithubSocialLink';
import UpworkSocialLink, {
    IUpworkSocialLinkProps,
} from '@/app/_components/social-links/UpworkSocialLink/UpworkSocilaLink';

const ContactMeButton = dynamic<IContactMeButtonProps>(
    () =>
        import('@/app/_components/ContactMeButton/ContactMeButton').then(
            (mod) => mod.default as ComponentType<IContactMeButtonProps>
        ),
    {
        ssr: false,
    }
);

export default function HomeContacts() {
    const { theme } = useTheme();

    const [iconColor, setIconColor] = useState(getCssVariable('--font-color'));
    const [iconHoverColor, setIconHoverColor] = useState(
        getCssVariable('--background-color')
    );

    useEffect(() => {
        setIconColor(getCssVariable('--font-color'));
        setIconHoverColor(getCssVariable('--background-color'));
    }, [theme]);

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
        <div className='flex gap-4'>
            <ContactMeButton {...contactMeButtonProps} />
            <LinkedInSocialLink {...linkedInSocialLinkProps} />
            <GitHubSocialLink {...gitHubSocialLinkProps} />
            <UpworkSocialLink {...upworkSocialLinkProps} />
        </div>
    );
}
