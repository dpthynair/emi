import React from "react"

export interface BreadcrumbProps {
    items: { label: string, onClick?: () => void, active?: boolean }[];
    separator?: React.ReactNode;
}

export function Breadcrumb({ items, separator = "/" }: BreadcrumbProps) {
    return (
        <div className="flex items-baseline gap-2">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <span className="text-gray-300 text-sm font-light">{separator}</span>}
                    <button
                        key={index}
                        onClick={item.onClick}
                        disabled={item.active}
                        className={`text-sm ${item.active ? "font-bold text-[#0F172A] text-[18px] cursor-default" : "font-medium text-gray-400 hover:text-[#4F46E5] transition-colors"}`}
                    >
                        {item.label}
                    </button>
                </React.Fragment>
            ))}
        </div>
    )
}
