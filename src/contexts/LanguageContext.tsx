import { createContext, useContext, useState, type ReactNode } from "react"
import type { LanguageCode } from "@/components/LanguageSelector"

import { translations, type TranslationKey } from "@/lib/translations"

interface LanguageContextType {
    language: LanguageCode
    setLanguage: (lang: LanguageCode) => void
    t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<LanguageCode>("en")

    const t = (key: TranslationKey): string => {
        return (translations[language] as any)[key] || (translations.en as any)[key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
