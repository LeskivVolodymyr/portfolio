import { IIconProps } from '@/app/_components/icons/icon-props';

export default function LinkedInIcon({ color = '#000' }: IIconProps) {
    return (
        <svg width='19.75' height='19.8'>
            <path
                d='m2.38,4.78c1.31,0 2.37,-1.06 2.37,-2.37c0,-1.31 -1.06,-2.37 -2.37,-2.37c-1.31,0 -2.37,1.06 -2.37,2.37c0,1.31 1.06,2.37 2.37,2.37z'
                fill={color}
            />
            <path
                d='m6.95,6.65l0,13.15l4.08,0l0,-6.5c0,-1.72 0.32,-3.38 2.45,-3.38c2.1,0 2.12,1.96 2.12,3.49l0,6.39l4.09,0l0,-7.21c0,-3.54 -0.76,-6.26 -4.9,-6.26c-1.99,0 -3.32,1.09 -3.87,2.12l-0.05,0l0,-1.8l-3.92,0zm-6.66,0l4.09,0l0,13.15l-4.09,0l0,-13.15z'
                fill={color}
            />
        </svg>
    );
}
