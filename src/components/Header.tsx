import React from "react"

export interface HeaderProps {
    left?: React.ReactNode;
    right?: React.ReactNode;
    className?: string; // Allow custom class overrides
    children?: React.ReactNode; // In case we want to just dump children
}

export function Header({ left, right, className = "", children }: HeaderProps) {
    return (
        <header className={`h-14 px-4 flex items-center justify-between flex-shrink-0 relative z-[50] font-sans border-b border-black/[0.08] ring-1 ring-inset ring-white/60 bg-white/80 backdrop-blur-md sticky top-0 ${className}`}>
            {children ? children : (
                <>
                    <div className="flex items-center gap-2 text-lg tracking-tight h-full">
                        {left}
                    </div>

                    <div className="flex items-center gap-4 h-full">
                        {right}
                    </div>
                </>
            )}
        </header>
    );
}
