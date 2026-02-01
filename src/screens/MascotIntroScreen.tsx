import { Sidebar } from "@/components/Sidebar"
import { Play } from "lucide-react"

interface MascotIntroScreenProps {
    kidAvatar: string;
    onBack: () => void;
    onUnlockRequest: () => void;
    mascotAvatar?: string;
    onMascotClick?: () => void;
    onPlay: () => void;
}

export function MascotIntroScreen({
    kidAvatar,
    onBack,
    onUnlockRequest,
    mascotAvatar,
    onMascotClick,
    onPlay
}: MascotIntroScreenProps) {
    // Shared Layout Tokens
    const frameTokens = "border border-panel-border ring-1 ring-inset ring-panel-ring shadow-sm rounded-panel"
    const panelBase = "overflow-hidden bg-[var(--panel-bg-gradient)] relative z-0"

    return (
        <div className="h-screen w-full bg-canvas overflow-hidden p-canvas gap-canvas select-none font-sans flex text-[#1A1F2E]">
            {/* Sidebar (Unchanged) */}
            <Sidebar
                variant="kids"
                activeView="kids"
                kidAvatar={kidAvatar}
                handOverActive={true}
                onHandOverChange={() => onUnlockRequest()}
                onKidAvatarClick={onBack}
                mascotAvatar={mascotAvatar}
                onMascotClick={onMascotClick}
            />

            {/* Main Content Column (Originally 3rd column, now Main) */}
            <section
                className={`h-full flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat ${panelBase} ${frameTokens}`}
                style={{ backgroundImage: "url('/game/3rdcolumnbg.jpg')" }}
            >
                {/* Mascot (Using existing sizing constraints) */}
                <img
                    src="/game/mascot.png"
                    alt="Mascot"
                    className="max-h-[60%] max-w-[70%] w-auto object-contain animate-in fade-in zoom-in duration-700"
                />

                {/* Play Button CTA */}
                <button
                    onClick={onPlay}
                    className="absolute bottom-12 right-12 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all z-10"
                    aria-label="Play Game"
                >
                    <Play size={40} fill="currentColor" strokeWidth={0} className="ml-2" />
                </button>
            </section>
        </div>
    )
}
