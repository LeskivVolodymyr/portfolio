'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const TitleTypeAnimation = dynamic(
    () =>
        import('@/app/_components/Title/TitlesTypingText').then(
            (mod) => mod.default as ComponentType
        ),
    { ssr: false }
);

export default function Titles() {
    return (
        <span className='text-2xl min-h-8 h-8 flex'>
            {<TitleTypeAnimation />}
        </span>
    );
}
