import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';

// Group data - same as GroupSelectionScreen
interface Group {
    id: string;
    name: string;
    image: string;
}

const GROUPS: Group[] = [
    { id: "bjornarna", name: "Bears", image: "/Björnarna.jpg" },
    { id: "fjarilarna", name: "Butterflies", image: "/Fjärilarna.jpg" },
    { id: "nyckelpigorna", name: "Ladybugs", image: "/Nyckelpigorna.jpg" },
];

interface GroupSwitcherMenuProps {
    currentGroupId?: string;
    onGroupChange?: (groupId: string) => void;
    trigger?: React.ReactNode;
}

export function GroupSwitcherMenu({
    currentGroupId = "fjarilarna",
    onGroupChange,
    trigger
}: GroupSwitcherMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState<{ top?: number, bottom?: number, left: number }>({ top: 0, left: 0 });

    const currentGroup = GROUPS.find(g => g.id === currentGroupId) || GROUPS[1];

    const handleToggle = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const estimatedHeight = 240; // 3 items * 56px + header 40px + padding

        const spaceBelow = viewportHeight - rect.top;
        const left = rect.right + 12;

        // If not enough space below, align bottom of menu with bottom of trigger
        if (spaceBelow < estimatedHeight) {
            const bottom = viewportHeight - rect.bottom;
            setCoords({ bottom, left });
        } else {
            setCoords({ top: rect.top, left });
        }

        setIsOpen(!isOpen);
    };

    const handleSelectGroup = (groupId: string) => {
        if (onGroupChange) {
            onGroupChange(groupId);
        }
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            {/* Trigger Button */}
            {trigger ? (
                <div onClick={handleToggle} role="button" className="cursor-pointer">
                    {trigger}
                </div>
            ) : (
                <button
                    onClick={handleToggle}
                    className={`
                        w-[var(--sidebar-avatar-inner)] h-[var(--sidebar-avatar-inner)] rounded-full overflow-hidden border shadow-md p-1 transition-all duration-200
                        ${isOpen
                            ? 'ring-2 ring-[var(--sidebar-ring)] scale-105 border-white/10 bg-white'
                            : 'border-white/10 bg-white hover:scale-105 hover:ring-2 hover:ring-white/20'
                        }
                    `}
                >
                    <img src={currentGroup.image} alt={currentGroup.name} className="w-full h-full object-contain" />
                </button>
            )}

            {/* Menu Dropdown - Portaled */}
            {isOpen && createPortal(
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-[150]" onClick={() => setIsOpen(false)} />

                    {/* Menu Content */}
                    <div
                        style={{
                            top: coords.top !== undefined ? coords.top : undefined,
                            bottom: coords.bottom !== undefined ? coords.bottom : undefined,
                            left: coords.left
                        }}
                        className="dark fixed w-56 border shadow-2xl py-2 z-[151] animate-in fade-in zoom-in-95 duration-200 overflow-hidden origin-top-left rounded-xl bg-[var(--menu-bg)] border-[var(--menu-border)]"
                    >
                        {/* Header */}
                        <div className="px-4 pb-2 mb-1 border-b border-[var(--menu-divider)]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--menu-item-text)] opacity-50">
                                Switch Group
                            </span>
                        </div>

                        {/* Group Options */}
                        {GROUPS.map((group) => {
                            const isSelected = group.id === currentGroupId;
                            return (
                                <button
                                    key={group.id}
                                    onClick={() => handleSelectGroup(group.id)}
                                    className={`
                                        w-full px-3 py-2.5 text-left transition-colors flex items-center gap-3 group
                                        ${isSelected
                                            ? 'bg-[var(--menu-item-hover-bg)]'
                                            : 'hover:bg-[var(--menu-item-hover-bg)]'
                                        }
                                    `}
                                >
                                    {/* Avatar */}
                                    <div className={`
                                        w-9 h-9 rounded-full overflow-hidden bg-white p-1 flex-shrink-0 transition-all
                                        ${isSelected ? 'ring-2 ring-primary' : 'ring-1 ring-white/10 group-hover:ring-white/20'}
                                    `}>
                                        <img
                                            src={group.image}
                                            alt={group.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Name */}
                                    <span className={`
                                        text-[13px] font-medium flex-1
                                        ${isSelected
                                            ? 'text-white'
                                            : 'text-[var(--menu-item-text)] group-hover:text-[var(--menu-item-hover-text)]'
                                        }
                                    `}>
                                        {group.name}
                                    </span>

                                    {/* Check Mark */}
                                    {isSelected && (
                                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>,
                document.body
            )}
        </div>
    );
}
