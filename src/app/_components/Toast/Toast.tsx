import React, { forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, Bounce, toast, ToastOptions } from 'react-toastify';
import { useTheme } from '@/app/context/ThemeContext';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastRef = {
    show: (message: string, type?: ToastType) => void;
};

const Toast = forwardRef<ToastRef, unknown>(function InternalToast(_, ref) {
    const { theme } = useTheme();

    const show = (message: string, type: ToastType | undefined = 'success') => {
        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            case 'info':
                toast.info(message, options);
                break;
            case 'warning':
                toast.warning(message, options);
                break;
            default:
                toast(message, options);
                break;
        }
    };

    const options: ToastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === 'dark' ? 'dark' : 'light',
        transition: Bounce,
    };

    useImperativeHandle(ref, () => ({
        show,
    }));

    return <ToastContainer />;
});

export default Toast;
