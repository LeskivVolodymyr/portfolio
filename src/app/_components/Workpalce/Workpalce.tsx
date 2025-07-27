'use client';

import { WorkPlaceItem } from '@/app/_components/sections/MyExperienceSection/work-history';
import { differenceInMonths, differenceInYears } from 'date-fns';
import styles from './Workplace.module.scss';
import { useExpandable } from '@/app/_hooks/useExpandable';
import Button from '@/app/_components/Button/Button';

export default function Workplace({ workplace }: { workplace: WorkPlaceItem }) {
    const from = workplace.from;
    const to = workplace.to === 'Present' ? new Date() : workplace.to;
    const years = differenceInYears(to, from);
    const months = differenceInMonths(to, from) % 12;

    const { expanded, handleMouseEnter, handleMouseLeave, handleToggle } =
        useExpandable();

    return (
        <div
            className={`max-w-screen-sm flex flex-col bg-card-background-color p-6 rounded-lg shadow-lg ${styles.expandable} ${expanded ? styles.expanded : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='flex md:flex-row flex-col justify-between'>
                <h3 className='text-2xl'>{workplace.title}</h3>
                <div className='flex'>
                    <span>
                        {workplace.from.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                        })}
                    </span>
                    &nbsp;-&nbsp;
                    <span>
                        {typeof workplace.to === 'string'
                            ? workplace.to
                            : workplace.to.toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                              })}
                    </span>
                    <span className='flex'>
                        {(years > 0 || months > 0) && ', '}
                        {years > 0 && `${years} yrs `}
                        {months > 0 && `${months} mos`}
                    </span>
                </div>
            </div>
            <div className='flex items-center justify-between mt-2'>
                <a
                    href={workplace.companyUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${styles.link} underline underline-offset-4 text-blue-600 hover:text-blue-800 font-medium`}
                >
                    {workplace.company}
                </a>
            </div>
            {workplace.techStack && (
                <p className='mt-2'>
                    <strong>Tech Stack:</strong> {workplace.techStack}
                </p>
            )}
            <p className='mt-4 text-justify md:text-left'>
                {workplace.description}
            </p>
            <div
                className={`${styles.details} ${expanded ? styles.expanded : ''}`}
            >
                <div className='mt-4'>
                    <strong>Responsibilities:</strong>
                    <ul className='list-disc list-inside '>
                        {workplace.responsibilities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>

                {workplace.achievements &&
                    workplace.achievements.length > 0 && (
                        <div className='mt-4'>
                            <strong>Achievements:</strong>
                            <ul className='list-disc list-inside '>
                                {workplace.achievements.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>
            <Button onClick={handleToggle} className='mt-4'>
                <>{expanded ? 'Hide details' : 'Show details'}</>
            </Button>
        </div>
    );
}
