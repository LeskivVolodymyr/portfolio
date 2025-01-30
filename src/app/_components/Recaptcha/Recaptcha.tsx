import ReCAPTCHA from 'react-google-recaptcha';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { ToastContainer, toast, Bounce } from 'react-toastify';

interface IRecaptchaProps {
    onVerifyChanged: (isVerified: boolean) => void;
}

export default function Recaptcha({ onVerifyChanged }: IRecaptchaProps) {
    const { theme } = useTheme();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [recaptchaKey, setRecaptchaKey] = useState(0);

    useEffect(() => {
        onVerifyChanged(isVerified);
    }, [isVerified, onVerifyChanged]);

    useEffect(() => {
        if (recaptchaRef.current) setRecaptchaKey((prevKey) => prevKey + 1);
    }, [theme]);

    async function handleCaptchaSubmission(token: string | null) {
        try {
            if (token) {
                const response = await fetch('/api/recaptcha', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const isValid = response.ok;
                setIsVerified(isValid);
                if (!isValid) {
                    recaptchaRef.current!.reset();
                    toastError('Failed to verify. Please try again.');
                    // log this error
                    //const validationResponse = await response.json();
                    //logger.log(`Failed to verify ${validationResponse}`);
                }
            }
        } catch {
            // TODO: add logger
            setIsVerified(false);
        }
    }

    function handleExpired() {
        setIsVerified(false);
    }

    // TODO: move this to a toast service
    const toastError = (message: string) => {
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
        });
    };

    return (
        <>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                theme={theme}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
                onExpired={handleExpired}
                key={recaptchaKey}
            />
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Bounce}
            />
        </>
    );
}
