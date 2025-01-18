import styles from './Button.module.scss';
import LinkedInIcon from "@/app/_components/icons/LinkedInIcon/LinkedInIcon";
import SocialLink from "@/app/_components/SocialLink/SocialLink";

export interface IButtonProps {
    href: string;
    iconColor?: string;
    hoverIconColor?: string;
}

export default function LinkedInSocialLink({ href}: IButtonProps) {
    return (
        <SocialLink href="https://google.com">
            <LinkedInIcon color="#F8F8F2" />
        </SocialLink>
    );
}