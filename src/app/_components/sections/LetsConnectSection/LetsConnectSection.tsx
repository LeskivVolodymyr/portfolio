'use client';

import LinkedInSocialLink, {
    ILinkedInSocialLinkProps,
} from '@/app/_components/social-links/LinkedInSocialLink/LinkedInSocialLink';
import GitHubSocialLink, {
    IGitHubSocialLinkProps,
} from '@/app/_components/social-links/GitHubSocialLink/GithubSocialLink';
import UpworkSocialLink, {
    IUpworkSocialLinkProps,
} from '@/app/_components/social-links/UpworkSocialLink/UpworkSocilaLink';
import { useIconColors } from '@/app/_hooks/useIconColors';

export default function LetsConnectSection() {
    const { iconColor, iconHoverColor } = useIconColors();

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
        <div className='flex flex-col place-content-center flex-wrap  md:flex-row'>
            <div className='flex flex-col self-center flex-1'>
                <h2 className='text-6xl'>LET’S CONNECT</h2>
                <div className='pb-10 flex flex-col'>
                    <span>Say Hello at leskiv.v.d@gmail.com</span>
                    <span>For more info, here is my resume</span>
                </div>
                <div className='flex gap-4'>
                    <LinkedInSocialLink {...linkedInSocialLinkProps} />
                    <GitHubSocialLink {...gitHubSocialLinkProps} />
                    <UpworkSocialLink {...upworkSocialLinkProps} />
                </div>
            </div>
            <div className='flex-1'>form</div>
        </div>
    );
}
