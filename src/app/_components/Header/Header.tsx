// noinspection HtmlUnknownAnchorTarget

'use client';

import { Spin } from 'hamburger-react';
import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import ThemeSwitch from '@/app/_components/ThemeSwitch/ThemeSwitch';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
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
    const listClasses = `flex flex-col lg:flex-row gap-x-8 gap-y-4 items-center justify-center w-full  top-[90px] left-0 absolute lg:static ${mobileNavigation}`;

    const handleClick = () => {
        if (isOpen) setIsOpen(false);
    };

    return (
        <header
            className={`${styles.header} ${isVisible ? 'top-0' : '-top-[100px]'} fixed flex w-full justify-between items-center px-4 lg:px-14 py-6`}
        >
            <div className={`text-3xl ${styles.label}`}>VOLODYMYR LESKIV</div>
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
                        <a onClick={handleClick} href='#'>
                            About
                        </a>
                    </li>
                    <li>
                        <a onClick={handleClick} href='#'>
                            Services
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
