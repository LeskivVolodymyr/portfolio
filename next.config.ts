/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import type { NextConfig } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default (phase: string): NextConfig => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;

    return {
        assetPrefix: isDev ? undefined : '/',
        webpack: (config: any) => {
            if (isDev) {
                config.watchOptions = {
                    poll: 1000,
                    aggregateTimeout: 300,
                };
            }

            return config;
        },
    };
};
