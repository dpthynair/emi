import { useState,useEffect } from "react"
import { Sidebar } from "@/components/Sidebar"
import { MOCK_STUDENT_DATA, AVATAR_MAP } from "./DashboardScreen"
import { KidCard } from "@/components/KidCard"
import { TeacherUnlockModal } from "@/components/modals/TeacherUnlockModal"
import { KidGameScreen } from "./KidGameScreen"
import { MascotIntroScreen } from "./MascotIntroScreen"

// Note: Ensure TeacherUnlockModal import is correct relative to file structure. 
// Previous file showed explicit usage. I will preserve usage pattern.

export function KidsGameEntryScreen({ onExit }: { onExit?: () => void }) {
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false)

    // State Logic: Decoupled View from Active Kid Identity
    const [activeKidId, setActiveKidId] = useState<string | null>(null)
    // viewMode: 'grid' (Selection), 'intro' (Mascot), 'game' (Play)
    const [viewMode, setViewMode] = useState<'grid' | 'intro' | 'game'>('grid')

    const activeKid = activeKidId ? MOCK_STUDENT_DATA.find(k => k.id === activeKidId) : null
    const kidAvatarUrl = activeKid ? (AVATAR_MAP[activeKid.avatar] || AVATAR_MAP["apple"]) : undefined



    // Navigation Handlers
    const handleKidSelect = (id: string) => {
        setActiveKidId(id)
        setViewMode('intro')
        // if (activeKidId && viewMode === 'intro') window.location.href = 'https://sunny-again-nawa.vercel.app/'
    }

    const handleBackToGrid = () => {
        setViewMode('grid')
        // Guardrail: We do NOT clear activeKidId, allowing Sidebar to show the "currently selected" user
    }

    const handleMascotClick = () => {
        // "Always navigate to Mascot Intro page"
        if (activeKidId) setViewMode('intro')
    }

    const handlePlayGame = () => {
        setViewMode('game')
    }

    const handleUnlockRequest = () => {
        setIsUnlockModalOpen(true)
    }

    // Modal Logic
    const renderUnlockModal = () => (
        isUnlockModalOpen && (
            <TeacherUnlockModal
                onClose={() => setIsUnlockModalOpen(false)}
                onConfirm={() => {
                    setIsUnlockModalOpen(false)
                    onExit?.()
                }}
            />
        )
    )

    // View: Game
    if (viewMode === 'game' && activeKidId) {
        return (
            <>
                <KidGameScreen
                    kidAvatar={kidAvatarUrl!}
                    mascotAvatar="/game/mascotavatar.png"
                    onBack={handleBackToGrid}
                    onMascotClick={handleMascotClick}
                    onUnlockRequest={handleUnlockRequest}
                />
                {renderUnlockModal()}
            </>
        )
    }

    // View: Intro
    if (viewMode === 'intro' && activeKidId) {
        return (
            <>
                <MascotIntroScreen
                    kidAvatar={kidAvatarUrl!}
                    mascotAvatar="/game/mascotavatar.png"
                    onBack={handleBackToGrid}
                    onMascotClick={handleMascotClick}
                    onPlay={handlePlayGame}
                    onUnlockRequest={handleUnlockRequest}
                />
                {renderUnlockModal()}
            </>
        )
    }

    // View: Grid (Selection)
    return (
        <div className="h-screen w-full bg-canvas overflow-hidden p-canvas gap-canvas select-none font-sans flex text-[#1A1F2E]">
            {/* Left Sidebar */}
            {/* Shows avatars IFF a kid has been selected at least once (activeKidId exists) */}
            <Sidebar
                variant="kids"
                activeView="kids"
                kidAvatar={kidAvatarUrl}
                mascotAvatar={activeKidId ? "/game/mascotavatar.png" : undefined}
                handOverActive={true}
                onHandOverChange={handleUnlockRequest}
                onKidAvatarClick={handleBackToGrid}
                onMascotClick={handleMascotClick}
            />

            {/* Right Content Area - Kids Selection Grid */}
            <main className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[var(--panel-bg-gradient)] rounded-panel relative z-0 border border-panel-border ring-1 ring-inset ring-panel-ring">
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="h-full w-full">
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                            {MOCK_STUDENT_DATA.slice(0, 18).map((kid) => (
                                <KidCard
                                    key={kid.id}
                                    kid={kid}
                                    variant="game"
                                    onClick={() => handleKidSelect(kid.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {renderUnlockModal()}
        </div>
    )
}
