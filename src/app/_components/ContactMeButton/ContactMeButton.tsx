import { useState } from 'react';
import DotIcon from '@/app/_components/icons/DotIcon/DotIcon';
import Button from '@/app/_components/Buton/Button';

export interface IContactMeButtonProps {
    iconColor: string;
    iconHoverColor: string;
    onContactMeClick?: () => void;
}

export default function ContactMeButton({
    iconColor,
    iconHoverColor,
    onContactMeClick,
}: IContactMeButtonProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onclick={onContactMeClick}
        >
            <span className='flex'>
                CONTACT ME
                <span className='flex items-center pl-6'>
                    <DotIcon color={isHovered ? iconHoverColor : iconColor} />
                </span>
            </span>
        </Button>
    );
}
