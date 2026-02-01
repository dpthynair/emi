import { useState } from "react"
import { TrendingUp, BookOpen, Calculator, FlaskConical, Heart, Play } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { GraphCard, KPICard, DataInsightCard, CustomTooltip } from "@/components/DashboardComponents"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Header } from "@/components/Header"
import { MoreMenu } from "@/components/MoreMenu"
import { SegmentedToggle } from "@/components/SegmentedToggle"
import { DropdownFilter } from "@/components/DropdownFilter"
// ==========================================
// MOCK DATA (Global & Detail)
// ==========================================

const ACTIVITIES = [
    {
        id: "a1",
        code: "L-101",
        title: "Playground Picture",
        description: "Answer eMi’s Questions About the Playground",
        thumbnail: "/activities/language/playground_medium.jpg",
        difficulty: ["Easy", "Medium", "Hard"]
    },
    {
        id: "a2",
        code: "L-102",
        title: "Bathroom Picture",
        description: "Answer eMi’s Questions About the Bathroom",
        thumbnail: "/activities/language/bathroom_medium.jpg",
        difficulty: ["Easy", "Medium", "Hard"]
    },
    {
        id: "a3",
        code: "L-103",
        title: "Pop the Letter!",
        description: "Find the Alphabet and Burst the Bubble",
        thumbnail: "/activities/language/bubbles_medium.jpg",
        difficulty: ["Easy", "Medium", "Hard"]
    },
    {
        id: "a4",
        code: "L-104",
        title: "Toy Sort",
        description: "Drag and Drop the Right Toys into the Basket",
        thumbnail: "/activities/language/toybasket_medium.jpg",
        difficulty: ["Easy", "Medium", "Hard"]
    },
    {
        id: "a5",
        code: "L-105",
        title: "Match It!",
        description: "Draw Lines to Match the Correct Items",
        thumbnail: "/activities/language/opposites_medium.jpg",
        difficulty: ["Easy", "Medium", "Hard"]
    },
    {
        id: "a6",
        code: "L-106",
        title: "Trace the Letter",
        description: "Draw Along the Alphabet with eMi",
        thumbnail: "/activities/language/trace_medium.jpg",
        difficulty: ["Easy", "Medium", "Hard"]
    }
]

const LEARNING_AREAS = [
    { id: "language", label: "Language", icon: BookOpen, active: true },
    { id: "math", label: "Math", icon: Calculator, active: false },
    { id: "science", label: "Science", icon: FlaskConical, active: false },
    { id: "emotional", label: "Emotional well-being", icon: Heart, active: false },
]

const LEVELS = ["Easy", "Medium", "Hard"];
const PERIOD_OPTIONS = ["Today", "Last 7 days", "Last 30 days", "This school year"];

const AVATAR_MAP: Record<string, string> = {
    "apple": "/kidsavatars/apple.png",
    "ball": "/kidsavatars/ball.png",
    "balloon": "/kidsavatars/balloon.png",
    "butterfly": "/kidsavatars/butterfly.png",
    "car": "/kidsavatars/car.png",
    "cat": "/kidsavatars/cat.png",
    "ferry": "/kidsavatars/ferry.png",
    "flight": "/kidsavatars/flight.png",
    "flower1": "/kidsavatars/flower1.png",
    "flower2": "/kidsavatars/flower2.png",
    "horse": "/kidsavatars/hrse.png",
    "ice": "/kidsavatars/ice.png",
    "melon": "/kidsavatars/melon.png",
    "panda": "/kidsavatars/panda.png",
    "pen": "/kidsavatars/pen.png",
    "puppy": "/kidsavatars/puppy.png",
    "snail": "/kidsavatars/snail.png",
    "snoman": "/kidsavatars/snoman.png",
    "sparrow": "/kidsavatars/sparrow.png",
    "star": "/kidsavatars/star.png",
    "strawberry": "/kidsavatars/strawberry.png",
    "sun": "/kidsavatars/sun.png",
    "tree": "/kidsavatars/tree.png",
    "umbrella": "/kidsavatars/umbrella.png"
}

