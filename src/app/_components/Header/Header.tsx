// noinspection HtmlUnknownAnchorTarget

'use client';

import { Spin } from 'hamburger-react';
import styles from './Header.module.scss';
import ThemeSwitch from '@/app/_components/ThemeSwitch/ThemeSwitch';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'next/dist/server/utils';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const prevScrollPosRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setIsVisible(
                prevScrollPosRef.current > currentScrollPos ||
                    currentScrollPos < 50
            );
            prevScrollPosRef.current = currentScrollPos;
        };

        window.addEventListener('scroll', debounce(handleScroll, 150));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    const mobileNavigation = isOpen
        ? `${styles['mobile-navigation']} text-2xl`
        : 'hidden lg:flex';
    const listClasses = `flex flex-col lg:flex-row gap-x-8 gap-y-4 items-center justify-center w-full  top-[72px] left-0 absolute lg:static ${mobileNavigation}`;

    const handleClick = () => {
        if (isOpen) setIsOpen(false);
    };

    return (
        <header
            className={`${styles.header} ${isVisible ? 'top-0' : '-top-[100px]'} fixed flex w-full justify-between items-center px-4 lg:px-14 lg:py-6 py-3`}
        >
            <div className={`text-3xl ${styles.label}`}>
                <a href='#home'>VOLODYMYR LESKIV</a>
            </div>
            <nav className='flex'>
                <div className='lg:hidden'>
                    <Spin size={30} toggled={isOpen} toggle={setIsOpen} />
                </div>
                <ul className={listClasses}>
                    <ThemeSwitch onThemeChange={handleClick} />
                    <li>
                        <a onClick={handleClick} href='#home'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a onClick={handleClick} href='#lets-connect'>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
