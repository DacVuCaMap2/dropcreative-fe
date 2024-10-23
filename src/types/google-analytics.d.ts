// src/types/google-analytics.d.ts
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event',
            targetId: string,
            config?: Record<string, any>
        ) => void;
        dataLayer: any[];
    }
}
export default global