import { Sidebar } from "@/components/Sidebar"

interface KidGameScreenProps {
    kidAvatar: string;
    onBack: () => void;
    onUnlockRequest: () => void;
    mascotAvatar?: string;
    onMascotClick?: () => void;
}

export function KidGameScreen({ kidAvatar, onBack, onUnlockRequest, mascotAvatar, onMascotClick }: KidGameScreenProps) {
    // Tokens for the "Frame" look (Border, Ring, Radius, Shadow)
    const frameTokens = "border border-panel-border ring-1 ring-inset ring-panel-ring shadow-sm rounded-panel"

    // Panel base (Background, overflow)
    const panelBase = "overflow-hidden bg-[var(--panel-bg-gradient)] relative z-0"

    return (
        <div className="h-screen w-full bg-canvas overflow-hidden p-canvas gap-canvas select-none font-sans flex text-[#1A1F2E]">
            {/* Column 1 - Sidebar */}
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

            {/* Column 2 - Game Visual Panel */}
            {/* Uses an overlay for the frame tokens because the <img> tag would otherwise obscure the inset ring/border */}
            {/* Hidden on Tablet/Mobile (lg breakpoint and below) to prioritize Mascot */}
            <section className={`h-full flex-[3] hidden lg:block ${panelBase} ${frameTokens}`}>
                <img
                    src="/game/2ndcolumn.jpg"
                    alt="Game Context"
                    className="h-full w-full object-cover"
                />
                {/* Overlay Frame to ensure "shine/depth" (ring) is visible on top of the image */}
                <div className={`absolute inset-0 pointer-events-none ${frameTokens}`} />
            </section>

            {/* Column 3 - Focus / Mascot Panel */}
            {/* Uses background image, so standard border/ring works fine without overlay */}
            <section
                className={`h-full flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat ${panelBase} ${frameTokens}`}
                style={{ backgroundImage: "url('/game/3rdcolumnbg.jpg')" }}
            >
                {/* Mascot */}
                <img
                    src="/game/mascot.png"
                    alt="Mascot"
                    className="max-h-[60%] max-w-[70%] w-auto object-contain animate-in fade-in zoom-in duration-700"
                />
            </section>
        </div>
    )
}
