import { ChevronRight } from "lucide-react"
import { AVATAR_MAP } from "@/screens/DashboardScreen"

interface KidCardProps {
    kid: {
        id: string;
        avatar: string;
        hint?: string;
        [key: string]: any;
    };
    onClick?: () => void;
    variant?: 'default' | 'game';
    insight?: string;
}

export function KidCard({ kid, onClick, variant = 'default', insight }: KidCardProps) {
    // GAME VARIANT (Square, Big Avatar, ID only)
    if (variant === 'game') {
        return (
            <button
                className="group w-full aspect-square flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.98]"
                style={{
                    backgroundColor: 'var(--student-card-bg)',
                    borderRadius: 'var(--student-card-radius)',
                    padding: 'var(--student-card-p)',
                    boxShadow: 'var(--student-card-shadow)',
                    border: 'var(--student-card-border)'
                }}
                onClick={onClick}
            >
                {/* Avatar Section */}
                <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105"
                    style={{
                        width: 'calc(var(--student-avatar-size) * 1.5)',
                        height: 'calc(var(--student-avatar-size) * 1.5)',
                        backgroundColor: 'var(--student-avatar-bg)'
                    }}
                >
                    <div className="w-[70%] h-[70%] flex items-center justify-center">
                        <img
                            src={AVATAR_MAP[kid.avatar] || AVATAR_MAP["apple"]}
                            alt={kid.id}
                            className="w-full h-full object-contain drop-shadow-sm"
                        />
                    </div>
                </div>

                {/* Optional Kid ID - Subtle, Small Text */}
                <span className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {kid.id}
                </span>
            </button>
        )
    }

    // DEFAULT VARIANT (Horizontal, Standard Avatar, Info + Insight)
    return (
        <button
            onClick={onClick}
            className="group w-full h-full min-h-[100px] flex flex-col justify-center text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] active:shadow-sm"
            style={{
                backgroundColor: 'var(--student-card-bg)',
                borderRadius: 'var(--student-card-radius)',
                padding: 'var(--student-card-p)',
                // gap managed by inner flex
                boxShadow: 'var(--student-card-shadow)',
                border: 'var(--student-card-border)'
            }}
        >
            {/* Top Row: Avatar + Info */}
            <div className="flex items-center w-full" style={{ gap: 'var(--student-card-gap)' }}>
                {/* Avatar Section */}
                <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105"
                    style={{
                        width: 'var(--student-avatar-size)',
                        height: 'var(--student-avatar-size)',
                        backgroundColor: 'var(--student-avatar-bg)'
                    }}
                >
                    <div className="w-[70%] h-[70%] flex items-center justify-center">
                        <img
                            src={AVATAR_MAP[kid.avatar] || AVATAR_MAP["apple"]}
                            alt={kid.id}
                            className="w-full h-full object-contain drop-shadow-sm"
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{kid.id}</span>
                    <span className="text-xs font-bold text-[#1A1F2E] leading-tight line-clamp-2 mb-1">
                        {kid.hint}
                    </span>
                    <span className="text-[10px] font-medium text-gray-500">Butterflies</span>
                </div>

                {/* Arrow/Edit Icon */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>

            {/* Insight Info (Full Width Bottom) */}
            {insight && (
                <div className="mt-3 w-full px-3 py-2 rounded-lg bg-[#FEF9C3] border border-[#FEF08A]">
                    <p className="text-[10px] leading-[1.3] font-medium text-[#854D0E]">
                        {insight}
                    </p>
                </div>
            )}
        </button>
    )
}
