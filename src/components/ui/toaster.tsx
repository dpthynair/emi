import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export const toast = {
    success: (message: string) => dispatch('success', message),
    error: (message: string) => dispatch('error', message),
};

const dispatch = (type: 'success' | 'error', message: string) => {
    window.dispatchEvent(new CustomEvent('app-toast', { detail: { type, message } }));
};

export function Toaster() {
    const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error'; message: string }[]>([]);

    useEffect(() => {
        const handleToast = (e: CustomEvent) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { id, ...e.detail }]);
            // Auto remove after 3s
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3000);
        };
        window.addEventListener('app-toast', handleToast as any);
        return () => window.removeEventListener('app-toast', handleToast as any);
    }, []);

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`
                            pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md
                            ${t.type === 'success' ? 'bg-white/90 border-green-200 text-green-800' : 'bg-white/90 border-red-200 text-red-800'}
                        `}
                    >
                        <div className={`p-1 rounded-full ${t.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                            {t.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </div>
                        <p className="text-sm font-semibold">{t.message}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
