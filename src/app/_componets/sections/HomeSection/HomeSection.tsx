'use client'

import Image from 'next/image'
import bob from "../../../../../public/images/random-dude.png";
import Button, {ButtonType} from "@/app/_componets/Buton/Button";
import DotIcon from "@/app/_componets/icons/DotIcon/DotIcon";
import LinkedInIcon from "@/app/_componets/icons/LinkedInIcon/LinkedInIcon";
import {useState} from "react";
import SocialLink from "@/app/_componets/SocialLink/SocialLink";
import LinkedInSocialLink from "@/app/_componets/social-links/LinkedInSocialLink/LinkedInSocialLink";

export default function HomeSection() {
    const [buttonsColor, setButtonsColor] = useState('#F8F8F2');
    return (
         <div className="flex flex-col place-content-center flex-wrap  md:flex-row">
            <div className="flex flex-col self-center flex-1">
                <h1 className="text-7xl">HI, I AM <br/> VOLODYMYR LESKIV.</h1>
                <div className='pb-10'>
                    <span>A senior full-stack developer.</span>
                </div>
                <div className='flex gap-4'>
                    <Button
                        onMouseEnter={() => setButtonsColor('#282A36')}
                        onMouseLeave={() => setButtonsColor('#F8F8F2')}
                    >
                        <span className="flex">
                            CONTACT ME
                            <span className="flex items-center pl-6">
                                <DotIcon color={buttonsColor}/>
                            </span>
                        </span>
                    </Button>
                    <LinkedInSocialLink/>
                </div>
            </div>
            <div className="flex-1">
                <Image
                    src={bob}
                    alt="Bob"
                    sizes="(max-width: 768px) 100vw, 600px"
                    width={500}
                />
            </div>
        </div>
    );
}
