import path from 'path';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import type { NextConfig } from 'next';

function config (phase: string): NextConfig  {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const projectRoot = path.resolve(__dirname);

    return {
        assetPrefix: isDev ? undefined : '/',
        turbopack: { root: projectRoot } as any,
        webpack: (config: any, { dev }: any) => {
            if (isDev || dev) {
                config.watchOptions = {
                    poll: 1000,
                    aggregateTimeout: 300,
                };
            }
            return config;
        },
    };
}

export default config;
