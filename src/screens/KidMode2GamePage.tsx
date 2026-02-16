import { Maximize2 } from 'lucide-react'
import { AVATAR_MAP } from "@/mocks/dashboard.mock"
import { HandOverToggle } from '@/components/HandOverToggle'

interface KidMode2GamePageProps {
    kid: {
        id: string;
        avatar: string;
        [key: string]: any;
    };
    onGateRequest: () => void;
    onBack?: () => void;
}

export function KidMode2GamePage({ kid, onGateRequest, onBack }: KidMode2GamePageProps) {
    const kidAvatarUrl = AVATAR_MAP[kid.avatar] || AVATAR_MAP["apple"]

    // Reusing standard eMi tokens for consistency
    const frameTokens = "border border-panel-border ring-1 ring-inset ring-panel-ring shadow-sm rounded-panel"
    const panelBase = "overflow-hidden bg-[var(--panel-bg-gradient)] relative z-0"


    return (
        <div className="h-screen w-full bg-[#0B0F1A] p-canvas overflow-hidden relative font-sans select-none flex gap-canvas">
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
                    className="border rounded-full h-9 px-2.5 flex items-center gap-3 shadow-2xl pointer-events-auto transition-all"
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

            {/* Column 1 - Game Visual Context */}
            <section
                onClick={onBack}
                className={`h-full flex-[3] ${panelBase} ${frameTokens} cursor-pointer active:opacity-90 transition-opacity`}
            >
                <img
                    src="/game/2ndcolumn.jpg"
                    alt="Context"
                    className="h-full w-full object-cover"
                />
            </section>

            {/* Column 2 - Focus / Mascot Panel */}
            <section className={`h-full flex-1 flex items-center justify-center ${panelBase} ${frameTokens}`}>
                <img
                    src="/game/3rdcolumnbg.jpg"
                    alt="Background"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <img
                    src="/game/mascot.png"
                    alt="Mascot"
                    className="relative z-10 max-h-[60%] max-w-[70%] w-auto object-contain animate-in fade-in zoom-in duration-700"
                />
            </section>

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
