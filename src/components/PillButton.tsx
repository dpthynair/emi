import React from "react"

export interface PillButtonProps {
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'white' | 'primary' | 'ghost';
    className?: string;
}

/**
 * PillButton - A premium, interactive button that follows the "Label" design system.
 * Uses h-[32px], pill shape, and high-contrast dual strokes.
 */
export function PillButton({ label, icon, onClick, variant = 'white', className = "" }: PillButtonProps) {
    const isIconOnly = !label && icon;
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 group
                ${isIconOnly ? 'w-[32px] h-[32px] rounded-full' : 'h-[28px] px-3 rounded-full'}
                ${variant === 'white'
                    ? 'bg-white border border-black/[0.08] ring-1 ring-inset ring-white/60 shadow-sm hover:border-black/15'
                    : variant === 'primary'
                        ? 'bg-[#4F46E5] text-white border border-[#4F46E5] shadow-[0_4px_12px_-2px_rgba(79,70,229,0.3)] hover:bg-[#4338CA]'
                        : 'bg-transparent hover:bg-black/5'
                }
                ${className}
            `}
        >
            {icon && (
                <div className={`transition-opacity ${isIconOnly ? 'opacity-60' : 'opacity-40'} group-hover:opacity-100 ${variant === 'primary' ? 'text-white opacity-100' : 'text-black/40'}`}>
                    {icon}
                </div>
            )}
            {label && (
                <span className={`
                    text-[10px] font-black uppercase tracking-widest leading-none mb-[1px]
                    ${variant === 'primary' ? 'text-white' : 'text-[#0F172A]'}
                `}>
                    {label}
                </span>
            )}
        </button>
    )
}
