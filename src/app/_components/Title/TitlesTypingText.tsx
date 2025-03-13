'use client';

import { TypeAnimation } from 'react-type-animation';

export default function TitlesTypingText() {
    return (
        <TypeAnimation
            preRenderFirstString={true}
            sequence={[
                'Full-stack developer',
                1000,
                'Web developer',
                1000,
                'Front-end developer',
                1000,
                'Back-end developer',
                1000,
                'Creative coder',
                1000,
                'Innovative thinker',
                1000,
                'Software engineer',
                1000,
            ]}
            speed={20}
            repeat={Infinity}
        />
    );
}
