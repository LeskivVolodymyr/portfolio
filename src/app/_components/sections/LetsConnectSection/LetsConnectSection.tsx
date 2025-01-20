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
import styles from './LetsConnectSection.module.scss';
import ContactForm from "@/app/_components/ContactForm/ContactForm";

export default function LetsConnectSection() {
    const { iconInteractiveColor } = useIconColors();

    const linkedInSocialLinkProps: ILinkedInSocialLinkProps = {
        href: 'https://www.linkedin.com/in/leskiv-v-d/', // TODO: Move to config
        iconColor: iconInteractiveColor,
        iconHoverColor: iconInteractiveColor,
        isBordered: false,
    };

    const gitHubSocialLinkProps: IGitHubSocialLinkProps = {
        href: 'https://github.com/LeskivVolodymyr/', // TODO: Move to config
        iconColor: iconInteractiveColor,
        iconHoverColor: iconInteractiveColor,
        isBordered: false,
    };

    const upworkSocialLinkProps: IUpworkSocialLinkProps = {
        href: 'https://www.upwork.com/freelancers/volodymyrleskiv', // TODO: Move to config
        iconColor: iconInteractiveColor,
        iconHoverColor: iconInteractiveColor,
        isBordered: false,
    };

    return (
        <div className='flex flex-col flex-wrap  md:flex-row'>
            <div className='flex flex-col flex-1'>
                <h2 className='text-6xl mb-2'>LET’S CONNECT</h2>
                <div className='mb-5 flex flex-col'>
                    <div>
                        Say hello at&nbsp;
                        <a
                            href='mailto:leskiv.v.d@gmail.com'
                            className={`${styles.email} underline underline-offset-4`}
                        >
                            <strong>leskiv.v.d@gmail.com</strong>
                        </a>
                    </div>
                    <div>
                        For more info, here is my&nbsp;
                        <a
                            href='/not-implemented'
                            className={`${styles.resume} underline underline-offset-4`}
                        >
                            <strong>resume</strong>
                        </a>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <LinkedInSocialLink {...linkedInSocialLinkProps} />
                    <GitHubSocialLink {...gitHubSocialLinkProps} />
                    <UpworkSocialLink {...upworkSocialLinkProps} />
                </div>
            </div>
            <div className='flex-1'>
                <ContactForm/>
            </div>
        </div>
    );
}
