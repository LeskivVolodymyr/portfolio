import ReCAPTCHA from 'react-google-recaptcha';
import React, { RefObject } from 'react';

interface IRecaptcha {
    recaptchaRef: RefObject<ReCAPTCHA | null>;
}

export default function Recaptcha({ recaptchaRef }: IRecaptcha) {
    return (
        <div aria-hidden className='hidden'>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                ref={recaptchaRef}
                size='invisible'
            />
        </div>
    );
}
