import React from "react"
import { TrendingUp, HelpCircle, Lightbulb } from "lucide-react"

export interface GraphCardProps {
    title: string;
    actions?: React.ReactNode;
    legend?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export function GraphCard({ title, actions, legend, children, className = "" }: GraphCardProps) {
    const hasActions = Boolean(actions);

    return (
        <div className={`flex flex-col bg-card-bg rounded-card border border-card-border shadow-card overflow-hidden ${className}`}>
            {/* Header Section */}
            <div
                className="flex-shrink-0 flex items-center justify-between z-10"
                style={{
                    height: hasActions ? 'var(--graphcard-header-h)' : 'var(--graphcard-header-h-sm)',
                    paddingLeft: 'var(--graphcard-header-px)',
                    paddingRight: 'var(--graphcard-header-px)'
                }}
            >
                <div className="min-w-0 pr-6">
                    <h2 className="text-xs font-semibold text-[#0F172A] tracking-tight truncate leading-tight">{title}</h2>
                </div>
                {actions && <div className="flex-shrink-0">{actions}</div>}
            </div>

            {/* Graph Body Area */}
            <div className="flex-1 min-h-0 relative">
                <div
                    className="absolute inset-0"
                    style={{ padding: 'var(--graphcard-body-p)' }}
                >
                    {children}
                </div>
            </div>

            {/* Footer / Legend Section */}
            {legend && (
                <div
                    className="flex-shrink-0 flex justify-center"
                    style={{
                        paddingLeft: 'var(--graphcard-footer-px)',
                        paddingRight: 'var(--graphcard-footer-px)',
                        paddingBottom: 'var(--graphcard-footer-py)',
                        paddingTop: 'var(--graphcard-footer-pt)',
                        minHeight: 'var(--graphcard-footer-min-h)'
                    }}
                >
                    {legend}
                </div>
            )}
        </div>
    );
}

export function KPICard({ label, value, trend, icon, tooltip }: { label: string, value: string, trend?: string, icon: React.ReactNode, tooltip?: string }) {
    const isPositive = trend?.startsWith('+')
    return (
        <div
            className="bg-card-bg rounded-card border border-card-border shadow-card flex flex-col justify-between group/kpi relative"
            style={{
                height: 'var(--kpicard-h)',
                padding: 'var(--kpicard-p)'
            }}
        >
            <div
                className="flex items-center gap-2 uppercase relative"
                style={{
                    fontSize: 'var(--kpicard-label-size)',
                    fontWeight: 'var(--kpicard-label-weight)',
                    letterSpacing: 'var(--kpicard-label-tracking)',
                    color: 'var(--kpicard-label-color)'
                }}
            >
                {icon}
                <span>{label}</span>
                {tooltip && (
                    <div className="relative flex items-center">
                        <HelpCircle className="w-3 h-3 text-[#94A3B8] cursor-help ml-0.5" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover/kpi:block z-[100] w-48 p-2 bg-[#1A1F2E] text-white text-[10px] font-medium rounded-lg shadow-xl border border-white/10 pointer-events-none normal-case tracking-normal">
                            {tooltip}
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-auto flex items-end gap-3">
                <div
                    className="leading-none"
                    style={{
                        fontSize: 'var(--kpicard-value-size)',
                        fontWeight: 'var(--kpicard-value-weight)',
                        letterSpacing: 'var(--kpicard-value-tracking)',
                        color: 'var(--kpicard-value-color)'
                    }}
                >
                    {value}
                </div>
                {trend && trend !== "" && (
                    <div
                        className={`flex items-center gap-1 px-2 py-1.5 rounded-full mb-0.5 ${isPositive ? 'text-emerald-900 bg-emerald-50' : 'text-red-900 bg-red-50'}`}
                        style={{ fontSize: 'var(--kpicard-trend-size)', fontWeight: 'var(--kpicard-trend-weight)' }}
                    >
                        {trend}
                        {isPositive ? <TrendingUp className="w-3 h-3 text-emerald-700" /> : <TrendingUp className="w-3 h-3 rotate-180 text-red-700" />}
                    </div>
                )}
            </div>
        </div>
    )
}

export function DataInsightCard({ insight, onClick }: { insight: string, onClick?: () => void }) {
    return (
        <div
            className="rounded-card border shadow-card flex flex-col justify-between cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
            style={{
                height: 'var(--kpicard-h)',
                padding: 'var(--kpicard-p)',
                backgroundColor: '#FFFBEB',
                borderColor: '#FDE68A'
            }}
            onClick={onClick}
        >
            <div
                className="flex items-center gap-2 uppercase"
                style={{
                    fontSize: 'var(--kpicard-label-size)',
                    fontWeight: 'var(--kpicard-label-weight)',
                    letterSpacing: 'var(--kpicard-label-tracking)',
                    color: '#B45309'
                }}
            >
                <Lightbulb style={{ width: 'var(--kpicard-icon-size)', height: 'var(--kpicard-icon-size)', color: '#F59E0B' }} />
                <span>Insight</span>
            </div>
            <div
                className="leading-tight line-clamp-2"
                style={{
                    fontSize: 'var(--kpicard-insight-size)',
                    fontWeight: 'var(--kpicard-insight-weight)',
                    color: 'var(--kpicard-insight-color)'
                }}
            >
                {insight}
            </div>
        </div>
    )
}

export const ChevronLabel = (props: any) => {
    const { x, y, width } = props;
    return (
        <text
            x={x + width / 2}
            y={y + 14}
            fill="#64748B"
            fillOpacity={0.6}
            textAnchor="middle"
            fontSize="14"
            fontWeight="400"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
            ›
        </text>
    );
};

export function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
        const id = payload[0].payload.id;
        const hint = payload[0].payload.hint;
        const value = payload[0].value;
        const meta = id ? `${id} ${hint}` : (payload[0].payload.day || payload[0].payload.category || payload[0].payload.name || payload[0].payload.level || hint || payload[0].payload.title);

        return (
            <div className="bg-[#1E293B] text-white p-3 rounded-lg shadow-md border border-white/5 z-[100] pointer-events-none max-w-[220px] flex flex-col gap-1.5">
                <p className="text-[12px] font-normal text-white/70 leading-tight">
                    {meta}
                </p>
                <div className="flex items-center gap-2">
                    <p className="text-[16px] font-semibold tracking-tight text-white leading-none">
                        {value !== null ? value : "No data"}
                    </p>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.color || payload[0].color || 'var(--primary)' }} />
                </div>
            </div>
        )
    }
    return null
}
