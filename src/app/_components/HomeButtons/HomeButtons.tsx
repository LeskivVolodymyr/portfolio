'use client';

import LinkedInSocialLink from '@/app/_components/social-links/LinkedInSocialLink/LinkedInSocialLink';
import dynamic from 'next/dynamic';
import { ComponentType, useEffect, useState } from 'react';
import { getCssVariable } from '@/app/helpers/getCssVariable';
import { useTheme } from '@/app/context/ThemeContext';
import { IContactMeButtonProps } from '@/app/_components/ContactMeButton/ContactMeButton';

const ContactMeButton = dynamic<IContactMeButtonProps>(() => import('@/app/_components/ContactMeButton/ContactMeButton')
    .then(mod => mod.default as ComponentType<IContactMeButtonProps>), {
        ssr: false
    }
);

export default function HomeButtons() {
    const { theme } = useTheme();

    const [iconColor, setIconColor] = useState(getCssVariable('--font-color'));
    const [iconHoverColor, setIconHoverColor] = useState(getCssVariable('--background-color'));

    useEffect(() => {
        setIconColor(getCssVariable('--font-color'));
        setIconHoverColor(getCssVariable('--background-color'));
    }, [theme]);

    const contactMeButtonProps : IContactMeButtonProps = {
        iconColor,
        iconHoverColor
    }

    return (
        <div className='flex gap-4'>
            <ContactMeButton {...contactMeButtonProps}/>
            <LinkedInSocialLink href='https://google.com'/>
        </div>
    );
}