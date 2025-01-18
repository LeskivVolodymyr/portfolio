import { useEffect, useState } from 'react';
import { getCssVariable } from '@/app/helpers/getCssVariable';
import DotIcon from '@/app/_componets/icons/DotIcon/DotIcon';
import Button from '@/app/_componets/Buton/Button';
import { useTheme } from '@/app/context/ThemeContext';

export default function ContactMeButton() {
    const { theme } = useTheme();

    const [iconColor, setIconColor] = useState(getCssVariable('--font-color'));
    const [iconHoverColor, setIconHoverColor] = useState(getCssVariable('--background-color'));
    const [buttonsColor, setButtonsColor] = useState(getCssVariable('--font-color'));

    useEffect(() => {
        setIconColor(getCssVariable('--font-color'));
        setIconHoverColor(getCssVariable('--background-color'));
        setButtonsColor(getCssVariable('--font-color'));
    }, [theme]);

    return (
        <Button
            onMouseEnter={() => setButtonsColor(iconHoverColor)}
            onMouseLeave={() => setButtonsColor(iconColor)}
        >
                        <span className="flex">
                            CONTACT ME
                            <span className="flex items-center pl-6">
                                <DotIcon color={buttonsColor}/>
                            </span>
                        </span>
        </Button>
    );
}



