import { useState, useRef, useEffect } from "react"

export type LanguageCode = "en" | "sv"

interface LanguageSelectorProps {
    currentLanguage?: LanguageCode
    onLanguageChange?: (lang: LanguageCode) => void
}

export const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "sv", label: "Svenska" }
]

export function LanguageSelector({ currentLanguage = "en", onLanguageChange }: LanguageSelectorProps) {
    const [isLangOpen, setIsLangOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const currentLang = LANGUAGES.find(l => l.code === currentLanguage)

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/15 rounded-md text-white text-xs font-medium transition-colors"
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
            >
                <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    <path strokeLinecap="round" strokeWidth="1.5" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{currentLang?.label}</span>
                <svg className={`w-3 h-3 opacity-50 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isLangOpen && (
                <div
                    className="absolute right-0 top-full mt-1 bg-[#1A1F2E] border border-white/10 rounded-md shadow-lg overflow-hidden min-w-[120px] z-[100]"
                    role="listbox"
                >
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            role="option"
                            aria-selected={currentLanguage === lang.code}
                            onClick={() => {
                                onLanguageChange?.(lang.code as LanguageCode)
                                setIsLangOpen(false)
                            }}
                            className={`w-full px-3 py-2 text-left text-xs transition-colors ${currentLanguage === lang.code
                                ? 'bg-primary/20 text-primary font-semibold'
                                : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
