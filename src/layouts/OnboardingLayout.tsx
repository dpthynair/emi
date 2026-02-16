import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { PillButton } from "@/components/PillButton"
import { Maximize2, Minimize2 } from "lucide-react"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"
import { getAssetPath } from "@/lib/utils"
interface OnboardingLayoutProps {
    children: ReactNode
    schoolName?: string
    schoolLogoUrl?: string
}

/**
 * OnboardingLayout - Split Screen Design
 * Left: Hero with branding
 * Right: Auth content with school info
 */
export function OnboardingLayout({
    children,
    schoolName = "Förskolan Solgläntan",
    schoolLogoUrl = "/schoollogo.png"
}: OnboardingLayoutProps) {
    const { language, setLanguage } = useLanguage()


    console.log(import.meta.env.VITE_BASE_PATH);
    

    const t = {
        en: {
            changeLang: "Change language",
            heroTitle: "Your Teaching Partner in Every Tap",
            heroDesc: "Curriculum-based learning activities designed for your classroom. Track student progress, manage activities, and create engaging educational experiences with your friendly penguin guide!",
            support: "Support",
            howItWorks: "How it works?",
            copyright: "© 2026 eMi. All rights reserved."
        },
        sv: {
            changeLang: "Byt språk",
            heroTitle: "Din partner i undervisningen",
            heroDesc: "Läroplansbaserade lärandeaktiviteter designade för ditt klassrum. Följ elevernas framsteg, hantera aktiviteter och skapa engagerande pedagogiska upplevelser med din vänliga pingvinguide!",
            support: "Support",
            howItWorks: "Hur fungerar det?",
            copyright: "© 2026 eMi. All rights reserved."
        }
    }[language]

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
        <div className="dark h-screen overflow-hidden bg-background text-foreground flex">
            {/* Left Panel - Hero */}
            <div className="hidden lg:flex lg:w-1/2 flex-col relative bg-[#0D1321]">
                {/* Hero Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-100"
                    style={{ backgroundImage: `url(${getAssetPath("hero.jpg")})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321] via-[#0D1321]/70 to-[#0D1321]/30" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">
                    {/* Top Bar: Logo + Language */}
                    <div className="flex items-start justify-between mb-auto">
                        {/* Logo */}
                        <img src="/eMi-logoyellow.svg" alt="eMi" className="h-[100px]" />

                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 text-white/50">
                            <span className="text-xs">{t.changeLang}</span>
                            <LanguageSelector
                                currentLanguage={language}
                                onLanguageChange={setLanguage}
                            />
                        </div>
                    </div>

                    {/* Hero Content - Centered Text and Actions */}
                    <div className="flex flex-col items-center text-center space-y-8 mb-12">
                        {/* Hero Text */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white leading-tight">
                                {t.heroTitle}
                            </h2>
                            <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed">
                                {t.heroDesc}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-all hover:scale-105 active:scale-95">
                                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                {t.support}
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-all hover:scale-105 active:scale-95">
                                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t.howItWorks}
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 mb-4">
                        <p className="text-xs text-white/30 tracking-wide font-light">
                            {t.copyright}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Auth Content */}
            <div className="w-full lg:w-1/2 flex flex-col h-screen relative overflow-hidden bg-[#1A1F2E] bg-gradient-to-b from-[#161B28] via-[#1A1F2E] to-[#161B28]">
                {/* Soft Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />

                {/* Mobile Logo (shown only on small screens) */}
                <div className="lg:hidden p-4 relative z-10">
                    <img src="/eMi-logoyellow.svg" alt="eMi" className="h-10" />
                </div>

                {/* School Branding - Fixed at Top */}
                <div className="flex flex-col items-center pt-10 lg:pt-16 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-white p-2 mb-4 shadow-2xl shadow-black/20 overflow-hidden ring-4 ring-white/5">
                        <img
                            src={schoolLogoUrl}
                            alt={schoolName}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium text-white/40 tracking-wide uppercase">
                        {schoolName}
                    </span>
                </div>

                {/* Centered Content Container */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 pb-16">
                    {/* Main Content */}
                    <div className="w-full max-w-sm relative z-10">
                        {children}
                    </div>
                </div>
            </div>

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
        </div>
    )
}
