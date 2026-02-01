import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginScreenProps {
    onLogin?: () => void
    onForgotPassword?: () => void
    onGetStarted?: () => void
}

export function LoginScreen({ onLogin, onForgotPassword, onGetStarted }: LoginScreenProps) {
    return (
        <div className="space-y-6">
            {/* Heading - Center aligned */}
            <div className="text-center space-y-2">
                <h1 className="text-primary text-xl font-semibold">
                    Welcome back
                </h1>
                <p className="text-sm text-white/50">
                    Enter your credentials to continue
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-[#252B3B] rounded-xl p-5">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin?.() }}>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="email" className="text-xs font-normal text-white/40">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="teacher@school.com"
                            className="h-11 text-sm px-3 bg-[#1A1F2E] border-white/10 text-white placeholder:text-white/25"
                        />
                    </div>

                    <div className="space-y-1.5 text-left">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-xs font-normal text-white/40">
                                Password
                            </Label>
                            <button
                                type="button"
                                className="text-xs text-primary/50 hover:text-primary/70"
                                onClick={onForgotPassword}
                            >
                                Forgot password?
                            </button>
                        </div>
                        <Input
                            id="password"
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
                        Login
                    </Button>
                </form>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-xs text-white/40">
                Don't have an account?{" "}
                <button
                    className="text-primary/60 hover:text-primary/80"
                    onClick={onGetStarted}
                >
                    Get started
                </button>
            </p>
        </div>
    )
}
