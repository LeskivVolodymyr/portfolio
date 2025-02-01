import Link from 'next/link';

export default function RecaptchaMessage() {
    const linkClasses = 'underline underline-offset-4 interactive-element';
    return (
        <div className='flex flex-row'>
            <span>
                This site is protected by reCAPTCHA and the Google{' '}
                <Link
                    target='_blank'
                    href='https://policies.google.com/privacy'
                    className={linkClasses}
                >
                    Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                    target='_blank'
                    href='https://policies.google.com/terms'
                    className={linkClasses}
                >
                    Terms of Service
                </Link>{' '}
                apply.
            </span>
        </div>
    );
}
