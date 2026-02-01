import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreatePasswordScreenProps {
    onProceed?: () => void
    onBack?: () => void
}

export function CreatePasswordScreen({ onProceed, onBack }: CreatePasswordScreenProps) {
    return (
        <div className="space-y-6">
            {/* Heading - Center aligned */}
            <div className="text-center space-y-2">
                <h1 className="text-primary text-xl font-semibold">
                    Create Password
                </h1>
                <p className="text-sm text-white/50">
                    Set up a secure password for your account
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-[#252B3B] rounded-xl p-5">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onProceed?.() }}>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="password" className="text-xs font-normal text-white/40">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="h-11 text-sm px-3 bg-[#1A1F2E] border-white/10 text-white placeholder:text-white/25"
                        />
                        <p className="text-xs text-white/30">
                            Must be at least 8 characters long.
                        </p>
                    </div>

                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="confirm-password" className="text-xs font-normal text-white/40">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="h-11 text-sm px-3 bg-[#1A1F2E] border-white/10 text-white placeholder:text-white/25"
                        />
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
                    >
                        Proceed
                    </Button>
                </form>
            </div>

            {/* Back Link */}
            <div className="text-center">
                <Button
                    variant="link"
                    className="text-white/40 hover:text-white/60 text-xs p-0 h-auto"
                    onClick={onBack}
                >
                    ← Back to Welcome
                </Button>
            </div>
        </div>
    )
}
