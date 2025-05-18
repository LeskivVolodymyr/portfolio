import React from 'react';
import workHistory from '@/app/_components/sections/MyExperienceSection/work-history';
import Workplace from '@/app/_components/Workpalce/Workpalce';

export default function MyExperienceSection() {
    return (
        <div className='flex flex-col flex-wrap  md:flex-row gap-2'>
            <div className='flex-1'>
                <h2 className='text-6xl sticky top-24'>MY EXPERIENCE</h2>
            </div>
            <div className='flex flex-col flex-1 gap-6'>
                {workHistory.map((workplace) => (
                    <Workplace
                        workplace={workplace}
                        key={workplace.from.toString()}
                    />
                ))}
            </div>
        </div>
    );
}
