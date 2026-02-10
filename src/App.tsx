import { useState, useEffect } from "react"
import { OnboardingLayout } from "@/layouts/OnboardingLayout"
import { SetupLayout } from "@/layouts/SetupLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FirstTimeSetupScreen } from "@/screens/FirstTimeSetupScreen"
import { VoiceRecordingScreen } from "@/screens/VoiceRecordingScreen"
import { DashboardScreen } from "@/screens/DashboardScreen"
import { MobileBlockScreen } from "@/components/MobileBlockScreen"

import { GroupSelectionScreen } from "@/screens/GroupSelectionScreen"
import { useLanguage } from "@/contexts/LanguageContext"

type Screen = "access" | "email-login" | "first-time-setup" | "voice-recording" | "group-selection" | "dashboard"

function App() {
  const { t } = useLanguage()
  const [currentScreen, setCurrentScreen] = useState<Screen>("access")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return <MobileBlockScreen />
  }

  // Dashboard - Now using the real DashboardScreen
  if (currentScreen === "dashboard") {
    return <DashboardScreen onLogout={() => setCurrentScreen("access")} />
  }

  // Voice Recording screen
  if (currentScreen === "voice-recording") {
    return (
      <SetupLayout title={t('welcomeMaja')} onClose={() => setCurrentScreen("group-selection")}>
        <VoiceRecordingScreen
          onComplete={() => setCurrentScreen("group-selection")}
          onSkip={() => setCurrentScreen("group-selection")}
        />
      </SetupLayout>
    )
  }

  // Group Selection screen
  if (currentScreen === "group-selection") {
    return (
      <SetupLayout
        title={t('welcomeMaja')}
        onClose={() => setCurrentScreen("access")}
        closeLabel={t('logout')}
        showLanguageSelector
      >
        <GroupSelectionScreen
          onSelect={() => setCurrentScreen("dashboard")}
        />
      </SetupLayout>
    )
  }

  // First-time Setup screen (full-screen, post-auth)
  if (currentScreen === "first-time-setup") {
    return (
      <SetupLayout title={t('welcomeMaja')} onClose={() => setCurrentScreen("group-selection")}>
        <FirstTimeSetupScreen
          onContinue={() => setCurrentScreen("voice-recording")}
          onGoBack={() => setCurrentScreen("access")}
          onSkip={() => setCurrentScreen("group-selection")}
        />
      </SetupLayout>
    )
  }

  // Email Login - shown in right column
  if (currentScreen === "email-login") {
    return (
      <OnboardingLayout>
        <div className="space-y-6">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-white text-xl font-semibold">
              {t('emailTitle')}
            </h1>
            <p className="text-sm text-white/50">
              {t('emailDesc')}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#252B3B] rounded-xl p-5">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setCurrentScreen("first-time-setup") }}>
              <div className="space-y-1.5 text-left">
                <Label htmlFor="email" className="text-xs font-normal text-white/50">
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12 text-base px-4 bg-[#1A1F2E] border-white/10 text-white placeholder:text-white/25"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <Label htmlFor="password" className="text-xs font-normal text-white/50">
                  {t('password')}
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="h-12 text-base px-4 bg-[#1A1F2E] border-white/10 text-white placeholder:text-white/25"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/20 bg-[#1A1F2E] text-primary focus:ring-primary" />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-white/40 font-normal cursor-pointer hover:text-white/60 transition-colors"
                  >
                    {t('rememberMe')}
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
              >
                {t('login')}
              </Button>
            </form>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <button
              className="text-xs text-white/40 hover:text-white/60 flex items-center justify-center gap-1.5 mx-auto"
              onClick={() => setCurrentScreen("access")}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('backToLogin')}
            </button>
          </div>
        </div>
      </OnboardingLayout>
    )
  }

  // Access / Welcome screen
  return (
    <OnboardingLayout>
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-primary text-xl font-semibold">
            {t('welcomeTeacher')}
          </h1>
          <p className="text-sm text-white/50">
            {t('loginSub')}
          </p>
        </div>

        {/* Actions Card */}
        <div className="bg-[#252B3B] rounded-xl p-5 space-y-3">
          <Button
            size="lg"
            className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setCurrentScreen("first-time-setup")}
          >
            {t('sso')}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full h-12 text-sm font-normal bg-[#3A4154] hover:bg-[#454D63] text-white/80 border-0"
            onClick={() => setCurrentScreen("email-login")}
          >
            {t('emailLink')}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}

export default App
