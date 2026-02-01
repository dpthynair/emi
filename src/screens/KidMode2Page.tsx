import { motion } from 'framer-motion'
import { Maximize2, Play } from 'lucide-react'
import { AVATAR_MAP } from '@/screens/DashboardScreen'
import { HandOverToggle } from '@/components/HandOverToggle'

interface KidMode2PageProps {
    kid: {
        id: string;
        avatar: string;
        [key: string]: any;
    };
    onGateRequest: () => void;
    onPlay: () => void;
}

export function KidMode2Page({ kid, onGateRequest, onPlay }: KidMode2PageProps) {
    const kidAvatarUrl = AVATAR_MAP[kid.avatar] || AVATAR_MAP["apple"]

    // Reusing standard eMi tokens for consistency
    const frameTokens = "border border-panel-border ring-1 ring-inset ring-panel-ring shadow-sm rounded-panel"
    const panelBase = "overflow-hidden bg-[var(--panel-bg-gradient)] relative z-0"

    return (
        <div className="h-screen w-full bg-[#0B0F1A] p-canvas overflow-hidden relative font-sans select-none flex">
            {/* Top Sticky Header - Now Action Bar */}
            <header className="fixed top-0 right-0 p-[0.75rem] z-50 pointer-events-none flex items-end gap-2 justify-end">
                {/* Kid Avatar - Floating Separately */}
                <button
                    onClick={onGateRequest}
                    className="w-9 h-9 rounded-full overflow-hidden border shadow-lg active:scale-95 transition-all pointer-events-auto flex-shrink-0"
                    style={{
                        backgroundColor: 'var(--km2-avatar-bg)',
                        backdropFilter: 'blur(var(--km2-action-blur))',
                        borderColor: 'var(--km2-avatar-border)'
                    }}
                >
                    <img src={kidAvatarUrl} alt={kid.id} className="w-full h-full object-contain p-1" />
                </button>

                <div
                    className="border rounded-full h-9 px-2.5 flex items-center gap-3 pointer-events-auto"
                    style={{
                        backgroundColor: 'var(--km2-action-bg)',
                        backdropFilter: 'blur(var(--km2-action-blur))',
                        borderColor: 'var(--km2-action-border)',
                        boxShadow: 'var(--km2-action-shadow)'
                    }}
                >
                    <HandOverToggle
                        isActive={true}
                        onChange={() => onGateRequest()}
                        variant="light"
                        orientation="horizontal"
                        size="small"
                    />

                    <div className="w-[1px] h-5" style={{ backgroundColor: 'var(--km2-action-separator)' }} />

                    <button
                        onClick={() => {
                            if (document.fullscreenElement) {
                                document.exitFullscreen()
                            } else {
                                document.documentElement.requestFullscreen()
                            }
                        }}
                        className="w-7 h-7 flex items-center justify-center transition-colors active:scale-90"
                        style={{ color: 'var(--km2-action-icon)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--km2-action-icon-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--km2-action-icon)'}
                    >
                        <Maximize2 size={16} strokeWidth={2} />
                    </button>
                </div>
            </header>

            {/* Main Centered Gameplay Container (Identical to Mode 1, Column 3) */}
            <main className={`h-full w-full flex-1 flex items-center justify-center ${panelBase} ${frameTokens}`}>
                <img
                    src="/game/3rdcolumnbg.jpg"
                    alt="Background"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Central Focus (Mascot + Play Button) */}
                <div className="relative z-10 flex flex-col items-center gap-12">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src="/game/mascot.png"
                        alt="Mascot"
                        className="max-h-[50vh] w-auto object-contain drop-shadow-2xl"
                    />

                    {/* Play CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onPlay}
                        className="w-20 h-20 bg-[#EF4444] rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all z-10"
                    >
                        <Play size={32} fill="currentColor" strokeWidth={0} className="ml-1" />
                    </motion.button>
                </div>
            </main>

            {/* Bottom-Right - Now Logo */}
            <footer className="fixed bottom-0 right-0 z-50 pointer-events-none p-[2rem]">
                <img
                    src="/eMi-logoyellow.svg"
                    alt="eMi"
                    className="h-12 w-auto object-contain pointer-events-auto"
                    style={{
                        filter: 'brightness(0) invert(1)',
                        opacity: 'var(--km2-logo-opacity)'
                    }}
                />
            </footer>
        </div>
    )
}
