import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
    onSSOClick?: () => void
    onCreatePasswordClick?: () => void
}

export function WelcomeScreen({ onSSOClick, onCreatePasswordClick }: WelcomeScreenProps) {
    return (
        <div className="space-y-6">
            {/* Heading - Center aligned, clear hierarchy */}
            <div className="text-center space-y-2">
                <h1 className="text-primary text-xl font-semibold">
                    Welcome, teacher
                </h1>
                <p className="text-sm text-white/50">
                    To continue, login or create password
                </p>
            </div>

            {/* Actions Card */}
            <div className="bg-[#252B3B] rounded-xl p-5 space-y-4">
                <Button
                    size="lg"
                    className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={onSSOClick}
                >
                    Login with SSO
                </Button>

                {/* Divider */}
                <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#252B3B] px-3 text-white/30 tracking-wider">
                            Or setup manually
                        </span>
                    </div>
                </div>

                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full h-12 text-sm font-normal bg-[#3A4154] hover:bg-[#454D63] text-white/80 border-0"
                    onClick={onCreatePasswordClick}
                >
                    Create Password
                </Button>
            </div>

            {/* Legal - smaller, single line */}
            <p className="text-center text-[10px] text-white/25 leading-relaxed">
                By continuing, you agree to our{" "}
                <span className="text-primary/50 hover:text-primary/70 cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="text-primary/50 hover:text-primary/70 cursor-pointer">Privacy Policy</span>.
            </p>
        </div>
    )
}
