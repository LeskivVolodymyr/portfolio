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
import ContactForm from '@/app/_components/ContactForm/ContactForm';

export default function LetsConnectSection() {
    const { iconInteractiveColor } = useIconColors();
    const resumeFileId = process.env.NEXT_PUBLIC_RESUME_FILE_ID;
    const resumeDownloadLink = `https://drive.google.com/uc?export=download&id=${resumeFileId}`;
    const resumePreviewLink = `https://drive.google.com/file/d/${resumeFileId}/preview`;
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
        <div className='flex flex-col flex-wrap  md:flex-row gap-2'>
            <div className='flex flex-col flex-1 mb-7'>
                <h2 className='text-6xl mb-2'>LET’S CONNECT</h2>
                <div className='mb-5 flex flex-col gap-4'>
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
                        For more information, you can&nbsp;
                        <a
                            href={resumeDownloadLink}
                            className={`${styles.resume} underline underline-offset-4`}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <strong>download my resume</strong>
                        </a>
                        <br/>or&nbsp;
                        <a
                            href={resumePreviewLink}
                            className={`${styles.resume} underline underline-offset-4`}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <b>view</b>
                        </a>
                        &nbsp;it in a new tab.
                    </div>
                </div>
                <div className='flex gap-4'>
                    <LinkedInSocialLink {...linkedInSocialLinkProps} />
                    <GitHubSocialLink {...gitHubSocialLinkProps} />
                    <UpworkSocialLink {...upworkSocialLinkProps} />
                </div>
            </div>
            <div className='flex-1'>
                <ContactForm />
            </div>
        </div>
    );
}
