import { useState } from 'react';
import DotIcon from '@/app/_components/icons/DotIcon/DotIcon';
import Button from '@/app/_components/Buton/Button';

export interface IContactMeButtonProps {
    iconColor: string;
    iconHoverColor: string;
}

export default function ContactMeButton( { iconColor, iconHoverColor }: IContactMeButtonProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="flex">
                CONTACT ME
                <span className="flex items-center pl-6">
                    <DotIcon color={isHovered ? iconHoverColor : iconColor}/>
                </span>
            </span>
        </Button>
    );
}



