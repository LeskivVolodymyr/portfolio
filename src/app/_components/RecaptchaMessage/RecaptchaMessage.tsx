import Link from 'next/link';
import React from 'react';

export default function RecaptchaMessage() {
    return (
        <div className='flex flex-row'>
            <span>
                This site is protected by reCAPTCHA and the Google{' '}
                <Link
                    target='_blank'
                    href='https://policies.google.com/privacy'
                    className='underline underline-offset-4 interactive-element'
                >
                    Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                    target='_blank'
                    href='https://policies.google.com/terms'
                    className='underline underline-offset-4 interactive-element'
                >
                    Terms of Service
                </Link>{' '}
                apply.
            </span>
        </div>
    );
}
