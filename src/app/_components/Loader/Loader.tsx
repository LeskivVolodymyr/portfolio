import React from 'react';
import styles from './Loader.module.scss';

export default function Loader() {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50'>
            <div className={styles['lds-spinner']}>
                {Array(12)
                    .fill(null)
                    .map((_, index) => (
                        <div key={index}></div>
                    ))}
            </div>
        </div>
    );
}
