import { WorkPlaceItem } from '@/app/_components/sections/MyExperienceSection/work-history';
import { differenceInMonths, differenceInYears } from 'date-fns';
import styles from './Workplace.module.scss';

export default function Workplace({ workplace }: { workplace: WorkPlaceItem }) {
    const from = workplace.from;
    const to = workplace.to === 'Present' ? new Date() : workplace.to;
    const years = differenceInYears(to, from);
    const months = differenceInMonths(to, from) % 12;

    return (
        <div className='flex flex-col'>
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
            <a
                href={workplace.companyUrl}
                target='_blank'
                className={`${styles.link} underline underline-offset-4`}
            >
                {workplace.company}
            </a>
            <p className='mt-2  text-justify md:text-left'>
                {workplace.description}
            </p>
        </div>
    );
}
