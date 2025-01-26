'use client';

import { Spin } from 'hamburger-react';
import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { useWindowWidth } from '@/app/_hooks/useWindowWidth';
import ThemeSwitch from '@/app/_components/ThemeSwitch/ThemeSwitch';

export default function Header() {
    const [isOpen, setOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const width = useWindowWidth();

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);
    // TODO: rewrite using :md and :lg
    const mobileListClasses =
        width < 1024
            ? isOpen
                ? `${styles.mobile} gap-y-4 items-center justify-center w-full`
                : 'hidden'
            : '';
    const listClasses = `flex flex-col lg:flex-row gap-x-8 ${mobileListClasses}`;

    return (
        <header
            className={`${styles.header} ${isVisible ? 'top-0' : '-top-[90px]'} fixed flex w-full justify-between items-center px-14 py-6`}
        >
            <div className={`text-3xl ${styles.label}`}>VOLODYMYR LESKIV</div>
            <nav className='flex'>
                {width < 1024 && (
                    <div>
                        <Spin size={30} toggled={isOpen} toggle={setOpen} />
                    </div>
                )}

                <ul className={listClasses}>
                    <ThemeSwitch />
                    <li>
                        <a href='#home'>Home</a>
                    </li>
                    <li>
                        <a href='#about'>About</a>
                    </li>
                    <li>
                        <a href='#services'>Services</a>
                    </li>
                    <li>
                        <a href='#lets-connect'>Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
