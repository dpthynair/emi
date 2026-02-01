import React from "react"

export interface HeaderCTAProps {
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'white' | 'primary' | 'dark';
    className?: string;
}

/**
 * HeaderCTA - The "Heavy" action button designed specifically for the Header family.
 * Strictly matches the DropdownFilter DNA (h-40, Dual-strokes).
 * Supports Icon-only mode if label is omitted.
 */
export function HeaderCTA({ label, icon, onClick, variant = 'white', className = "" }: HeaderCTAProps) {
    const isIconOnly = !label && icon;

    return (
        <button
            onClick={onClick}
            className={`
                flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 group relative overflow-hidden h-[40px]
                ${isIconOnly ? 'w-[40px] px-0' : 'gap-2 px-4'}
                ${variant === 'white'
                    ? 'bg-white border border-black/[0.06] text-[#1A1F2E] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-black/15 hover:shadow-md'
                    : variant === 'primary'
                        ? 'bg-secondary text-white border border-secondary/20 shadow-[0_4px_12px_-2px_rgba(79,70,229,0.25)] hover:shadow-[0_6px_16px_-2px_rgba(79,70,229,0.35)] hover:-translate-y-0.5'
                        : 'bg-[#0F172A] text-white border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:bg-black hover:-translate-y-0.5'
                }
                ${className}
            `}
        >
            {(variant === 'primary' || variant === 'dark') && (
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}

            {icon && (
                <div className={`transition-all duration-300 flex-shrink-0 flex items-center justify-center [&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:stroke-[1.5px] ${variant === 'white' ? 'text-black/30 group-hover:text-black/60' : 'text-white'}`}>
                    {icon}
                </div>
            )}

            {label && (
                <span className={`
                    text-[13px] font-bold leading-none tracking-tight mb-[0.5px]
                    ${variant === 'white' ? 'text-[#1A1F2E]' : 'text-white'}
                `}>
                    {label}
                </span>
            )}

            {(variant === 'primary' || variant === 'dark') && (
                <div className="absolute inset-0 px-4 flex items-center gap-2 pointer-events-none overflow-hidden">
                    <div className="w-12 h-full bg-white/10 -skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
                </div>
            )}
        </button>
    )
}
