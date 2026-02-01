import { useState } from "react"
import { KidCard } from "@/components/KidCard"
import { Plus, Download, Settings, Bell, LayoutGrid, Palette, TrendingUp, BookOpen, Pencil, Calculator, FlaskConical, Play, X, Layers, ChevronDown, Check, Key, Mic, LogOut } from "lucide-react"
import { Header } from "@/components/Header"
import { Breadcrumb } from "@/components/Breadcrumb"
import { HeaderCTA } from "@/components/HeaderCTA"
import { DropdownFilter } from "@/components/DropdownFilter"
import { SegmentedToggle } from "@/components/SegmentedToggle"
import { PillButton } from "@/components/PillButton"
import { HandOverToggle } from "@/components/HandOverToggle"
import { SidebarIconButton, Sidebar } from "@/components/Sidebar"
import { KPICard, DataInsightCard, GraphCard } from "@/components/DashboardComponents"
import { Home, Users, MoreHorizontal } from "lucide-react"
import { MoreMenu } from "@/components/MoreMenu"
import { GroupSwitcherMenu } from "@/components/GroupSwitcherMenu"

function TokenRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-[11px] font-black uppercase tracking-wider text-white/30">{label}</span>
            <code className="text-[11px] font-mono text-white/60">{value}</code>
        </div>
    )
}

