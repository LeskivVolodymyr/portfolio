'use client';

import Image from 'next/image';
import HomeContacts from '@/app/_components/HomeContacts/HomeContacts';
import silhouette from '../../../../../public/images/silhouette.png';
import silhouetteDark from '../../../../../public/images/silhouette-dark.png';
import Titles from '@/app/_components/Title/Titles';
import { useTheme } from '@/app/context/ThemeContext';

export default function HomeSection() {
    const { theme } = useTheme();
    const image = theme === 'light' ? silhouette : silhouetteDark;
    return (
        <div className='flex flex-col place-content-center flex-wrap md:flex-row lg:pt-11 md:pt-0 pt-32 gap-1'>
            <div className='flex flex-col self-center flex-1'>
                <h1 className='text-7xl'>
                    HI, I AM <br /> VOLODYMYR LESKIV.
                </h1>
                <div className='pb-10'>
                    <Titles />
                </div>
                <HomeContacts />
            </div>
            <div className='flex flex-row flex-1 justify-end mt-7 md:mt-0'>
                <Image
                    src={image}
                    alt=''
                    sizes='(max-width: 767px) 100vw, 600px'
                    width={600}
                />
            </div>
        </div>
    );
}