// Mock Data for Charts (Updated with correct avatar keys)
const MOCK_KID_SCORES = [
    { id: "K1", avatar: "apple", score: 9.1, hint: "Maja" },
    { id: "K2", avatar: "star", score: 8.9, hint: "Liam" },
    { id: "K3", avatar: "melon", score: 8.8, hint: "Noah" },
    { id: "K4", avatar: "balloon", score: 9.3, hint: "Olivia" },
    { id: "K5", avatar: "umbrella", score: 9.0, hint: "William" },
    { id: "K6", avatar: "flower1", score: 8.7, hint: "Emma" },
    { id: "K7", avatar: "sun", score: 6.6, hint: "Lucas" },
    { id: "K8", avatar: "strawberry", score: 6.2, hint: "Oliver" },
    { id: "K9", avatar: "butterfly", score: 6.0, hint: "Isabella" },
    { id: "K10", avatar: "snail", score: 6.8, hint: "Ava" },
    { id: "K11", avatar: "car", score: 5.9, hint: "James" },
    { id: "K12", avatar: "tree", score: 6.4, hint: "Sophia" },
    { id: "K13", avatar: "puppy", score: 5.8, hint: "Elijah" },
    { id: "K14", avatar: "flight", score: 3.4, hint: "Charlotte" },
    { id: "K15", avatar: "sparrow", score: 2.9, hint: "Mia" },
    { id: "K16", avatar: "ice", score: 3.1, hint: "Amelia" },
    { id: "K17", avatar: "ferry", score: 2.7, hint: "Harper" },
    { id: "K18", avatar: "cat", score: 2.5, hint: "Evelyn" }
];

const MOCK_AGE_DATA = [
    { name: "3-4", value: 7.2, color: "#10B981" },
    { name: "4-5", value: 8.5, color: "#F59E0B" },
    { name: "5-6", value: 7.8, color: "#6366F1" }
];

const MOCK_GENDER_DATA = [
    { name: "Girls", value: 8.4, color: "#EC4899" },
    { name: "Boys", value: 7.8, color: "#4F46E5" }
];


// ==========================================
// REUSED DASHBOARD COMPONENTS (STRICT)
// ==========================================



function AvatarTick({ x, y, payload, onSelect }: any) {
    // Find student to get avatar
    const student = MOCK_KID_SCORES.find(s => s.hint === payload.value);
    const avatarUrl = student ? AVATAR_MAP[student.avatar] : null;

    if (!avatarUrl) return null;

    return (
        <g
            transform={`translate(${x},${y})`}
            onClick={() => student && onSelect?.(student.avatar)}
            style={{ cursor: 'pointer' }}
        >
            <foreignObject x={-10} y={10} width={20} height={20}>
                <div className="w-5 h-5 rounded-full overflow-hidden border border-black/5 shadow-sm bg-white p-0.5">
                    <img src={avatarUrl} alt={payload.value} className="w-full h-full object-contain" />
                </div>
            </foreignObject>
        </g>
    )
}





// ==========================================
// MAIN COMPONENT
// ==========================================

