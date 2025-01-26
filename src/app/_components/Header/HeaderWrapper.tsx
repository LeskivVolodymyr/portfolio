// TODO: get rid of this when header will be fixed with correct tailwind classes

'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Header = dynamic(() => import('@/app/_components/Header/Header'), {});

export default function HeaderWrapper() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return <Header />;
}
