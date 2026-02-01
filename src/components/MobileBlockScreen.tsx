import { motion } from "framer-motion"

export function MobileBlockScreen() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#0B0F1A] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Logo Section */}
                <div className="mb-10 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
                    <img
                        src="/eMi-logoyellow.svg"
                        alt="eMi Logo"
                        className="w-16 h-16 relative z-10 drop-shadow-[0_4px_12px_rgba(248,203,22,0.3)]"
                    />
                </div>

                {/* Message Section */}
                <div className="space-y-4">
                    <h1 className="text-white text-xl font-semibold leading-tight max-w-[280px] mx-auto">
                        This experience is designed for tablets and larger screens.
                    </h1>
                    <p className="text-white/40 text-sm font-medium tracking-wide">
                        Please switch to a tablet or desktop to continue.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
