import { Button } from "@/components/ui/button"

interface FirstTimeSetupScreenProps {
    userName?: string
    onContinue?: () => void
    onSkip?: () => void
}

/**
 * First-time Setup – Voice Calibration (Optional)
 * 
 * Typography Strategy:
 * - Welcome: 2xl primary (personal, warm)
 * - Section heading: lg white semibold (key message)
 * - Body: base white/60 (explanation)
 * - Fine print: xs white/30 (trust, legal)
 * - CTA: sm semibold (action)
 */
export function FirstTimeSetupScreen({
    onContinue,
    onSkip
}: FirstTimeSetupScreenProps) {
    return (
        <div className="max-w-xl mx-auto flex flex-col items-center gap-10">
            {/* Main Content */}
            <div className="space-y-6">
                {/* Key Message */}
                <h2 className="text-white text-xl font-medium">
                    Just one quick step before we begin
                </h2>

                {/* Explanation */}
                <p className="text-white/60 text-lg leading-relaxed">
                    We'd like to capture a short sample of your voice.
                    This helps eMi ignore your voice during classroom recordings,
                    so we can focus only on the children's activity sounds.
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-4">
                <Button
                    className="h-14 px-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                    onClick={onContinue}
                >
                    Got it, continue
                </Button>

                <button
                    className="text-white/60 text-sm hover:text-white/80 font-medium py-2"
                    onClick={onSkip}
                >
                    Skip for now
                </button>
            </div>

            {/* Fine print */}
            <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto">
                Your voice sample is stored anonymously and can't be traced back to you.
                You can re-record it anytime later from your profile.
            </p>
        </div>
    )
}
