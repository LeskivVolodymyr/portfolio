import Image from 'next/image';
import HomeContacts from '@/app/_components/HomeContacts/HomeContacts';
import bob from '../../../../../public/images/random-dude.png';

export default function HomeSection() {
    return (
        <div className='flex flex-col place-content-center flex-wrap  md:flex-row'>
            <div className='flex flex-col self-center flex-1'>
                <h1 className='text-7xl'>
                    HI, I AM <br /> VOLODYMYR LESKIV.
                </h1>
                <div className='pb-10'>
                    <span>A senior full-stack developer.</span>
                </div>
                <HomeContacts />
            </div>
            <div className='flex-1 mt-7 md:mt-0'>
                <Image
                    src={bob}
                    alt='Bob'
                    sizes='(max-width: 768px) 100vw, 450px'
                    width={450}
                />
            </div>
        </div>
    );
}
