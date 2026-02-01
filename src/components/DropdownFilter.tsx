import React, { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"

export interface DropdownFilterProps {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    icon?: React.ReactNode;
    className?: string;
}

export function DropdownFilter({ value, options, onChange, icon = <Calendar className="w-4 h-4 text-black/40" />, className = "" }: DropdownFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-3 px-4 h-[40px] bg-white border rounded-full transition-all duration-200 active:scale-95
                    ${isOpen
                        ? 'border-secondary/30 ring-4 ring-secondary/5 shadow-md'
                        : 'border-black/[0.08] ring-1 ring-inset ring-white/60 shadow-sm hover:border-black/15'
                    }
                `}
            >
                {icon && <div className="opacity-40 flex-shrink-0 w-4 h-4 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">{icon}</div>}
                <span className="text-[13px] font-bold text-[#1A1F2E] leading-none">{value}</span>
                <ChevronDown className={`w-4 h-4 text-black/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop for click-away */}
                    <div className="fixed inset-0 z-[40]" onClick={() => setIsOpen(false)} />

                    {/* Harmony Menu: Balanced translucency, defined stroke, and subtle depth */}
                    <div className="absolute top-[calc(100%+8px)] -right-1 w-52 bg-white/90 backdrop-blur-xl border border-black/[0.08] ring-1 ring-inset ring-white/60 rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.1)] py-1.5 z-[100] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        {options.map((option) => {
                            const isSelected = value === option;
                            return (
                                <button
                                    key={option}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full px-4 py-3 text-left transition-all duration-200 flex items-center justify-between group
                                        ${isSelected
                                            ? 'bg-secondary/[0.06] text-[#1A1F2E]'
                                            : 'text-black/60 hover:bg-black/[0.03] hover:text-[#1A1F2E]'
                                        }
                                    `}
                                >
                                    <span className={`text-[13px] ${isSelected ? 'font-bold' : 'font-semibold'}`}>
                                        {option}
                                    </span>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