export function ActivitiesPage({ selectedActivity, setSelectedActivity, onSelectStudent }: {
    selectedActivity: any,
    setSelectedActivity: (activity: any) => void,
    onSelectStudent?: (avatar: string) => void
}) {
    // Grid State
    const [activeTab, setActiveTab] = useState("language")

    // Detail State
    const [selectedLevel, setSelectedLevel] = useState("Easy")
    const [dateFilter, setDateFilter] = useState("This school year")
    const [activeStudentIndex, setActiveStudentIndex] = useState<number | null>(null)

    return (
        <div className={selectedActivity ? "panel-fixed" : "panel-scroll"}>
            <div className={`flex-1 flex flex-col w-full h-full ${selectedActivity ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'} relative`}>

                {/* HEADER (Conditional) */}
                <Header
                    left={
                        selectedActivity ? (
                            <Breadcrumb
                                items={[
                                    { label: "Activities", onClick: () => setSelectedActivity(null) },
                                    { label: selectedActivity.title, active: true },
                                ]}
                            />
                        ) : (
                            <Breadcrumb
                                items={[
                                    { label: "Activities", active: true }
                                ]}
                            />
                        )
                    }
                    right={
                        selectedActivity ? (
                            <>
                                {/* Level Tabs (Pills with Dots) using SegmentedToggle Token */}
                                <SegmentedToggle
                                    options={[
                                        { label: "Easy", value: "Easy", color: "#10B981" },
                                        { label: "Medium", value: "Medium", color: "#F59E0B" },
                                        { label: "Hard", value: "Hard", color: "#EF4444" }
                                    ]}
                                    value={selectedLevel}
                                    onChange={(val) => setSelectedLevel(val)}
                                />

                                {/* Date Filter (Reused from Dashboard) */}
                                <DropdownFilter
                                    value={dateFilter}
                                    options={PERIOD_OPTIONS}
                                    onChange={(val) => setDateFilter(val)}
                                />

                                <div className="w-px h-6 bg-black/[0.08]" />
                                <MoreMenu context="activities" />
                            </>
                        ) : (
                            /* Grid View Controls */
                            <>
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                    {LEARNING_AREAS.map((area) => (
                                        <button
                                            key={area.id}
                                            disabled={!area.active}
                                            onClick={() => area.active && setActiveTab(area.id)}
                                            className="flex items-center border transition-all duration-200 whitespace-nowrap"
                                            style={{
                                                paddingLeft: 'var(--pilltab-px)',
                                                paddingRight: 'var(--pilltab-px)',
                                                paddingTop: 'var(--pilltab-py)',
                                                paddingBottom: 'var(--pilltab-py)',
                                                gap: 'var(--pilltab-gap)',
                                                borderRadius: 'var(--pilltab-radius)',
                                                fontSize: 'var(--pilltab-font-size)',
                                                fontWeight: 'var(--pilltab-font-weight)',
                                                backgroundColor: activeTab === area.id
                                                    ? 'var(--pilltab-active-bg)'
                                                    : area.active
                                                        ? 'var(--pilltab-inactive-bg)'
                                                        : 'transparent',
                                                color: activeTab === area.id
                                                    ? 'var(--pilltab-active-text)'
                                                    : area.active
                                                        ? 'var(--pilltab-inactive-text)'
                                                        : 'var(--pilltab-disabled-text)',
                                                borderColor: activeTab === area.id
                                                    ? 'var(--pilltab-active-border)'
                                                    : area.active
                                                        ? 'var(--pilltab-inactive-border)'
                                                        : 'transparent',
                                                opacity: area.active ? 1 : 'var(--pilltab-disabled-opacity)',
                                                cursor: area.active ? 'pointer' : 'not-allowed',
                                                boxShadow: activeTab === area.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                                            }}
                                        >
                                            <area.icon style={{ width: 'var(--pilltab-icon-size)', height: 'var(--pilltab-icon-size)' }} />
                                            {area.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-px h-6 bg-black/[0.08]" />
                                <MoreMenu context="activities" />
                            </>
                        )
                    }
                />

                {/* CONTENT */}
                <div className={`${selectedActivity ? 'p-panel-tight flex-1 flex flex-col min-h-0' : 'p-panel-wide w-full h-full'}`}>
                    {selectedActivity ? (
                        /* DETAIL VIEW (Grid Layout mimicking Dashboard) */
                        <div className={`grid grid-rows-[auto_1fr_1fr] ${selectedActivity ? 'gap-gap-tight' : 'gap-gap-wide'} w-full flex-1 h-full min-h-0`}>
                            {/* Row 1: KPI Cards */}
                            <div className={`grid grid-cols-1 sm:grid-cols-4 ${selectedActivity ? 'gap-gap-tight' : 'gap-gap-wide'}`}>
                                {/* Card 1: Activity Thumbnail */}
                                <div
                                    className="bg-white rounded-card border border-card-border shadow-card overflow-hidden relative"
                                    style={{ height: 'var(--activitycard-h)', padding: 'var(--activitycard-thumb-p)' }}
                                >
                                    <img
                                        src={selectedActivity.thumbnail}
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
                                        <Play size={12} fill="currentColor" className="ml-0.5" />
                                    </div>
                                </div>

                                {/* Card 2: Activity Details */}
                                <div
                                    className="bg-white rounded-card border border-card-border shadow-card flex flex-col justify-center"
                                    style={{ height: 'var(--activitycard-h)', padding: 'var(--activitycard-details-p)' }}
                                >
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className="uppercase"
                                                style={{
                                                    fontSize: 'var(--activitycard-code-size)',
                                                    fontWeight: 'var(--activitycard-code-weight)',
                                                    letterSpacing: 'var(--activitycard-code-tracking)',
                                                    color: 'var(--activitycard-code-color)'
                                                }}
                                            >{selectedActivity.code}-{selectedLevel.charAt(0)}</span>
                                            <div
                                                className={`rounded-full ${selectedLevel === 'Easy' ? 'bg-[#10B981]' : selectedLevel === 'Medium' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`}
                                                style={{ width: 'var(--activitycard-status-size)', height: 'var(--activitycard-status-size)' }}
                                            />
                                        </div>
                                        <div
                                            className="truncate leading-tight mb-1"
                                            style={{
                                                fontSize: 'var(--activitycard-title-size)',
                                                fontWeight: 'var(--activitycard-title-weight)',
                                                color: 'var(--activitycard-title-color)'
                                            }}
                                        >{selectedActivity.title}</div>
                                        <div
                                            className="line-clamp-2 leading-tight"
                                            style={{
                                                fontSize: 'var(--activitycard-desc-size)',
                                                fontWeight: 'var(--activitycard-desc-weight)',
                                                color: 'var(--activitycard-desc-color)'
                                            }}
                                        >{selectedActivity.description}</div>
                                    </div>
                                </div>

                                {/* Card 3: Avg Score */}
                                <KPICard
                                    label="Avg Score"
                                    value={selectedLevel === 'Easy' ? "8.4" : selectedLevel === 'Medium' ? "7.2" : "6.5"}
                                    trend="+2.1%"
                                    icon={<TrendingUp className="w-4 h-4" />}
                                />

                                {/* Card 4: Insight */}
                                <DataInsightCard
                                    insight={`Most students are performing well in ${selectedLevel} level. Consider challenging the top performers with the next difficulty tier.`}
                                />
                            </div>

                            {/* Row 2: Overview Graph (Group Performance Overview) */}
                            <div className="flex-1 min-h-0 w-full">
                                <GraphCard title="Group Performance Overview" className="h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={MOCK_KID_SCORES}
                                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                            onMouseMove={(state: any) => {
                                                if (state && typeof state.activeTooltipIndex === 'number') {
                                                    setActiveStudentIndex(state.activeTooltipIndex);
                                                }
                                            }}
                                            onMouseLeave={() => setActiveStudentIndex(null)}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis
                                                dataKey="hint"
                                                axisLine={false}
                                                tickLine={false}
                                                interval={0}
                                                height={40}
                                                tick={<AvatarTick onSelect={onSelectStudent} />}
                                            />
                                            <YAxis domain={[0, 10]} hide />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }} />
                                            <Bar
                                                dataKey="score"
                                                radius={[4, 4, 0, 0]}
                                                barSize={24}
                                                label={{ position: 'top', fill: '#0F172A', fontSize: 12, fontWeight: 700 }}
                                                onClick={(data: any) => {
                                                    if (data && data.avatar) {
                                                        onSelectStudent?.(data.avatar);
                                                    } else if (data && data.payload && data.payload.avatar) {
                                                        onSelectStudent?.(data.payload.avatar);
                                                    }
                                                }}
                                            >
                                                {MOCK_KID_SCORES.map((_, index: number) => {
                                                    const isActive = activeStudentIndex === index;
                                                    const color = selectedLevel === 'Easy' ? '#10B981' : selectedLevel === 'Medium' ? '#F59E0B' : '#EF4444';
                                                    return (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={color}
                                                            fillOpacity={activeStudentIndex === null || isActive ? 1 : 0.4}
                                                            style={{
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s ease',
                                                                filter: isActive ? `drop-shadow(0 0 8px ${color}40)` : 'none'
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </GraphCard>
                            </div>

                            {/* Row 3: Breakdown Graphs */}
                            <div className={`flex-1 min-h-0 w-full grid grid-cols-2 ${selectedActivity ? 'gap-gap-tight' : 'gap-gap-wide'}`}>
                                <div className="h-full min-h-0">
                                    <GraphCard title="Age Breakdown" className="h-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={MOCK_AGE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} />
                                                <YAxis domain={[0, 10]} hide />
                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }} />
                                                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40} label={{ position: 'top', fill: '#0F172A', fontSize: 12, fontWeight: 700 }}>
                                                    {MOCK_AGE_DATA.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </GraphCard>
                                </div>

                                <div className="h-full min-h-0">
                                    <GraphCard title="Gender Breakdown" className="h-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={MOCK_GENDER_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} />
                                                <YAxis domain={[0, 10]} hide />
                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }} />
                                                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40} label={{ position: 'top', fill: '#0F172A', fontSize: 12, fontWeight: 700 }}>
                                                    {MOCK_GENDER_DATA.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </GraphCard>
                                </div>
                            </div>
                        </div>

                    ) : (
                        /* GRID VIEW (Existing) */
                        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
                            {ACTIVITIES.map((activity) => (
                                <div
                                    key={activity.id}
                                    onClick={() => setSelectedActivity(activity)}
                                    className="group flex flex-col cursor-pointer"
                                    style={{ gap: 'var(--activitygrid-gap)' }}
                                >
                                    {/* Thumbnail Card */}
                                    <div
                                        className="relative aspect-video w-full overflow-hidden shadow-sm border border-black/[0.04] bg-white group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300"
                                        style={{ borderRadius: 'var(--activitygrid-radius)' }}
                                    >
                                        <img
                                            src={activity.thumbnail}
                                            alt={activity.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Overlay Gradient - Moderate bottom only */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />

                                        {/* Activity ID - Bottom Left (No Tag) */}
                                        <div className="absolute bottom-3 left-2.5 leading-none flex items-center">
                                            <span
                                                className="uppercase tracking-widest shadow-sm drop-shadow-md"
                                                style={{ fontSize: 'var(--activitygrid-id-size)', fontWeight: 'var(--activitygrid-id-weight)', color: 'var(--activitygrid-id-color)' }}
                                            >{activity.code}</span>
                                        </div>

                                        {/* Difficulty Dots - Mac Style */}
                                        <div className="absolute bottom-3 right-3 flex" style={{ gap: 'var(--activitygrid-dot-gap)' }}>
                                            <div className="rounded-full bg-[#10B981] shadow-sm" style={{ width: 'var(--activitygrid-dot-size)', height: 'var(--activitygrid-dot-size)' }} /> {/* Easy */}
                                            <div className="rounded-full bg-[#F59E0B] shadow-sm" style={{ width: 'var(--activitygrid-dot-size)', height: 'var(--activitygrid-dot-size)' }} /> {/* Medium */}
                                            <div className="rounded-full bg-[#EF4444] shadow-sm" style={{ width: 'var(--activitygrid-dot-size)', height: 'var(--activitygrid-dot-size)' }} /> {/* Hard */}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                className="leading-tight group-hover:text-[#4F46E5] transition-colors truncate"
                                                style={{ fontSize: 'var(--activitygrid-title-size)', fontWeight: 'var(--activitygrid-title-weight)', color: 'var(--activitygrid-title-color)' }}
                                            >
                                                {activity.title}
                                            </h3>
                                            <p
                                                className="line-clamp-2 mt-0.5 leading-relaxed"
                                                style={{ fontSize: 'var(--activitygrid-desc-size)', fontWeight: 'var(--activitygrid-desc-weight)', color: 'var(--activitygrid-desc-color)' }}
                                            >
                                                {activity.description}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 mt-0.5">
                                            <div className="activity-play-side">
                                                <Play size={12} fill="currentColor" className="ml-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Dummy Cards for Scroll Validation */}
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={`dummy-${i}`} className="flex flex-col gap-2.5 opacity-50 pointer-events-none">
                                    <div className="aspect-video w-full rounded-xl bg-black/5 border border-black/[0.04]" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* PAGINATION DOTS (Reused from Dashboard but FIXED at bottom) */}
                {
                    selectedActivity && (
                        <div
                            className="absolute left-1/2 -translate-x-1/2 z-[20] pointer-events-auto"
                            style={{ bottom: 'var(--pagination-bottom)' }}
                        >
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
                                {LEVELS.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level)}
                                        className="transition-all duration-300 rounded-full"
                                        style={{
                                            width: selectedLevel === level ? 'var(--pagination-active-w)' : 'var(--pagination-dot-size)',
                                            height: 'var(--pagination-dot-size)',
                                            backgroundColor: selectedLevel === level ? 'var(--pagination-active-color)' : 'var(--pagination-inactive-color)'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    )
}