export function DesignSystemScreen() {
    const [mockDropdownOpen, setMockDropdownOpen] = useState(false)
    const [mockDropdownValue, setMockDropdownValue] = useState("Select option")
    const [mockRadio, setMockRadio] = useState("Option 1")
    const [mockChecks, setMockChecks] = useState<string[]>(["Preference 1"])
    const [mockToggle, setMockToggle] = useState(true)
    const [mockInput, setMockInput] = useState("Active Input Value")
    const [mockTextarea, setMockTextarea] = useState("This is a multi-line note field using the base input tokens for consistent styling...")

    return (
        <div className="panel-scroll bg-[#F8FAFC] custom-scrollbar">
            {/* Design System Header */}
            <Header
                left={
                    <Breadcrumb
                        items={[
                            { label: "System", onClick: () => { } },
                            { label: "Tokens & Components", active: true }
                        ]}
                    />
                }
                right={
                    <div className="flex items-center gap-2">
                        <HeaderCTA label="Export Specs" variant="white" icon={<Download />} />
                        <HeaderCTA label="Save Changes" variant="primary" icon={<Plus />} />
                    </div>
                }
            />

            <div className="p-8 max-w-5xl mx-auto w-full space-y-12 pb-20">
                {/* Title Section */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Design System</h1>
                    <p className="text-[#64748B] text-lg font-medium">The core component library and design tokens for eMi.</p>
                </div>

                {/* Header CTA Family */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Header CTA Family</h2>
                        <p className="text-sm text-[#64748B]">Primary actions for top-level headers. Standardized h-40 pill.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">
                        {/* Primary / Secondary Logic */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Brand Variants</h3>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="space-y-2">
                                    <HeaderCTA label="Primary Action" variant="primary" icon={<Plus />} />
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Variant: Primary</p>
                                </div>
                                <div className="space-y-2">
                                    <HeaderCTA label="Secondary Action" variant="white" icon={<Download />} />
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Variant: White</p>
                                </div>
                                <div className="space-y-2">
                                    <HeaderCTA label="Dark Action" variant="dark" icon={<Settings />} />
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Variant: Dark</p>
                                </div>
                            </div>
                        </div>

                        {/* Icon Modes */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.05]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Component Modes</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="space-y-2 flex flex-col items-center">
                                    <HeaderCTA label="Standard CTA" icon={<Plus />} variant="primary" />
                                    <p className="text-[10px] font-bold text-black/20 italic text-center">Icon + Label</p>
                                </div>
                                <div className="space-y-2 flex flex-col items-center">
                                    <HeaderCTA label="Label Only" variant="primary" />
                                    <p className="text-[10px] font-bold text-black/20 italic text-center">Label Only</p>
                                </div>
                                <div className="space-y-2 flex flex-col items-center">
                                    <HeaderCTA icon={<Plus />} variant="primary" />
                                    <p className="text-[10px] font-bold text-black/20 italic text-center">Icon Only</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Selectors & Toggles */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Selectors & Filtering</h2>
                        <p className="text-sm text-[#64748B]">Standardized h-40 inputs for view switching and data filtering.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/[0.05] shadow-sm flex flex-wrap items-start gap-12">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Dropdown Filter</h3>
                            <div className="flex flex-col gap-2">
                                <DropdownFilter value="Last 7 Days" options={["Today", "Last 7 Days", "Last 30 Days"]} onChange={() => { }} />
                                <p className="text-[10px] font-bold text-black/20 italic">h-40 | Secondary Accent</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Segmented Toggle</h3>
                            <div className="flex flex-col gap-2">
                                <SegmentedToggle
                                    options={[
                                        { label: 'Grid', value: 'grid' },
                                        { label: 'Metrics', value: 'metrics' }
                                    ]}
                                    value="grid"
                                    onChange={() => { }}
                                />
                                <p className="text-[10px] font-bold text-black/20 italic pb-1">Ultra-High Density</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Hand Over Toggle</h3>
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-center gap-2">
                                    <HandOverToggle isActive={false} onChange={() => { }} variant="light" />
                                    <p className="text-[10px] font-bold text-black/20 italic">Light (Header)</p>
                                </div>
                                <div className="flex flex-col items-center gap-2 bg-[#1A1F2E] p-3 rounded-2xl">
                                    <HandOverToggle isActive={false} onChange={() => { }} variant="dark" orientation="vertical" />
                                    <p className="text-[10px] font-bold text-white/40 italic">Dark (Sidebar)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Layout Framework */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Layout Framework</h2>
                        <p className="text-sm text-[#64748B]">Structural elevation and panel geometry.</p>
                    </div>
                    <div className="bg-[#E2E8F0] p-12 rounded-3xl border border-black/[0.05] shadow-sm space-y-8 min-h-[250px] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-black/20 italic">Layer 0: Canvas (Floor)</div>

                        <div className="w-full max-w-2xl bg-[var(--panel-bg-gradient)] rounded-panel border border-panel-border ring-1 ring-inset ring-panel-ring p-12 relative shadow-lg">
                            <div className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-black/20 italic">Layer 1: Main Panel (Stage)</div>
                            <div className="flex items-center justify-center h-24 bg-white rounded-2xl border border-black/[0.04] shadow-sm">
                                <span className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">Layer 2: Content Card</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation Rail Elements */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Navigation Rail</h2>
                        <p className="text-sm text-[#64748B]">Tactile elements for the dark sidebar interface.</p>
                    </div>
                    <div className="bg-[#1A1F2E] p-8 rounded-3xl border border-white/5 shadow-2xl space-y-12">
                        {/* Nav Items */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/20 italic">Interactive Items</h3>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <SidebarIconButton icon={<Home />} active={true} />
                                    <p className="text-[10px] font-bold text-white/30 italic">Active (Well)</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <SidebarIconButton icon={<Users />} active={false} />
                                    <p className="text-[10px] font-bold text-white/30 italic">Inactive</p>
                                </div>
                            </div>
                        </div>

                        {/* Identity Components */}
                        <div className="space-y-4 pt-8 border-t border-white/5">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/20 italic">Identity Elements</h3>
                            <div className="flex items-center gap-12 flex-wrap">
                                <div className="flex flex-col items-center gap-2">
                                    <img src="/eMi-logoyellow.svg" className="h-[var(--sidebar-avatar-size)] w-[var(--sidebar-avatar-size)]" />
                                    <p className="text-[10px] font-bold text-white/30 italic">Logo</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-[var(--sidebar-avatar-size)] h-[var(--sidebar-avatar-size)] rounded-full bg-primary ring-4 ring-primary/20 flex items-center justify-center">
                                        <div className="w-[var(--sidebar-avatar-inner)] h-[var(--sidebar-avatar-inner)] rounded-full bg-white/10" />
                                    </div>
                                    <p className="text-[10px] font-bold text-white/30 italic">Avatar Well</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Secondary Tokens */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Pill Utilities</h2>
                        <p className="text-sm text-[#64748B]">Low-density labels for data attributes and status indicators.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/[0.05] shadow-sm">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="space-y-2 flex flex-col items-center">
                                <PillButton label="Status Label" icon={<Bell size={12} />} variant="white" />
                                <p className="text-[10px] font-bold text-black/20 italic">Pill: White</p>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <PillButton label="Brand Tag" icon={<Palette size={12} />} variant="primary" />
                                <p className="text-[10px] font-bold text-black/20 italic">Pill: Primary</p>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <PillButton label="Ghost Mode" icon={<LayoutGrid size={12} />} variant="ghost" />
                                <p className="text-[10px] font-bold text-black/20 italic">Pill: Ghost</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dropdown Menus */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Dropdown Menus</h2>
                        <p className="text-sm text-[#64748B]">Contextual menus for secondary actions. Optimized for both light and dark UI contexts.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">
                        <div className="flex flex-wrap items-start gap-16">
                            {/* Light Menu */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Header Variant (Light)</h3>
                                <div className="flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    <MoreMenu variant="light" showSystemItems={true} />
                                    <p className="text-[10px] font-bold text-black/20 italic text-center">Glassmorphism / Light</p>
                                </div>
                            </div>

                            {/* Dark Menu */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Sidebar Variant (Dark)</h3>
                                <div className="flex flex-col items-center gap-4 p-8 bg-[#1A1F2E] rounded-2xl border border-white/5 shadow-2xl">
                                    <MoreMenu
                                        variant="dark"
                                        showSystemItems={true}
                                        placement="right-start"
                                        trigger={
                                            <SidebarIconButton icon={<MoreHorizontal />} />
                                        }
                                    />
                                    <p className="text-[10px] font-bold text-white/30 italic text-center">Deep Slate / Dark</p>
                                </div>
                            </div>

                            {/* Group Switcher Menu */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Group Switcher Variant</h3>
                                <div className="flex flex-col items-center gap-4 p-8 bg-[#1A1F2E] rounded-2xl border border-white/5 shadow-2xl">
                                    <GroupSwitcherMenu
                                        currentGroupId="fjarilarna"
                                        onGroupChange={(groupId) => console.log('Switched to:', groupId)}
                                    />
                                    <div className="flex flex-col gap-1 items-center">
                                        <p className="text-[10px] font-bold text-white/30 italic text-center">Avatar + Name Items</p>
                                        <div className="flex gap-2 mt-2">
                                            <code className="text-[9px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded">--menu-bg</code>
                                            <code className="text-[9px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded">--menu-border</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Menu System Tokens</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Background</div>
                                    <code className="font-mono text-black/60">--menu-bg</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Border / Ring</div>
                                    <code className="font-mono text-black/60">--menu-border</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Shadow</div>
                                    <code className="font-mono text-black/60">--menu-shadow</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Text Color</div>
                                    <code className="font-mono text-black/60">--menu-item-text</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Hover Bg</div>
                                    <code className="font-mono text-black/60">--menu-item-hover-bg</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Hover Text</div>
                                    <code className="font-mono text-black/60">--menu-item-hover-text</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Divider</div>
                                    <code className="font-mono text-black/60">--menu-divider</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Icon Color</div>
                                    <code className="font-mono text-black/60">--menu-icon</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Icon Hover</div>
                                    <code className="font-mono text-black/60">--menu-icon-hover</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Backdrop</div>
                                    <code className="font-mono text-black/60">--menu-backdrop</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* KPI Cards Family */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">KPI Card Family</h2>
                        <p className="text-sm text-[#64748B]">Dashboard info cards. All share base tokens for height, padding, and typography.</p>
                    </div>
                    <div className="bg-[#F1F5F9] p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">

                        {/* Metric Cards */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Metric Variant</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <KPICard
                                        label="Sessions"
                                        value="47"
                                        trend="+12%"
                                        icon={<TrendingUp className="w-4 h-4" />}
                                        tooltip="Total sessions this period"
                                    />
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">With Positive Trend</p>
                                </div>
                                <div className="space-y-2">
                                    <KPICard
                                        label="Observations"
                                        value="182"
                                        trend="-5%"
                                        icon={<BookOpen className="w-4 h-4" />}
                                    />
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">With Negative Trend</p>
                                </div>
                                <div className="space-y-2">
                                    <KPICard
                                        label="Students"
                                        value="19"
                                        icon={<Users className="w-4 h-4" />}
                                    />
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">No Trend</p>
                                </div>
                            </div>
                        </div>

                        {/* Insight Card */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Insight Variant</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <DataInsightCard
                                        insight="Students show 23% higher engagement during morning sessions. Consider scheduling key activities before noon."
                                        onClick={() => console.log('Open insights modal')}
                                    />
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Insight Card (Clickable)</p>
                                </div>
                            </div>
                        </div>

                        {/* Identity Cards */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Identity Variants</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Group Identity */}
                                <div className="space-y-2">
                                    <div
                                        className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center"
                                        style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
                                    >
                                        <div className="flex items-start" style={{ gap: 'var(--kpicard-gap)' }}>
                                            <div
                                                className="rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm flex-shrink-0 bg-white p-1"
                                                style={{ width: 'var(--kpicard-avatar-size)', height: 'var(--kpicard-avatar-size)' }}
                                            >
                                                <img src="/Fjärilarna.jpg" alt="Group" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="min-w-0 flex flex-col">
                                                <div
                                                    className="uppercase mb-0.5"
                                                    style={{ fontSize: 'var(--kpicard-label-size)', fontWeight: 'var(--kpicard-label-weight)', letterSpacing: 'var(--kpicard-label-tracking)', color: 'var(--kpicard-label-color)' }}
                                                >Current group</div>
                                                <div style={{ fontSize: 'var(--kpicard-title-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)', lineHeight: 1.2 }}>Butterflies</div>
                                                <div style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-secondary-weight)', color: 'var(--kpicard-secondary-color)' }}>Little Academy • 19 kids</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Group Identity</p>
                                </div>

                                {/* Learning Area */}
                                <div className="space-y-2">
                                    <div
                                        className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center"
                                        style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
                                    >
                                        <div className="flex items-start" style={{ gap: 'var(--kpicard-gap)' }}>
                                            <div
                                                className="rounded-full overflow-hidden border border-black/5 flex-shrink-0 bg-gray-50 flex items-center justify-center mt-1"
                                                style={{ width: 'var(--kpicard-avatar-size)', height: 'var(--kpicard-avatar-size)', color: '#10B981' }}
                                            >
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0 flex flex-col">
                                                <div
                                                    className="uppercase leading-none mb-1"
                                                    style={{ fontSize: 'var(--kpicard-label-size)', fontWeight: 'var(--kpicard-label-weight)', letterSpacing: 'var(--kpicard-label-tracking)', color: 'var(--kpicard-label-color)' }}
                                                >Learning Area</div>
                                                <div className="truncate leading-tight mb-0.5" style={{ fontSize: 'var(--kpicard-title-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>Math</div>
                                                <div className="truncate" style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-secondary-weight)', color: 'var(--kpicard-secondary-color)' }}>18 activities</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Learning Area</p>
                                </div>

                                <div className="space-y-2">
                                    <div
                                        className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center relative"
                                        style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
                                    >
                                        <button className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.03] hover:bg-black/[0.06] text-black/40 hover:text-black/60 transition-all">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <div className="flex items-center" style={{ gap: 'var(--kpicard-gap)' }}>
                                            <div
                                                className="rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm flex-shrink-0 bg-white p-1.5"
                                                style={{ width: 'var(--kpicard-avatar-size-lg)', height: 'var(--kpicard-avatar-size-lg)' }}
                                            >
                                                <img src="/kidsavatars/apple.png" alt="Avatar" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex flex-col min-w-0 pr-10">
                                                <div className="uppercase leading-none mb-1" style={{ fontSize: 'var(--kpicard-label-size)', fontWeight: 'var(--kpicard-label-weight)', letterSpacing: 'var(--kpicard-label-tracking)', color: 'var(--kpicard-label-color)' }}>S-01</div>
                                                <div className="leading-tight mb-1" style={{ fontSize: 'var(--kpicard-insight-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>Creative and focused</div>
                                                <div className="leading-none" style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-secondary-weight)', color: 'var(--kpicard-secondary-color)' }}>Butterflies</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Student Identity</p>
                                </div>

                                <div className="space-y-2">
                                    <div
                                        className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center"
                                        style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
                                    >
                                        <div className="flex items-center gap-5 justify-center">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className="w-9 h-9 rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm">
                                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" alt="Teacher" className="w-full h-full object-cover" />
                                                </div>
                                                <span style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>Maja</span>
                                            </div>
                                            <div className="w-px h-8 bg-black/[0.06]" />
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className="w-9 h-9 rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm">
                                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" alt="Teacher" className="w-full h-full object-cover" />
                                                </div>
                                                <span style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>Elin</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Teachers Card</p>
                                </div>

                                {/* Activity Details */}
                                <div className="space-y-2">
                                    <div
                                        className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center"
                                        style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
                                    >
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span
                                                    className="uppercase"
                                                    style={{
                                                        fontSize: 'var(--kpicard-label-size)',
                                                        fontWeight: 'var(--kpicard-label-weight)',
                                                        letterSpacing: 'var(--kpicard-label-tracking)',
                                                        color: 'var(--kpicard-label-color)'
                                                    }}
                                                >L-102-E</span>
                                                <div
                                                    className="rounded-full bg-[#10B981]"
                                                    style={{ width: '6px', height: '6px' }}
                                                />
                                            </div>
                                            <div
                                                className="truncate leading-tight mb-1"
                                                style={{ fontSize: 'var(--kpicard-title-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}
                                            >Bathroom Picture</div>
                                            <div
                                                className="line-clamp-2 leading-tight"
                                                style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-secondary-weight)', color: 'var(--kpicard-secondary-color)' }}
                                            >Answer eMi's Questions About the Bathroom</div>
                                        </div>
                                        {/* Play Overlay */}
                                        <div
                                            className="absolute bottom-3 right-3 flex items-center justify-center cursor-pointer shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 border border-white/20"
                                            style={{
                                                width: 'var(--activity-play-size)',
                                                height: 'var(--activity-play-size)',
                                                backgroundColor: 'var(--activity-play-bg)',
                                                backdropFilter: 'var(--activity-play-backdrop)',
                                                borderRadius: 'var(--activity-play-radius)',
                                                color: 'var(--activity-play-color)'
                                            }}
                                        >
                                            <Play size={10} fill="currentColor" className="ml-0.5" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Activity Details</p>
                                </div>
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Active Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Height</div>
                                    <code className="font-mono text-black/60">--kpicard-h: 110px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Padding</div>
                                    <code className="font-mono text-black/60">--kpicard-p: 1.25rem</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Label Size</div>
                                    <code className="font-mono text-black/60">--kpicard-label-size: 10px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Value Size</div>
                                    <code className="font-mono text-black/60">--kpicard-value-size: 32px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Hint Size</div>
                                    <code className="font-mono text-black/60">--kpicard-insight-size: 12px</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Activity Thumbnail Card */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Activity Thumbnail</h2>
                        <p className="text-sm text-[#64748B]">Image card for activity previews. Uses same height as KPI cards.</p>
                    </div>
                    <div className="bg-[#F1F5F9] p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">

                        {/* Thumbnail */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Thumbnail Variant</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <div
                                        className="bg-white rounded-card border border-card-border shadow-card overflow-hidden relative"
                                        style={{ height: 'var(--activitycard-h)', padding: 'var(--activitycard-thumb-p)' }}
                                    >
                                        <img
                                            src="/activities/language/bathroom_medium.jpg"
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover"
                                            style={{ borderRadius: 'var(--activitycard-thumb-radius)' }}
                                        />
                                        {/* Play Overlay */}
                                        <div
                                            className="absolute bottom-2 right-2 flex items-center justify-center cursor-pointer shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 border border-white/20"
                                            style={{
                                                width: 'var(--activity-play-size)',
                                                height: 'var(--activity-play-size)',
                                                backgroundColor: 'var(--activity-play-bg)',
                                                backdropFilter: 'var(--activity-play-backdrop)',
                                                borderRadius: 'var(--activity-play-radius)',
                                                color: 'var(--activity-play-color)'
                                            }}
                                        >
                                            <Play size={10} fill="currentColor" className="ml-0.5" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Activity Thumbnail</p>
                                </div>
                                {/* Grid Card Variant */}
                                <div className="space-y-2">
                                    <div className="flex flex-col cursor-pointer" style={{ gap: 'var(--activitygrid-gap)' }}>
                                        <div className="relative aspect-video w-full overflow-hidden shadow-sm border border-black/[0.04] bg-white group" style={{ borderRadius: 'var(--activitygrid-radius)' }}>
                                            <img
                                                src="/activities/language/playground_medium.jpg"
                                                alt="Thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                                            <div className="absolute bottom-3 left-2.5 leading-none flex items-center">
                                                <span className="uppercase tracking-widest shadow-sm drop-shadow-md"
                                                    style={{ fontSize: 'var(--activitygrid-id-size)', fontWeight: 'var(--activitygrid-id-weight)', color: 'var(--activitygrid-id-color)' }}>L-101</span>
                                            </div>
                                            <div className="absolute bottom-3 right-3 flex" style={{ gap: 'var(--activitygrid-dot-gap)' }}>
                                                <div className="rounded-full bg-[#10B981] shadow-sm" style={{ width: 'var(--activitygrid-dot-size)', height: 'var(--activitygrid-dot-size)' }} />
                                                <div className="rounded-full bg-[#F59E0B] shadow-sm" style={{ width: 'var(--activitygrid-dot-size)', height: 'var(--activitygrid-dot-size)' }} />
                                                <div className="rounded-full bg-[#EF4444] shadow-sm" style={{ width: 'var(--activitygrid-dot-size)', height: 'var(--activitygrid-dot-size)' }} />
                                            </div>
                                        </div>
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="leading-tight transition-colors truncate"
                                                    style={{ fontSize: 'var(--activitygrid-title-size)', fontWeight: 'var(--activitygrid-title-weight)', color: 'var(--activitygrid-title-color)' }}>Playground Picture</h3>
                                                <p className="line-clamp-2 mt-0.5 leading-relaxed"
                                                    style={{ fontSize: 'var(--activitygrid-desc-size)', fontWeight: 'var(--activitygrid-desc-weight)', color: 'var(--activitygrid-desc-color)' }}>Answer eMi's Questions About the Playground</p>
                                            </div>
                                            <div className="flex-shrink-0 mt-0.5">
                                                <div className="activity-play-side">
                                                    <Play size={10} fill="currentColor" className="ml-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Grid Card Variant</p>
                                </div>
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Active Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Grid Radius</div>
                                    <code className="font-mono text-black/60">--activitygrid-radius: 12px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Grid Gap</div>
                                    <code className="font-mono text-black/60">--activitygrid-gap: 10px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Title Size</div>
                                    <code className="font-mono text-black/60">--activitygrid-title-size: 12px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Dot Size</div>
                                    <code className="font-mono text-black/60">--activitygrid-dot-size: 8px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Play Trigger</div>
                                    <code className="font-mono text-black/60">--activity-play-size: 32px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Play Side (Bg)</div>
                                    <code className="font-mono text-black/60">--activity-play-side-bg</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Graph Cards */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Graph Cards</h2>
                        <p className="text-sm text-[#64748B]">Container cards for charts and data visualizations. Header height adapts based on actions.</p>
                    </div>
                    <div className="bg-[#F1F5F9] p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">

                        {/* Card Variants */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Header Variants</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* With Actions - 56px header */}
                                <div className="space-y-2">
                                    <GraphCard
                                        title="Performance Trend"
                                        className="h-[180px]"
                                        actions={
                                            <SegmentedToggle
                                                options={[
                                                    { label: "Week", value: "week" },
                                                    { label: "Month", value: "month" }
                                                ]}
                                                value="week"
                                                onChange={() => { }}
                                            />
                                        }
                                    >
                                        <div className="h-full flex items-center justify-center text-sm text-black/20">[Chart Area]</div>
                                    </GraphCard>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">With Actions</p>
                                </div>

                                {/* Title Only - 56px header */}
                                <div className="space-y-2">
                                    <GraphCard
                                        title="Activity Breakdown"
                                        className="h-[180px]"
                                    >
                                        <div className="h-full flex items-center justify-center text-sm text-black/20">[Chart Area]</div>
                                    </GraphCard>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">Title Only</p>
                                </div>

                                {/* With Legend/Footer */}
                                <div className="space-y-2">
                                    <GraphCard
                                        title="Category Distribution"
                                        className="h-[180px]"
                                        legend={
                                            <div className="flex items-center" style={{ gap: 'var(--legend-gap-item)' }}>
                                                <div className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                                    <div className="rounded-full" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)', backgroundColor: '#4F46E5' }} />
                                                    <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>Language</span>
                                                </div>
                                                <div className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                                    <div className="rounded-full" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)', backgroundColor: '#10B981' }} />
                                                    <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>Math</span>
                                                </div>
                                                <div className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                                    <div className="rounded-full" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)', backgroundColor: '#F59E0B' }} />
                                                    <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>Science</span>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <div className="h-full flex items-center justify-center text-sm text-black/20">[Chart Area]</div>
                                    </GraphCard>
                                    <p className="text-[10px] text-center font-bold text-black/20 italic">With Legend Footer</p>
                                </div>
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Active Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Header Height</div>
                                    <code className="font-mono text-black/60">--graphcard-header-h: 56px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Header (Sm)</div>
                                    <code className="font-mono text-black/60">--graphcard-header-h-sm: 56px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Body Padding</div>
                                    <code className="font-mono text-black/60">--graphcard-body-p: 1.5rem</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Footer Height</div>
                                    <code className="font-mono text-black/60">--graphcard-footer-min-h: 32px</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chart Legends */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Chart Legends</h2>
                        <p className="text-sm text-[#64748B]">Standardized legend items for data visualizations.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">
                        {/* Demo */}
                        <div className="flex items-center" style={{ gap: 'var(--legend-gap-item)' }}>
                            <div className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                <div className="rounded-full" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)', backgroundColor: '#4F46E5' }} />
                                <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>Category A</span>
                            </div>
                            <div className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                <div className="rounded-full" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)', backgroundColor: '#10B981' }} />
                                <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>Category B</span>
                            </div>
                            <div className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                <div className="rounded-full" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)', backgroundColor: '#F59E0B' }} />
                                <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>Category C</span>
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Active Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Dot Size</div>
                                    <code className="font-mono text-black/60">--legend-dot-size: 8px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Text Style</div>
                                    <code className="font-mono text-black/60">10px Bold Uppercase</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Gap (Item)</div>
                                    <code className="font-mono text-black/60">--legend-gap-item: 1rem</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Gap (Dot)</div>
                                    <code className="font-mono text-black/60">--legend-gap-dot: 6px</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Swipe Pagination */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Swipe Pagination</h2>
                        <p className="text-sm text-[#64748B]">Sticky translucent page indicator for swipe navigation contexts.</p>
                    </div>
                    <div className="bg-black/5 p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8 relative overflow-hidden">
                        {/* Background pattern to show translucency */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                        {/* Demo */}
                        <div className="flex justify-center py-8">
                            <div
                                className="flex items-center"
                                style={{
                                    backgroundColor: 'var(--pagination-bg)',
                                    backdropFilter: 'var(--pagination-backdrop)',
                                    paddingLeft: 'var(--pagination-px)',
                                    paddingRight: 'var(--pagination-px)',
                                    paddingTop: 'var(--pagination-py)',
                                    paddingBottom: 'var(--pagination-py)',
                                    borderRadius: 'var(--pagination-radius)',
                                    borderColor: 'var(--pagination-border)',
                                    borderWidth: '1px',
                                    gap: 'var(--pagination-gap)'
                                }}
                            >
                                <button
                                    className="transition-all duration-300 rounded-full"
                                    style={{
                                        width: 'var(--pagination-active-w)',
                                        height: 'var(--pagination-dot-size)',
                                        backgroundColor: 'var(--pagination-active-color)'
                                    }}
                                />
                                <button
                                    className="transition-all duration-300 rounded-full"
                                    style={{
                                        width: 'var(--pagination-dot-size)',
                                        height: 'var(--pagination-dot-size)',
                                        backgroundColor: 'var(--pagination-inactive-color)'
                                    }}
                                />
                                <button
                                    className="transition-all duration-300 rounded-full"
                                    style={{
                                        width: 'var(--pagination-dot-size)',
                                        height: 'var(--pagination-dot-size)',
                                        backgroundColor: 'var(--pagination-inactive-color)'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08] relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Active Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Bottom Offset</div>
                                    <code className="font-mono text-black/60">--pagination-bottom: 0px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Padding X/Y</div>
                                    <code className="font-mono text-black/60">14px / 8px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Background</div>
                                    <code className="font-mono text-black/60">Blur(4px) + White/60</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Dot Size</div>
                                    <code className="font-mono text-black/60">--pagination-dot-size: 6px</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pill Tabs */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Pill Tabs</h2>
                        <p className="text-sm text-[#64748B]">Category navigation tabs with icon + label. Supports active, inactive, and disabled states.</p>
                    </div>
                    <div className="bg-[#F1F5F9] p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">

                        {/* Tab States */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">States</h3>
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Active */}
                                <div className="space-y-2 flex flex-col items-center">
                                    <button
                                        className="flex items-center border transition-all"
                                        style={{
                                            paddingLeft: 'var(--pilltab-px)',
                                            paddingRight: 'var(--pilltab-px)',
                                            paddingTop: 'var(--pilltab-py)',
                                            paddingBottom: 'var(--pilltab-py)',
                                            gap: 'var(--pilltab-gap)',
                                            borderRadius: 'var(--pilltab-radius)',
                                            fontSize: 'var(--pilltab-font-size)',
                                            fontWeight: 'var(--pilltab-font-weight)',
                                            backgroundColor: 'var(--pilltab-active-bg)',
                                            color: 'var(--pilltab-active-text)',
                                            borderColor: 'var(--pilltab-active-border)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        <BookOpen style={{ width: 'var(--pilltab-icon-size)', height: 'var(--pilltab-icon-size)' }} />
                                        Language
                                    </button>
                                    <p className="text-[10px] font-bold text-black/20 italic">Active</p>
                                </div>

                                {/* Inactive */}
                                <div className="space-y-2 flex flex-col items-center">
                                    <button
                                        className="flex items-center border transition-all"
                                        style={{
                                            paddingLeft: 'var(--pilltab-px)',
                                            paddingRight: 'var(--pilltab-px)',
                                            paddingTop: 'var(--pilltab-py)',
                                            paddingBottom: 'var(--pilltab-py)',
                                            gap: 'var(--pilltab-gap)',
                                            borderRadius: 'var(--pilltab-radius)',
                                            fontSize: 'var(--pilltab-font-size)',
                                            fontWeight: 'var(--pilltab-font-weight)',
                                            backgroundColor: 'var(--pilltab-inactive-bg)',
                                            color: 'var(--pilltab-inactive-text)',
                                            borderColor: 'var(--pilltab-inactive-border)'
                                        }}
                                    >
                                        <Calculator style={{ width: 'var(--pilltab-icon-size)', height: 'var(--pilltab-icon-size)' }} />
                                        Math
                                    </button>
                                    <p className="text-[10px] font-bold text-black/20 italic">Inactive</p>
                                </div>

                                {/* Disabled */}
                                <div className="space-y-2 flex flex-col items-center">
                                    <button
                                        className="flex items-center border transition-all cursor-not-allowed"
                                        style={{
                                            paddingLeft: 'var(--pilltab-px)',
                                            paddingRight: 'var(--pilltab-px)',
                                            paddingTop: 'var(--pilltab-py)',
                                            paddingBottom: 'var(--pilltab-py)',
                                            gap: 'var(--pilltab-gap)',
                                            borderRadius: 'var(--pilltab-radius)',
                                            fontSize: 'var(--pilltab-font-size)',
                                            fontWeight: 'var(--pilltab-font-weight)',
                                            backgroundColor: 'transparent',
                                            color: 'var(--pilltab-disabled-text)',
                                            borderColor: 'transparent',
                                            opacity: 'var(--pilltab-disabled-opacity)'
                                        }}
                                        disabled
                                    >
                                        <FlaskConical style={{ width: 'var(--pilltab-icon-size)', height: 'var(--pilltab-icon-size)' }} />
                                        Science
                                    </button>
                                    <p className="text-[10px] font-bold text-black/20 italic">Disabled</p>
                                </div>
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Active Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Padding</div>
                                    <code className="font-mono text-black/60">--pilltab-px: 12px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Font Size</div>
                                    <code className="font-mono text-black/60">--pilltab-font-size: 12px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Icon Size</div>
                                    <code className="font-mono text-black/60">--pilltab-icon-size: 14px</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Active BG</div>
                                    <code className="font-mono text-black/60">--pilltab-active-bg</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Student Identity Grid Card */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Student Grid Card</h2>
                        <p className="text-sm text-[#64748B]">Tokenized card component for student selection grid.</p>
                    </div>
                    <div className="bg-[#E2E8F0] p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">

                        {/* Demo */}
                        <div className="flex justify-center gap-8 flex-wrap items-start">
                            {/* Default Variant (No Insight) */}
                            <div className="w-full max-w-[280px]">
                                <p className="text-xs font-bold text-gray-400 mb-2 text-center uppercase tracking-wider">Default</p>
                                <KidCard
                                    kid={{
                                        id: "S-01",
                                        avatar: "apple",
                                        hint: "Creative and focused",
                                    }}
                                />
                            </div>

                            {/* Default Variant (With Insight) */}
                            <div className="w-full max-w-[280px]">
                                <p className="text-xs font-bold text-gray-400 mb-2 text-center uppercase tracking-wider">With Insight</p>
                                <KidCard
                                    kid={{
                                        id: "S-01",
                                        avatar: "apple",
                                        hint: "Creative and focused",
                                    }}
                                    insight="Strong engagement in Art."
                                />
                            </div>

                            {/* Game Variant */}
                            <div className="w-full max-w-[200px]">
                                <p className="text-xs font-bold text-gray-400 mb-2 text-center uppercase tracking-wider">Game Variant</p>
                                <KidCard
                                    kid={{
                                        id: "S-01",
                                        avatar: "apple",
                                    }}
                                    variant="game"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Token Reference */}
                    <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                        <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Active Tokens</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                            <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Card Padding</div>
                                <code className="font-mono text-black/60">--student-card-p: 1rem</code>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Corner Radius</div>
                                <code className="font-mono text-black/60">--student-card-radius: 1rem</code>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Avatar Size</div>
                                <code className="font-mono text-black/60">--student-avatar-size: 64px</code>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Gap</div>
                                <code className="font-mono text-black/60">--student-card-gap: 1rem</code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Switch Toggle */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Switch Toggle</h2>
                        <p className="text-sm text-[#64748B]">Tokenized switch component for binary choices.</p>
                    </div>
                    <div className="bg-[#E2E8F0] p-8 rounded-3xl border border-black/[0.05] shadow-sm space-y-8">
                        <div className="flex justify-center gap-12 items-center">
                            {/* Off State */}
                            <div className="flex flex-col items-center gap-3">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Off</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-black/40">Label</span>
                                    <div className="w-[var(--switch-w)] h-[var(--switch-h)] bg-[var(--switch-bg-off)] rounded-full p-0.5 flex items-center transition-all duration-300">
                                        <div className="bg-white w-[var(--switch-handle-size)] h-[var(--switch-handle-size)] rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                            {/* On State (Dark) */}
                            <div className="flex flex-col items-center gap-3">
                                <span className="text-[10px] text-[#1A1F2E] font-bold uppercase tracking-wider">On (Dark)</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-black/60">Label</span>
                                    <div className="w-[var(--switch-w)] h-[var(--switch-h)] bg-[var(--switch-bg-on)] rounded-full p-0.5 flex items-center justify-end transition-all duration-300">
                                        <div className="bg-white w-[var(--switch-handle-size)] h-[var(--switch-handle-size)] rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Token Reference */}
                        <div className="space-y-4 pt-8 border-t border-black/[0.08]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Switch Tokens</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Dimens</div>
                                    <div className="flex flex-col gap-1">
                                        <code className="font-mono text-black/60">--switch-w: 2.25rem</code>
                                        <code className="font-mono text-black/60">--switch-h: 1.25rem</code>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Active Color</div>
                                    <code className="font-mono text-black/60">--switch-bg-on: #1A1F2E</code>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-black/[0.04]">
                                    <div className="font-black text-black/30 uppercase tracking-wider text-[9px] mb-1">Inactive Color</div>
                                    <code className="font-mono text-black/60">--switch-bg-off: #E2E8F0</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                <section id="modals" className="space-y-8 relative">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Layers size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Dialogs & Modals</h2>
                            <p className="text-white/40 text-sm">Compact, unified system for utility-first interactions.</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-12">
                        {/* Modal Mockup Preview (Compact) */}
                        <div
                            className="relative z-10 max-w-sm mx-auto border flex flex-col max-h-[90vh]"
                            style={{
                                backgroundColor: 'var(--modal-bg)',
                                borderColor: 'var(--modal-border)',
                                borderRadius: 'var(--modal-radius)',
                                boxShadow: 'var(--modal-shadow)'
                            }}
                        >
                            <div
                                className="border-b flex items-center justify-between"
                                style={{
                                    paddingTop: 'var(--modal-header-py)',
                                    paddingBottom: 'var(--modal-header-py)',
                                    paddingLeft: 'var(--modal-header-px)',
                                    paddingRight: 'var(--modal-header-px)',
                                    borderColor: 'var(--modal-border)'
                                }}
                            >
                                <span style={{
                                    fontSize: 'var(--modal-title-size)',
                                    fontWeight: 'var(--modal-title-weight)',
                                    color: 'var(--modal-title-color)'
                                }}>Modal Baseline</span>
                                <div className="p-1 rounded-full hover:bg-white/5 text-white/20 transition-colors"><X size={16} /></div>
                            </div>
                            <div
                                style={{
                                    paddingTop: 'var(--modal-body-py)',
                                    paddingBottom: 'var(--modal-body-py)',
                                    paddingLeft: 'var(--modal-body-px)',
                                    paddingRight: 'var(--modal-body-px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--modal-body-gap)'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{
                                        fontSize: 'var(--modal-label-size)',
                                        fontWeight: 'var(--modal-label-weight)',
                                        color: 'var(--modal-label-color)',
                                        textTransform: 'var(--modal-label-transform)' as any,
                                        letterSpacing: 'var(--modal-label-spacing)'
                                    }}>Input Label</label>
                                    <div
                                        className="w-full flex items-center text-white/20"
                                        style={{
                                            height: 'var(--modal-input-h)',
                                            borderRadius: 'var(--modal-input-radius)',
                                            backgroundColor: 'var(--modal-input-bg)',
                                            paddingLeft: 'var(--modal-input-px)',
                                            paddingRight: 'var(--modal-input-px)',
                                            fontSize: 'var(--modal-input-font-size)',
                                            border: '1px solid var(--modal-border)'
                                        }}
                                    >Sample text...</div>
                                </div>
                                <div style={{
                                    backgroundColor: 'var(--modal-notice-bg)',
                                    border: '1px solid var(--modal-notice-border)',
                                    borderRadius: 'var(--modal-notice-radius)',
                                    paddingTop: 'var(--modal-notice-py)',
                                    paddingBottom: 'var(--modal-notice-py)',
                                    paddingLeft: 'var(--modal-notice-px)',
                                    paddingRight: 'var(--modal-notice-px)',
                                }}>
                                    <p style={{
                                        fontSize: 'var(--modal-notice-font-size)',
                                        fontWeight: 400,
                                        color: 'var(--modal-notice-text-color)',
                                        lineHeight: 1.5
                                    }}>This is a notice box using the shared token.</p>
                                </div>
                            </div>
                            <div
                                className="border-t flex justify-end gap-2"
                                style={{
                                    paddingTop: 'var(--modal-footer-py)',
                                    paddingBottom: 'var(--modal-footer-py)',
                                    paddingLeft: 'var(--modal-footer-px)',
                                    paddingRight: 'var(--modal-footer-px)',
                                    backgroundColor: 'var(--modal-footer-bg)',
                                    borderColor: 'var(--modal-border)'
                                }}
                            >
                                <div
                                    className="flex items-center text-white/30 font-semibold"
                                    style={{
                                        height: 'var(--modal-button-h)',
                                        paddingLeft: 'var(--modal-button-px)',
                                        paddingRight: 'var(--modal-button-px)',
                                        borderRadius: 'var(--modal-button-radius)',
                                        fontSize: 'var(--modal-button-font-size)'
                                    }}
                                >Cancel</div>
                                <div
                                    className="flex items-center font-bold bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/20"
                                    style={{
                                        height: 'var(--modal-button-h)',
                                        paddingLeft: 'var(--modal-button-px)',
                                        paddingRight: 'var(--modal-button-px)',
                                        borderRadius: 'var(--modal-button-radius)',
                                        fontSize: 'var(--modal-button-font-size)'
                                    }}
                                >Action</div>
                            </div>
                        </div>

                        {/* Modal Body Components Explorer - Grouped All-in-One */}
                        <div className="space-y-8 pt-8 border-t border-white/5">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/30">Middle Container (Body) Elements</h3>
                                <p className="text-white/40 text-xs font-medium italic">Grouped reference for information hierarchy and form controls.</p>
                            </div>

                            <div className="max-w-2xl mx-auto">
                                <div
                                    className="border flex flex-col shadow-2xl"
                                    style={{
                                        backgroundColor: 'var(--modal-bg)',
                                        borderColor: 'var(--modal-border)',
                                        borderRadius: 'var(--modal-radius)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Mock Header */}
                                    <div className="px-5 py-4 border-b border-white/10">
                                        <div className="text-white font-bold text-base">Grouped Elements Preview</div>
                                    </div>

                                    {/* Master Body Content */}
                                    <div
                                        className="overflow-y-auto custom-scrollbar"
                                        style={{
                                            paddingTop: 'var(--modal-body-py)',
                                            paddingBottom: 'var(--modal-body-py)',
                                            paddingLeft: 'var(--modal-body-px)',
                                            paddingRight: 'var(--modal-body-px)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 'var(--modal-body-gap)'
                                        }}
                                    >
                                        {/* 1. Modal Description */}
                                        <div className="space-y-1">
                                            <p style={{
                                                fontSize: 'var(--modal-desc-size)',
                                                color: 'var(--modal-desc-color)',
                                                lineHeight: 1.5
                                            }}>
                                                Standard description block using <code>--modal-desc</code> tokens. This provides context for the entire modal or specific sections within it.
                                            </p>
                                        </div>

                                        {/* 2. Grouped Section: Basic Inputs */}
                                        <div className="space-y-4 pt-2">
                                            <h4 style={{
                                                fontSize: 'var(--modal-subtitle-size)',
                                                fontWeight: 'var(--modal-subtitle-weight)',
                                                color: 'var(--modal-subtitle-color)',
                                                textTransform: 'var(--modal-subtitle-transform)' as any,
                                                letterSpacing: 'var(--modal-subtitle-spacing)'
                                            }}>Basic Information</h4>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--modal-label-gap)' }}>
                                                    <label style={{ fontSize: 'var(--modal-label-size)', fontWeight: 700, color: 'var(--modal-label-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Standard Label</label>
                                                    <input
                                                        type="text"
                                                        value={mockInput}
                                                        onChange={(e) => setMockInput(e.target.value)}
                                                        className="w-full transition-all focus:border-indigo-500 outline-none"
                                                        style={{
                                                            height: 'var(--modal-input-h)',
                                                            borderRadius: 'var(--modal-input-radius)',
                                                            backgroundColor: 'var(--modal-input-bg)',
                                                            padding: '0 var(--modal-input-px)',
                                                            fontSize: 'var(--modal-input-font-size)',
                                                            border: '1px solid var(--modal-border)',
                                                            color: 'white'
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--modal-label-gap)' }} className="relative">
                                                    <label style={{ fontSize: 'var(--modal-label-size)', fontWeight: 700, color: 'var(--modal-label-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dropdown</label>
                                                    <button
                                                        onClick={() => setMockDropdownOpen(!mockDropdownOpen)}
                                                        className="flex justify-between items-center w-full text-left transition-all"
                                                        style={{
                                                            height: 'var(--modal-input-h)',
                                                            borderRadius: 'var(--modal-input-radius)',
                                                            backgroundColor: 'var(--modal-input-bg)',
                                                            paddingLeft: 'var(--modal-input-px)',
                                                            paddingRight: 'var(--modal-input-px)',
                                                            fontSize: 'var(--modal-input-font-size)',
                                                            border: '1px solid',
                                                            borderColor: mockDropdownOpen ? 'var(--primary)' : 'var(--modal-border)',
                                                            boxShadow: mockDropdownOpen ? '0 0 0 1px var(--primary)' : 'none',
                                                            color: mockDropdownValue === "Select option" ? 'rgba(255,255,255,0.2)' : 'white'
                                                        }}
                                                    >
                                                        <span>{mockDropdownValue}</span>
                                                        <ChevronDown size={14} className={`text-white/30 transition-transform duration-200 ${mockDropdownOpen ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    {/* Mock Dropdown Menu */}
                                                    {mockDropdownOpen && (
                                                        <div
                                                            className="absolute top-full left-0 right-0 mt-2 border shadow-2xl z-[100] max-h-48 overflow-y-auto py-1"
                                                            style={{
                                                                backgroundColor: 'var(--modal-bg)',
                                                                borderColor: 'var(--modal-border)',
                                                                borderRadius: 'var(--modal-input-radius)',
                                                            }}
                                                        >
                                                            {["Option A", "Option B", "Option C"].map(opt => (
                                                                <button
                                                                    key={opt}
                                                                    onClick={() => {
                                                                        setMockDropdownValue(opt)
                                                                        setMockDropdownOpen(false)
                                                                    }}
                                                                    className={`w-full px-4 py-2.5 text-left text-[13px] hover:bg-white/5 transition-colors ${mockDropdownValue === opt ? 'text-primary font-bold bg-primary/5' : 'text-white/70'}`}
                                                                >
                                                                    {opt}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--modal-label-gap)' }}>
                                                <label style={{ fontSize: 'var(--modal-label-size)', fontWeight: 700, color: 'var(--modal-label-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Multi-line Notes (Textarea)</label>
                                                <textarea
                                                    value={mockTextarea}
                                                    onChange={(e) => setMockTextarea(e.target.value)}
                                                    className="w-full transition-all focus:border-indigo-500 outline-none resize-none custom-scrollbar"
                                                    style={{
                                                        height: '80px',
                                                        borderRadius: 'var(--modal-input-radius)',
                                                        backgroundColor: 'var(--modal-input-bg)',
                                                        padding: '12px var(--modal-input-px)',
                                                        fontSize: 'var(--modal-input-font-size)',
                                                        border: '1px solid var(--modal-border)',
                                                        color: 'white',
                                                        lineHeight: 1.5
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Separator */}
                                        <div style={{ paddingTop: 'var(--modal-separator-my)', paddingBottom: 'var(--modal-separator-my)' }}>
                                            <div className="h-px w-full" style={{ backgroundColor: 'var(--modal-separator)' }} />
                                        </div>

                                        {/* 3. Grouped Section: Selection Controls */}
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-end">
                                                <h4 style={{
                                                    fontSize: 'var(--modal-subtitle-size)',
                                                    fontWeight: 'var(--modal-subtitle-weight)',
                                                    color: 'var(--modal-subtitle-color)',
                                                    textTransform: 'var(--modal-subtitle-transform)' as any,
                                                    letterSpacing: 'var(--modal-subtitle-spacing)'
                                                }}>Preferences & Privacy</h4>

                                                {/* Binary Toggle (Switch) */}
                                                <div className="flex items-center gap-3">
                                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>ANONYMOUS</span>
                                                    <button
                                                        onClick={() => setMockToggle(!mockToggle)}
                                                        className={`w-8 h-4.5 rounded-full p-0.5 transition-colors relative ${mockToggle ? 'bg-indigo-500' : 'bg-white/10'}`}
                                                    >
                                                        <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${mockToggle ? 'translate-x-3.5' : 'translate-x-0'}`} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                {/* Radio Group */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--modal-label-gap-lg)' }}>
                                                    <label style={{ fontSize: 'var(--modal-label-size)', fontWeight: 700, color: 'var(--modal-label-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Access Type</label>
                                                    <div className="space-y-3">
                                                        {["Public Access", "Private Access"].map(opt => (
                                                            <div
                                                                key={opt}
                                                                onClick={() => setMockRadio(opt)}
                                                                className="flex items-center gap-3 group cursor-pointer"
                                                            >
                                                                <div className={`w-4.5 h-4.5 rounded-full border transition-all flex items-center justify-center ${mockRadio === opt ? 'bg-indigo-500 border-indigo-500' : 'bg-white/5 border-white/20'}`}>
                                                                    {mockRadio === opt && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                                                                </div>
                                                                <span style={{ fontSize: 'var(--modal-option-size)', color: mockRadio === opt ? 'white' : 'var(--modal-option-color)' }} className="transition-colors">
                                                                    {opt}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Checkbox Group */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--modal-label-gap-lg)' }}>
                                                    <label style={{ fontSize: 'var(--modal-label-size)', fontWeight: 700, color: 'var(--modal-label-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notifications</label>
                                                    <div className="space-y-3">
                                                        {["Email Alerts", "Push Updates"].map(opt => {
                                                            const isActive = mockChecks.includes(opt)
                                                            return (
                                                                <div
                                                                    key={opt}
                                                                    onClick={() => {
                                                                        if (isActive) setMockChecks(mockChecks.filter(c => c !== opt))
                                                                        else setMockChecks([...mockChecks, opt])
                                                                    }}
                                                                    className="flex items-center gap-3 group cursor-pointer"
                                                                >
                                                                    <div className={`w-4.5 h-4.5 rounded-md border transition-all flex items-center justify-center ${isActive ? 'bg-indigo-500 border-indigo-500' : 'bg-white/5 border-white/20'}`}>
                                                                        {isActive && <Check size={12} className="text-white" />}
                                                                    </div>
                                                                    <span style={{ fontSize: 'var(--modal-option-size)', color: isActive ? 'white' : 'var(--modal-option-color)' }} className="transition-colors">
                                                                        {opt}
                                                                    </span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Separator */}
                                        <div style={{ paddingTop: 'var(--modal-separator-my)', paddingBottom: 'var(--modal-separator-my)' }}>
                                            <div className="h-px w-full" style={{ backgroundColor: 'var(--modal-separator)' }} />
                                        </div>

                                        {/* 4. Grouped Section: Metadata Rows */}
                                        <div className="space-y-3">
                                            <h4 style={{
                                                fontSize: 'var(--modal-subtitle-size)',
                                                fontWeight: 'var(--modal-subtitle-weight)',
                                                color: 'var(--modal-subtitle-color)',
                                                textTransform: 'var(--modal-subtitle-transform)' as any,
                                                letterSpacing: 'var(--modal-subtitle-spacing)'
                                            }}>System Details</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div style={{ fontSize: 'var(--modal-label-size)', fontWeight: 700, opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>Last Modified</div>
                                                    <div style={{
                                                        fontSize: 'var(--modal-value-size)',
                                                        fontWeight: 'var(--modal-value-weight)',
                                                        color: 'var(--modal-value-color)',
                                                        marginTop: '4px'
                                                    }}>Oct 24, 2023</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 'var(--modal-label-size)', fontWeight: 700, opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>Access Level</div>
                                                    <div style={{
                                                        fontSize: 'var(--modal-value-size)',
                                                        fontWeight: 'var(--modal-value-weight)',
                                                        color: 'var(--modal-value-color)',
                                                        marginTop: '4px'
                                                    }}>Administrator</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 5. Notice Box (Separate Footer Section) */}
                                        <div style={{ paddingTop: '1.5rem' }}>
                                            <div style={{
                                                backgroundColor: 'var(--modal-notice-bg)',
                                                border: '1px solid var(--modal-notice-border)',
                                                borderRadius: 'var(--modal-notice-radius)',
                                                padding: 'var(--modal-notice-py) var(--modal-notice-px)',
                                            }}>
                                                <p style={{
                                                    fontSize: 'var(--modal-notice-font-size)',
                                                    fontWeight: 400,
                                                    color: 'var(--modal-notice-text-color)',
                                                    lineHeight: 1.5
                                                }}>
                                                    Standard notice box for high-visibility secondary information.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mock Footer */}
                                    <div
                                        className="flex justify-end gap-2 border-t"
                                        style={{
                                            paddingTop: 'var(--modal-footer-py)',
                                            paddingBottom: 'var(--modal-footer-py)',
                                            paddingLeft: 'var(--modal-footer-px)',
                                            paddingRight: 'var(--modal-footer-px)',
                                            backgroundColor: 'var(--modal-footer-bg)',
                                            borderColor: 'var(--modal-border)'
                                        }}
                                    >
                                        <div
                                            className="flex items-center text-white/30 font-semibold"
                                            style={{
                                                height: 'var(--modal-button-h)',
                                                paddingLeft: 'var(--modal-button-px)',
                                                paddingRight: 'var(--modal-button-px)',
                                                borderRadius: 'var(--modal-button-radius)',
                                                fontSize: 'var(--modal-button-font-size)'
                                            }}
                                        >Cancel</div>
                                        <div
                                            className="flex items-center font-bold bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/20"
                                            style={{
                                                height: 'var(--modal-button-h)',
                                                paddingLeft: 'var(--modal-button-px)',
                                                paddingRight: 'var(--modal-button-px)',
                                                borderRadius: 'var(--modal-button-radius)',
                                                fontSize: 'var(--modal-button-font-size)'
                                            }}
                                        >Close Preview</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Token Groups */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5 bg-[#1A1F2E] p-6 rounded-2xl mt-8">
                        {/* Group 1: Surface & Backdrop */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Surface & Elevation</h3>
                            <div className="space-y-2">
                                <TokenRow label="Background" value="--modal-bg: #252B3B" />
                                <TokenRow label="Border" value="--modal-border: white/10" />
                                <TokenRow label="Radius" value="--modal-radius: 24px" />
                                <TokenRow label="Backdrop" value="Blur 12px / Glass" />
                            </div>
                        </div>

                        {/* Group 2: Body Layout */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Layout Grid (Compact)</h3>
                            <div className="space-y-2">
                                <TokenRow label="Container Pad" value="1rem (16px)" />
                                <TokenRow label="Field Gap" value="0.75rem (12px)" />
                                <TokenRow label="Header Height" value="12px PY" />
                                <TokenRow label="Footer Height" value="14px PY" />
                            </div>
                        </div>

                        {/* Group 3: Form Elements */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Inputs & Fields</h3>
                            <div className="space-y-2">
                                <TokenRow label="Input Height" value="40px" />
                                <TokenRow label="Input Radius" value="12px" />
                                <TokenRow label="Label Size" value="10px / BOLD / CAPS" />
                                <TokenRow label="Label Color" value="White/40" />
                            </div>
                        </div>

                        {/* Group 4: Buttons & UI */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Actions & UI</h3>
                            <div className="space-y-2">
                                <TokenRow label="Button DNA" value="38px H / Pill Shape" />
                                <TokenRow label="Action Color" value="Indigo-600 (#4F46E5)" />
                                <TokenRow label="Notice Box" value="12px Radius / Blue Tint" />
                            </div>
                        </div>
                    </div>
                </section>


                {/* =====================================================
                    SIDE PANEL TOKEN SYSTEM
                ====================================================== */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Side Panel</h2>
                        <p className="text-sm text-[#64748B]">Slide-out panel for profile and settings. Shares aesthetic DNA with modals but has compact header and outline action buttons.</p>
                    </div>

                    {/* Preview Container */}
                    <div className="bg-[#1A1F2E] rounded-3xl p-6 border border-black/[0.05] shadow-sm relative overflow-hidden min-h-[500px]">
                        {/* Panel Preview */}
                        <div className="relative" style={{ width: 'var(--sidepanel-width)', maxWidth: '100%' }}>
                            <div
                                className="border flex flex-col overflow-hidden"
                                style={{
                                    backgroundColor: 'var(--sidepanel-bg)',
                                    borderColor: 'var(--sidepanel-border)',
                                    borderRadius: 'var(--sidepanel-radius)',
                                    boxShadow: 'var(--sidepanel-shadow)',
                                }}
                            >
                                {/* Panel Header */}
                                <div
                                    className="flex items-center justify-between border-b"
                                    style={{
                                        paddingTop: 'var(--sidepanel-header-py)',
                                        paddingBottom: 'var(--sidepanel-header-py)',
                                        paddingLeft: 'var(--sidepanel-header-px)',
                                        paddingRight: 'var(--sidepanel-header-px)',
                                        borderColor: 'var(--sidepanel-border)'
                                    }}
                                >
                                    <h2 style={{
                                        fontSize: 'var(--sidepanel-header-title-size)',
                                        fontWeight: 'var(--sidepanel-header-title-weight)',
                                        color: 'var(--sidepanel-header-title-color)',
                                    }}>My profile</h2>
                                    <button className="p-1.5 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-colors"><X className="w-4 h-4" /></button>
                                </div>

                                {/* Panel Body */}
                                <div style={{ padding: 'var(--sidepanel-body-p)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sidepanel-body-gap)' }}>
                                        {/* Avatar Section */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border border-white/10 flex items-center justify-center text-2xl">
                                                👩‍🏫
                                            </div>
                                            <button className="mt-2 text-[11px] font-bold text-primary hover:text-primary/80 uppercase tracking-wider">Edit</button>
                                        </div>

                                        {/* Profile Info */}
                                        <div className="space-y-3">
                                            {[
                                                { label: "Name", value: "Maja", prominent: true },
                                                { label: "Group", value: "Butterflies", prominent: false },
                                                { label: "School", value: "Little Academy", prominent: false },
                                                { label: "Email", value: "maja@skola.se", prominent: false },
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center py-0.5">
                                                    <span style={{
                                                        fontSize: 'var(--sidepanel-info-label-size)',
                                                        fontWeight: 'var(--sidepanel-info-label-weight)',
                                                        color: 'var(--sidepanel-info-label-color)',
                                                    }}>{item.label}</span>
                                                    <span style={{
                                                        fontSize: item.prominent ? 'var(--sidepanel-info-value-prominent-size)' : 'var(--sidepanel-info-value-size)',
                                                        fontWeight: item.prominent ? 'var(--sidepanel-info-value-prominent-weight)' : 'var(--sidepanel-info-value-weight)',
                                                        color: item.prominent ? 'var(--sidepanel-info-value-prominent-color)' : 'var(--sidepanel-info-value-color)',
                                                    }}>{item.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 pt-4 border-t" style={{ borderColor: 'var(--sidepanel-border)' }}>
                                            <button
                                                className="flex items-center justify-center gap-2 border hover:bg-white/5 transition-all"
                                                style={{
                                                    borderRadius: 'var(--sidepanel-action-radius)',
                                                    paddingTop: 'var(--sidepanel-action-py)',
                                                    paddingBottom: 'var(--sidepanel-action-py)',
                                                    paddingLeft: 'var(--sidepanel-action-px)',
                                                    paddingRight: 'var(--sidepanel-action-px)',
                                                    fontSize: 'var(--sidepanel-action-font-size)',
                                                    fontWeight: 'var(--sidepanel-action-font-weight)',
                                                    color: 'var(--sidepanel-action-color)',
                                                    borderColor: 'var(--sidepanel-action-border)',
                                                }}
                                            >
                                                <Key className="w-3.5 h-3.5" />
                                                <span>Change password</span>
                                            </button>
                                            <button
                                                className="flex items-center justify-center gap-2 border hover:bg-white/5 transition-all"
                                                style={{
                                                    borderRadius: 'var(--sidepanel-action-radius)',
                                                    paddingTop: 'var(--sidepanel-action-py)',
                                                    paddingBottom: 'var(--sidepanel-action-py)',
                                                    paddingLeft: 'var(--sidepanel-action-px)',
                                                    paddingRight: 'var(--sidepanel-action-px)',
                                                    fontSize: 'var(--sidepanel-action-font-size)',
                                                    fontWeight: 'var(--sidepanel-action-font-weight)',
                                                    color: 'var(--sidepanel-action-color)',
                                                    borderColor: 'var(--sidepanel-action-border)',
                                                }}
                                            >
                                                <Mic className="w-3.5 h-3.5" />
                                                <span>Voice sample</span>
                                            </button>
                                        </div>

                                        {/* Logout */}
                                        <div className="pt-4 border-t" style={{ borderColor: 'var(--sidepanel-border)' }}>
                                            <button
                                                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl transition-colors font-semibold text-sm hover:bg-red-500/10"
                                                style={{ color: 'var(--sidepanel-logout-color)' }}
                                            >
                                                <LogOut className="w-3.5 h-3.5" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Token Groups */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5 bg-[#1A1F2E] p-6 rounded-2xl mt-8">
                            {/* Group 1: Surface */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Surface & Elevation</h3>
                                <div className="space-y-2">
                                    <TokenRow label="Background" value="--sidepanel-bg: #252B3B" />
                                    <TokenRow label="Border" value="--sidepanel-border: white/10" />
                                    <TokenRow label="Radius" value="--sidepanel-radius: 12px" />
                                    <TokenRow label="Width" value="--sidepanel-width: 320px" />
                                </div>
                            </div>

                            {/* Group 2: Header & Body */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Layout (Compact)</h3>
                                <div className="space-y-2">
                                    <TokenRow label="Header PY" value="0.5rem (8px)" />
                                    <TokenRow label="Header PX" value="1rem (16px)" />
                                    <TokenRow label="Body Padding" value="1.5rem (24px)" />
                                    <TokenRow label="Body Gap" value="1.5rem (24px)" />
                                </div>
                            </div>

                            {/* Group 3: Info Items */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Info Items</h3>
                                <div className="space-y-2">
                                    <TokenRow label="Label" value="11px / Bold / white/35" />
                                    <TokenRow label="Value" value="12px / 500 / white/70" />
                                    <TokenRow label="Value (Prominent)" value="14px / 600 / white" />
                                </div>
                            </div>

                            {/* Group 4: Actions */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Action Buttons</h3>
                                <div className="space-y-2">
                                    <TokenRow label="Radius" value="12px" />
                                    <TokenRow label="Padding" value="10px / 16px" />
                                    <TokenRow label="Border" value="white/10 → white/20" />
                                    <TokenRow label="Logout" value="red-500/80 → red-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Brand Tokens</h2>
                        <p className="text-sm text-[#64748B]">Global CSS variables defining the aesthetic identity.</p>
                    </div>
                    <div className="bg-white p-4 rounded-3xl border border-black/[0.05] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC]">
                            <div className="w-12 h-12 rounded-xl bg-primary shadow-sm ring-4 ring-primary/10" />
                            <div className="flex flex-col">
                                <span className="font-black text-xs uppercase tracking-widest text-black/40">Primary (Brand)</span>
                                <span className="font-bold text-[#0F172A]">Yellow (#F8CB16)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC]">
                            <div className="w-12 h-12 rounded-xl bg-secondary shadow-sm ring-4 ring-secondary/10" />
                            <div className="flex flex-col">
                                <span className="font-black text-xs uppercase tracking-widest text-black/40">Secondary (Accent)</span>
                                <span className="font-bold text-[#0F172A]">Indigo (#4F46E5)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC]">
                            <div className="w-12 h-12 rounded-xl bg-[#1A1F2E] shadow-sm ring-4 ring-black/10" />
                            <div className="flex flex-col">
                                <span className="font-black text-xs uppercase tracking-widest text-black/40">Canvas (Deep)</span>
                                <span className="font-bold text-[#0F172A]">Slate 900 (#1A1F2E)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC]">
                            <div className="w-12 h-12 rounded-xl bg-white border border-black/[0.08] shadow-sm ring-4 ring-black/5" />
                            <div className="flex flex-col">
                                <span className="font-black text-xs uppercase tracking-widest text-black/40">Surface (White)</span>
                                <span className="font-bold text-[#0F172A]">White (#FFFFFF)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    SIDEBAR NAVIGATION SYSTEM
                ====================================================== */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-[#1A1F2E]">Navigation Rail</h2>
                        <p className="text-sm text-[#64748B]">Primary navigation sidebar. Supports Teacher (Full) and Kid (Simplified) modes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Variant: Teacher */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Teacher Default</h3>
                            <div className="h-[700px] bg-[#0B0F1A] rounded-3xl overflow-hidden relative flex border border-black/10 shadow-2xl">
                                <Sidebar
                                    variant="teacher"
                                    activeView="main"
                                    userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                                />
                                <div className="flex-1 bg-white/5 p-8">
                                    <div className="w-full h-32 bg-white/5 rounded-2xl mb-4" />
                                    <div className="w-2/3 h-8 bg-white/5 rounded-xl" />
                                </div>
                            </div>
                        </div>

                        {/* Variant: Kid */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-black/30">Kid / Handover View</h3>
                            <div className="h-[700px] bg-[#0B0F1A] rounded-3xl overflow-hidden relative flex border border-black/10 shadow-2xl">
                                <Sidebar
                                    variant="kids"
                                    activeView="kids"
                                    kidAvatar="/kidsavatars/butterfly.png"
                                    handOverActive={true}
                                />
                                <div className="flex-1 bg-gradient-to-br from-[#4F46E5]/20 to-purple-500/20 p-8">
                                    <p className="text-white/50 font-bold text-center mt-20">Kid's Dashboard Preview</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}
