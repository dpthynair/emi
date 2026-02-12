import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Flag, Settings, HelpCircle } from 'lucide-react';
import { ReportIssueModal } from '@/components/modals/ReportIssueModal';
import { toast } from './ui/toaster';

interface MoreMenuProps {
    context?: "general" | "learning-area" | "kids" | "activities";
    trigger?: React.ReactNode;
    placement?: "bottom-end" | "right-start";
    variant?: "light" | "dark";
    showSystemItems?: boolean;
}

export function MoreMenu({
    context = "general",
    trigger,
    placement = "bottom-end",
    variant = "light",
    showSystemItems = false
}: MoreMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const getIssueType = () => {
        switch (context) {
            case "learning-area": return "Learning area";
            case "kids": return "Kids";
            case "activities": return "Activities";
            default: return "General";
        }
    };

    const handleToggle = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (placement === "right-start") {
            setCoords({ top: rect.top, left: rect.right + 12 });
        } else {
            setCoords({ top: rect.bottom + 8, left: rect.right - 192 });
        }
        setIsOpen(!isOpen);
    };

    const isDark = variant === "dark";

    return (
        <div className="relative inline-block">
            {/* Trigger Button */}
            {trigger ? (
                <div onClick={handleToggle} role="button" className="cursor-pointer">
                    {React.isValidElement(trigger)
                        ? React.cloneElement(trigger as React.ReactElement<any>, { active: isOpen })
                        : trigger}
                </div>
            ) : (
                <button
                    onClick={handleToggle}
                    className={`
                        w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none
                        ${isOpen
                            ? isDark ? 'bg-[var(--sidebar-item-active-bg)] text-white' : 'bg-gray-100 text-gray-900 ring-2 ring-gray-100'
                            : isDark ? 'text-white/60 hover:text-white/80 hover:bg-[var(--sidebar-item-hover-bg)]' : 'bg-white text-black/40 hover:text-black/70 shadow-sm hover:shadow-md border border-black/[0.04]'
                        }
                    `}
                >
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            )}

            {/* Menu Dropdown - Portaled */}
            {isOpen && createPortal(
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-[150]" onClick={() => setIsOpen(false)} />

                    {/* Menu Content */}
                    <div
                        style={{ top: coords.top, left: coords.left }}
                        className={`
                            fixed w-48 border shadow-2xl py-1.5 z-[151] animate-in fade-in zoom-in-95 duration-200 overflow-hidden origin-top-right rounded-xl
                            ${isDark ? 'dark bg-[var(--menu-bg)] border-[var(--menu-border)]' : 'bg-[var(--menu-bg)] backdrop-blur-[var(--menu-backdrop)] border-[var(--menu-border)] shadow-[var(--menu-shadow)]'}
                        `}
                    >
                        {showSystemItems && (
                            <>
                                <button className="w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors flex items-center gap-2.5 text-[var(--menu-item-text)] hover:bg-[var(--menu-item-hover-bg)] hover:text-[var(--menu-item-hover-text)] group">
                                    <Settings className="w-4 h-4 text-[var(--menu-icon)] group-hover:text-[var(--menu-icon-hover)]" />
                                    Settings
                                </button>
                                <button className="w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors flex items-center gap-2.5 text-[var(--menu-item-text)] hover:bg-[var(--menu-item-hover-bg)] hover:text-[var(--menu-item-hover-text)] group">
                                    <HelpCircle className="w-4 h-4 text-[var(--menu-icon)] group-hover:text-[var(--menu-icon-hover)]" />
                                    Help
                                </button>
                                <div className="h-px my-1.5 bg-[var(--menu-divider)]" />
                            </>
                        )}

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setShowReport(true);
                            }}
                            className="w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors flex items-center gap-2.5 text-[var(--menu-item-text)] hover:bg-[var(--menu-item-hover-bg)] hover:text-[var(--menu-item-hover-text)] group"
                        >
                            <Flag className="w-4 h-4 text-[var(--menu-icon)] group-hover:text-[var(--menu-icon-hover)]" />
                            Report
                        </button>
                    </div>
                </>,
                document.body
            )}

            {/* Report Modal */}
            <ReportIssueModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
                onSuccess={() => toast.success("You have successfully submitted an issue")}
                defaultType={getIssueType()}
            />
        </div>
    );
}
