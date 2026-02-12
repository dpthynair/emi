import { Home, Users, LayoutGrid, Bell, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { MoreMenu } from "@/components/MoreMenu"
import { GroupSwitcherMenu } from "@/components/GroupSwitcherMenu"
import { HandOverToggle } from "@/components/HandOverToggle"

export interface SidebarProps {
    variant?: 'teacher' | 'kids';
    activeView?: string;
    onNavigate?: (view: string) => void;
    userAvatar?: string;
    kidAvatar?: string;
    onToggleProfile?: () => void;
    isProfileOpen?: boolean;
    handOverActive?: boolean;
    onHandOverChange?: (active: boolean) => void;
    onKidAvatarClick?: () => void;
    mascotAvatar?: string;
    onMascotClick?: () => void;
}

export function SidebarIconButton({ icon, active, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-[var(--sidebar-item-size)] h-[var(--sidebar-item-size)] rounded-[var(--sidebar-item-radius)] flex items-center justify-center transition-all duration-300 relative group active:scale-95 hover:bg-[var(--sidebar-item-hover-bg)]"
        >
            {active && (
                <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 bg-[var(--sidebar-item-active-bg)] rounded-[var(--sidebar-item-radius)] z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}

            <div className={`relative z-10 transition-all duration-300 [&>svg]:w-[var(--sidebar-icon-size)] [&>svg]:h-[var(--sidebar-icon-size)] [&>svg]:stroke-[1.5px] 
                ${active ? 'text-primary scale-110' : 'text-white/40 group-hover:text-white/80'}
            `}>
                {icon}
            </div>
        </button>
    )
}

export function Sidebar({
    variant = 'teacher',
    activeView = 'main',
    onNavigate,
    userAvatar = "/avatar_placeholder.png", // Fallback
    kidAvatar,
    onToggleProfile,
    isProfileOpen = false,
    handOverActive = false,
    onHandOverChange,
    onKidAvatarClick,
    mascotAvatar,
    onMascotClick
}: SidebarProps) {
    const isKids = variant === 'kids';

    return (
        <aside className={`
            w-[var(--sidebar-w)] h-full flex flex-col justify-between py-6 z-20 relative
            bg-[var(--sidebar)] border border-[var(--sidebar-border)]
            transition-all duration-300 flex-shrink-0
            ${isProfileOpen ? 'rounded-l-[var(--radius-panel)] rounded-r-none border-r-[#242A38]' : 'rounded-[var(--radius-panel)]'}
        `}>
            {/* Section 1: Top (Primary Navigation) */}
            <div className="flex flex-col items-center gap-8 w-full">
                <img src="/eMi-logoyellow.svg" alt="eMi" className="h-[var(--sidebar-logo-size)] w-[var(--sidebar-logo-size)]" />

                <nav className="flex flex-col gap-1">
                    {!isKids && (
                        <>
                            <SidebarIconButton
                                icon={<Home className="w-[var(--sidebar-icon-size)] h-[var(--sidebar-icon-size)]" />}
                                active={activeView === 'main'}
                                onClick={() => onNavigate?.('main')}
                            />
                            <SidebarIconButton
                                icon={<Users className="w-[var(--sidebar-icon-size)] h-[var(--sidebar-icon-size)]" />}
                                active={activeView === 'kids'}
                                onClick={() => onNavigate?.('kids')}
                            />
                            <SidebarIconButton
                                icon={<LayoutGrid className="w-[var(--sidebar-icon-size)] h-[var(--sidebar-icon-size)]" />}
                                active={activeView === 'activities'}
                                onClick={() => onNavigate?.('activities')}
                            />
                          
                        </>
                    )}
                </nav>
            </div>

            {/* Section 2: Bottom (Utility & Account) */}
            <div className="flex flex-col items-center gap-4 w-full">
                {!isKids && (
                    <div className="flex flex-col gap-1 items-center">
                        <div className="relative">
                            <SidebarIconButton icon={<Bell className="w-[var(--sidebar-icon-size)] h-[var(--sidebar-icon-size)]" />} />
                            <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full border border-[var(--sidebar)]" />
                        </div>
                        <div className="relative">
                            <MoreMenu
                                context="general"
                                placement="right-start"
                                variant="dark"
                                showSystemItems={true}
                                trigger={
                                    <SidebarIconButton
                                        icon={<MoreHorizontal className="w-[var(--sidebar-icon-size)] h-[var(--sidebar-icon-size)]" />}
                                    />
                                }
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/10 w-full px-2">
                    <div className="flex flex-col items-center gap-2">
                        {isKids ? (
                            // Kids View Bottom
                            <>
                                {/* Mascot Avatar (State B) */}
                                {mascotAvatar && (
                                    <div
                                        onClick={onMascotClick}
                                        className={`w-[var(--sidebar-avatar-size)] h-[var(--sidebar-avatar-size)] rounded-full flex items-center justify-center relative ${onMascotClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                                    >
                                        <div className="w-[var(--sidebar-avatar-inner)] h-[var(--sidebar-avatar-inner)] rounded-full overflow-hidden border border-white/10 shadow-md bg-white">
                                            <img src={mascotAvatar} alt="Mascot" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                )}

                                {/* Kid Avatar (State B) */}
                                {kidAvatar && (
                                    <div
                                        onClick={onKidAvatarClick}
                                        className={`w-[var(--sidebar-avatar-size)] h-[var(--sidebar-avatar-size)] rounded-full flex items-center justify-center relative ${onKidAvatarClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                                    >
                                        <div className="w-[var(--sidebar-avatar-inner)] h-[var(--sidebar-avatar-inner)] rounded-full overflow-hidden border border-white/10 shadow-md bg-white p-1">
                                            <img src={kidAvatar} alt="Kid" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Teacher View Bottom
                            <>
                                <button
                                    onClick={onToggleProfile}
                                    className={`
                                        w-[var(--sidebar-avatar-size)] h-[var(--sidebar-avatar-size)] rounded-full flex items-center justify-center transition-all duration-300 relative
                                        ${isProfileOpen ? 'scale-105 z-10' : 'hover:scale-105'}
                                    `}
                                >
                                    <div className={`
                                        w-[var(--sidebar-avatar-inner)] h-[var(--sidebar-avatar-inner)] rounded-full overflow-hidden border border-white/10 shadow-md bg-white/5 transition-all
                                        ${isProfileOpen ? 'ring-2 ring-[var(--sidebar-ring)]' : 'group-hover:ring-2 group-hover:ring-white/20'}
                                    `}>
                                        <img src={userAvatar} alt="Teacher" className="w-full h-full object-cover" />
                                    </div>
                                </button>

                                <GroupSwitcherMenu
                                    currentGroupId="fjarilarna"
                                    onGroupChange={(groupId) => console.log('Switched to group:', groupId)}
                                />
                            </>
                        )}
                    </div>

                    <div className="pt-1">
                        <div className="pt-1">
                            {/* In Kids view, toggle is purely visual/locked active */}
                            <HandOverToggle
                                isActive={isKids ? true : (handOverActive || false)}
                                onChange={onHandOverChange || (() => { })}
                                variant="dark"
                                orientation="vertical"
                                className={isKids ? 'opacity-80 cursor-pointer' : ''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
