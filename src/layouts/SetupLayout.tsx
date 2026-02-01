import { useState, useEffect, type ReactNode } from "react"
import { ConfirmModal } from "@/components/ui/confirm-modal"
import { PillButton } from "@/components/PillButton"
import { Maximize2, Minimize2 } from "lucide-react"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"

interface SetupLayoutProps {
    children: ReactNode
    title?: string
    onClose?: () => void
    closeLabel?: string
    skipConfirmation?: boolean
    showLanguageSelector?: boolean
}

/**
 * SetupLayout - Full Screen Dark Layout
 * 
 * Used for post-auth setup steps (not split screen).
 * Logo top-left, X button top-right, content centered.
 */
export function SetupLayout({
    children,
    title,
    onClose,
    closeLabel,
    skipConfirmation = false,
    showLanguageSelector = false
}: SetupLayoutProps) {
    const { language, setLanguage } = useLanguage()
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        confirmLabel: string;
    }>({
        isOpen: false,
        title: "",
        message: "",
        confirmLabel: "Confirm"
    })

    const handleAction = () => {
        if (!onClose) return

        if (skipConfirmation) {
            onClose()
            return
        }

        const isLogout = closeLabel?.toLowerCase().includes("logout")

        setModalConfig({
            isOpen: true,
            title: isLogout ? "Logging out?" : "Skip this step?",
            message: isLogout
                ? "Are you sure you want to log out of your session?"
                : "You can always complete your voice setup later from your account settings.",
            confirmLabel: isLogout ? "Log out" : "Skip step"
        })
    }

    const handleConfirm = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }))
        onClose?.()
    }

    const isLogout = closeLabel?.toLowerCase().includes("logout")

    // Full View state
    const [isFullView, setIsFullView] = useState(false)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullView(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <div className="dark h-screen overflow-hidden relative bg-[#1A2332] bg-gradient-to-b from-[#161D2B] via-[#1A2332] to-[#161D2B] text-foreground flex flex-col">
            {/* Soft Radial Glow - Centered in screen */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/2 opacity-[0.05] blur-[120px] pointer-events-none rounded-full" />

            {/* Header - In flow to provide top weighting */}
            <header className="w-full h-24 grid grid-cols-3 items-center px-6 lg:px-8 z-50 flex-shrink-0">
                {/* Logo slot */}
                <div className="flex justify-start">
                    <img src="/eMi-logoyellow.svg" alt="eMi" className="h-10 block" />
                </div>

                {/* Title slot */}
                <div className="flex justify-center h-full items-center">
                    {title && (
                        <h1 className="text-primary text-2xl font-semibold whitespace-nowrap leading-none m-0 p-0 transform -translate-y-[1px]">
                            {title}
                        </h1>
                    )}
                </div>

                {/* Action Button slot */}
                <div className="flex justify-end items-center gap-4">
                    {showLanguageSelector && (
                        <>
                            <LanguageSelector
                                currentLanguage={language}
                                onLanguageChange={setLanguage}
                            />
                            {/* Vertical Separator */}
                            <div className="h-4 w-px bg-white/10" />
                        </>
                    )}

                    {onClose && (
                        <button
                            onClick={handleAction}
                            className={`flex items-center gap-2 transition-colors border border-white/5 shadow-xl leading-none
                                ${closeLabel
                                    ? "px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80"
                                    : "p-3 rounded-full bg-black/40 hover:bg-black/60"} 
                                text-white/80 hover:text-white`}
                            aria-label={closeLabel || "Close"}
                        >
                            {closeLabel && (
                                <span className="text-sm font-medium pr-1">{closeLabel}</span>
                            )}
                            {isLogout ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </header>

            {/* Content - Visual Center (balanced between header and ghost footer) */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 min-h-0 relative z-10">
                <div className="w-full text-center">
                    {children}
                </div>
            </main>

            {/* Ghost Spacer - Matches header height to ensure perfect vertical symmetry */}
            <div className="h-24 w-full flex-shrink-0" aria-hidden="true" />

            {/* Floating Full View FAB */}
            <div className="fixed bottom-6 right-6 z-[100]">
                <PillButton
                    icon={isFullView ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    variant="ghost"
                    onClick={() => {
                        if (isFullView) {
                            document.exitFullscreen();
                        } else {
                            document.documentElement.requestFullscreen();
                        }
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white/60 hover:text-white"
                />
            </div>

            {/* Custom Modern Alert */}
            <ConfirmModal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                confirmLabel={modalConfig.confirmLabel}
                cancelLabel="Keep going"
                onConfirm={handleConfirm}
                onCancel={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    )
}
