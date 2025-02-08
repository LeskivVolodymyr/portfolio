import Image from 'next/image';
import styles from './CarouselCard.module.scss';

export interface ICarouselCardProps {
    image: string;
    title?: string;
    description?: string;
    hightlighted?: boolean;
}

export function CarouselCard({
    image,
    title,
    description,
    hightlighted = true,
}: ICarouselCardProps) {
    return (
        <div className='bg-card-background-color rounded-lg shadow-lg p-4 h-full mx-4'>
            <div className={`flex justify-center`}>
                <Image
                    className={`w-32 h-32 p-4 ${hightlighted ? styles.highlight : ''}`}
                    src={`/images/svg/${image}`}
                    width={500}
                    height={500}
                    alt='typescript'
                />
            </div>
            <div className='text-center mt-4'>
                <h3 className='text-xl font-semibold'>{title}</h3>
                <p className='text-gray-500'>{description}</p>
            </div>
        </div>
    );
}
