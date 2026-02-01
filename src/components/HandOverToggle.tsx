import { Lock, Unlock } from "lucide-react"

export interface HandOverToggleProps {
    isActive: boolean;
    onChange: (active: boolean) => void;
    variant?: 'light' | 'dark';
    orientation?: 'horizontal' | 'vertical';
    size?: 'default' | 'small';
    className?: string;
}

/**
 * HandOverToggle - A tactile switch for toggling between Teacher and Handover modes.
 * Features an elevated knob with high-depth shadows matching the SegmentedToggle theme.
 */
export function HandOverToggle({
    isActive,
    onChange,
    variant = 'light',
    orientation = 'horizontal',
    size = 'default',
    className = ""
}: HandOverToggleProps) {
    const isVertical = orientation === 'vertical';
    const isDark = variant === 'dark';
    const isSmall = size === 'small';

    return (
        <button
            onClick={() => onChange(!isActive)}
            className={`
                rounded-full border transition-all duration-300 p-1 flex relative
                ${isSmall
                    ? (isVertical ? 'w-7 h-11 flex-col items-center' : 'w-11 h-7 items-center')
                    : (isVertical ? 'w-9 h-14 flex-col items-center' : 'w-14 h-9 items-center')
                }
                ${isDark
                    ? 'bg-white/5 border-white/10 shadow-inner'
                    : 'bg-black/[0.04] border-black/5'
                }
                ${className}
            `}
        >
            <div
                className={`
                    rounded-full flex items-center justify-center transition-all duration-300 ring-1
                    ${isSmall ? 'w-5 h-5' : 'w-7 h-7'}
                    ${isVertical
                        ? (isActive ? (isSmall ? 'translate-y-4' : 'translate-y-5') : 'translate-y-0')
                        : (isActive ? (isSmall ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0')
                    }
                    ${isDark
                        ? `shadow-[0_4px_8px_-2px_rgba(0,0,0,0.5)] ring-white/10 ${isActive ? 'bg-[#2A3142]' : 'bg-primary'}`
                        : `shadow-[0_4px_8px_-2px_rgba(0,0,0,0.15)] ring-black/5 ${isActive ? 'bg-white' : 'bg-primary'}`
                    }
                `}
            >
                {isActive ? (
                    <Lock className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} stroke-[2px] ${isDark ? 'text-white/30' : 'text-black/40'}`} />
                ) : (
                    <Unlock className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-primary-foreground stroke-[2px]`} />
                )}
            </div>
        </button>
    )
}
