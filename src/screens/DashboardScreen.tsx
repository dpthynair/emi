import { useState, useMemo, useRef, useEffect } from "react"
import { KidCard } from "@/components/KidCard"
import { motion, AnimatePresence } from "framer-motion"
import { Pencil, X, ChevronDown, LogOut, BookOpen, Calculator, FlaskConical, Heart, TrendingUp, Camera, Key, Mic, Maximize2, Minimize2 } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line, LabelList } from "recharts"
import { ActivitiesPage } from "./ActivitiesPage"
import { DesignSystemScreen } from "./DesignSystemScreen"
import { GraphCard, KPICard, DataInsightCard, ChevronLabel, CustomTooltip } from "@/components/DashboardComponents"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Header } from "@/components/Header"
import { SegmentedToggle } from "@/components/SegmentedToggle"
import { DropdownFilter } from "@/components/DropdownFilter"
import { HandOverToggle } from "@/components/HandOverToggle"
import { PillButton } from "@/components/PillButton"
import { MoreMenu } from "@/components/MoreMenu"
import { KidsGameEntryScreen } from "./KidsGameEntryScreen"

import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/Sidebar"
import { KidGridModal } from "@/components/KidGridModal"
import { MathGateModal } from "@/components/MathGateModal"
import { KidMode2Page } from "./KidMode2Page"
import { KidMode2GamePage } from "./KidMode2GamePage"
import { useLanguage } from "@/contexts/LanguageContext"

const CATEGORIES: { name: string; id: string; color: string }[] = [
    { name: "Language", id: "language", color: "#4F46E5" },
    { name: "Math", id: "math", color: "#10B981" },
    { name: "Science", id: "science", color: "#F59E0B" },
    { name: "Emotional well-being", id: "emotionalWellbeing", color: "#EC4899" }
]

const getYAxisDomain = (data: any[], keys: string | string[], isPercentage: boolean = false) => {
    if (!data || data.length === 0) return isPercentage ? [0, 100] : [0, 10];

    const dataKeys = Array.isArray(keys) ? keys : [keys];
    let allValues: number[] = [];

    data.forEach(item => {
        dataKeys.forEach(key => {
            const val = item[key];
            if (val !== undefined && val !== null) {
                const numericVal = typeof val === 'string' ? parseFloat(val) : val;
                if (!isNaN(numericVal)) {
                    allValues.push(numericVal);
                }
            }
        });
    });

    if (allValues.length === 0) return isPercentage ? [0, 100] : [0, 10];

    const maxVal = Math.max(...allValues);
    const padding = isPercentage ? 5 : 0.5;
    const yMax = Math.ceil(maxVal + padding);

    return [0, yMax];
};

const PERIOD_OPTIONS = ["Today", "Last 7 days", "Last 30 days", "Last 3 months", "This school year"]

const MOCK_TREND_DATA: Record<string, any[]> = {
    "Today": [
        { day: "08:00", score: 5.7, Language: 6.2, Math: 6.4, Science: 5.9, "Emotional well-being": 7.1 },
        { day: "10:00", score: 6.6, Language: 6.5, Math: 6.8, Science: 6.0, "Emotional well-being": 7.2 },
        { day: "12:00", score: 6.8, Language: 6.9, Math: 6.7, Science: 6.3, "Emotional well-being": 7.3 },
        { day: "14:00", score: 7.2, Language: 7.2, Math: 7.3, Science: 6.8, "Emotional well-being": 7.4 },
        { day: "16:00", score: 7.5, Language: 7.6, Math: 7.9, Science: 7.2, "Emotional well-being": 7.5 }
    ],
    "Last 7 days": [
        { day: "Mon", score: 5.7, Language: 6.1, Math: 6.3, Science: 5.8, "Emotional well-being": 7.0 },
        { day: "Tue", score: 6.0, Language: 6.3, Math: 6.5, Science: 5.9, "Emotional well-being": 7.1 },
        { day: "Wed", score: 6.4, Language: 6.6, Math: 6.6, Science: 6.1, "Emotional well-being": 7.1 },
        { day: "Thu", score: 6.8, Language: 6.9, Math: 7.1, Science: 6.4, "Emotional well-being": 7.2 },
        { day: "Fri", score: 7.0, Language: 7.1, Math: 7.4, Science: 6.7, "Emotional well-being": 7.2 },
        { day: "Sat", score: 7.3, Language: 7.4, Math: 7.7, Science: 7.0, "Emotional well-being": 7.3 },
        { day: "Sun", score: 7.5, Language: 7.6, Math: 7.9, Science: 7.2, "Emotional well-being": 7.4 }
    ],
    "Last 30 days": [
        { day: "Week 1", score: 6.2, Language: 6.5, Math: 6.8, Science: 6.0, "Emotional well-being": 7.1 },
        { day: "Week 2", score: 6.5, Language: 6.8, Math: 6.6, Science: 6.2, "Emotional well-being": 7.2 },
        { day: "Week 3", score: 6.9, Language: 7.1, Math: 7.2, Science: 6.6, "Emotional well-being": 7.4 },
        { day: "Week 4", score: 7.4, Language: 7.5, Math: 7.8, Science: 7.1, "Emotional well-being": 7.5 }
    ],
    "Last 3 months": [
        { day: "Oct", score: 6.1, Language: 6.3, Math: 6.5, Science: 5.9, "Emotional well-being": 7.1 },
        { day: "Nov", score: 6.7, Language: 6.8, Math: 7.1, Science: 6.4, "Emotional well-being": 7.3 },
        { day: "Dec", score: 7.3, Language: 7.4, Math: 7.8, Science: 7.0, "Emotional well-being": 7.5 }
    ],
    "This school year": [
        { day: "Aug", score: 5.8, Language: 6.0, Math: 6.2, Science: 5.8, "Emotional well-being": 7.0 },
        { day: "Sep", score: 6.1, Language: 6.3, Math: 6.6, Science: 5.9, "Emotional well-being": 7.1 },
        { day: "Oct", score: 6.4, Language: 6.6, Math: 6.5, Science: 6.1, "Emotional well-being": 7.2 },
        { day: "Nov", score: 6.8, Language: 6.9, Math: 7.1, Science: 6.4, "Emotional well-being": 7.2 },
        { day: "Dec", score: 7.1, Language: 7.3, Math: 7.5, Science: 6.8, "Emotional well-being": 7.4 },
        { day: "Jan", score: 7.5, Language: 7.6, Math: 7.9, Science: 7.2, "Emotional well-being": 7.5 }
    ]
}

const MOCK_CATEGORY_DATA: Record<string, any[]> = {
    "Today": [
        { category: "Language", value: 9.2 }, { category: "Math", value: 8.1 },
        { category: "Science", value: 7.5 }, { category: "Emotional well-being", value: 8.8 }
    ],
    "Last 7 days": [
        { category: "Language", value: 8.4 }, { category: "Math", value: 7.2 },
        { category: "Science", value: 6.8 }, { category: "Emotional well-being", value: 9.1 }
    ],
    "Last 30 days": [
        { category: "Language", value: 7.9 }, { category: "Math", value: 6.5 },
        { category: "Science", value: 7.4 }, { category: "Emotional well-being", value: 8.2 }
    ],
    "Last 3 months": [
        { category: "Language", value: 7.2 }, { category: "Math", value: 6.1 },
        { category: "Science", value: 6.5 }, { category: "Emotional well-being", value: 7.8 }
    ],
    "This school year": [
        { category: "Language", value: 7.5 }, { category: "Math", value: 6.8 },
        { category: "Science", value: 6.2 }, { category: "Emotional well-being", value: 7.1 }
    ]
}

const MOCK_DIFFICULTY_DATA: Record<string, any[]> = {
    "Today": [{ level: "Easy", value: 9.4, color: "#10B981" }, { level: "Medium", value: 8.2, color: "#F59E0B" }, { level: "Hard", value: 7.1, color: "#EF4444" }],
    "Last 7 days": [{ level: "Easy", value: 8.8, color: "#10B981" }, { level: "Medium", value: 7.5, color: "#F59E0B" }, { level: "Hard", value: 6.4, color: "#EF4444" }],
    "Last 30 days": [{ level: "Easy", value: 8.5, color: "#10B981" }, { level: "Medium", value: 7.1, color: "#F59E0B" }, { level: "Hard", value: 6.2, color: "#EF4444" }],
    "Last 3 months": [{ level: "Easy", value: 8.2, color: "#10B981" }, { level: "Medium", value: 6.8, color: "#F59E0B" }, { level: "Hard", value: 5.9, color: "#EF4444" }],
    "This school year": [{ level: "Easy", value: 7.9, color: "#10B981" }, { level: "Medium", value: 6.5, color: "#F59E0B" }, { level: "Hard", value: 5.4, color: "#EF4444" }]
}

const MOCK_DEMOGRAPHIC_DATA: Record<string, any> = {
    "gender": [
        { name: "Girls", value: 8.4, color: "#EC4899" },
        { name: "Boys", value: 7.8, color: "#4F46E5" }
    ],
    "age": [
        { name: "3-4", value: 7.2, color: "#10B981" },
        { name: "4-5", value: 8.5, color: "#F59E0B" },
        { name: "5-6", value: 7.8, color: "#6366F1" }
    ]
}

export const AVATAR_MAP: Record<string, string> = {
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

const MOCK_CATEGORY_DETAILS: Record<string, any> = {
    "Language": {
        color: "#4F46E5",
        icon: BookOpen,
        activitiesCount: 24,
        kpis: { participation: "82%", performance: "7.9", trend: "+3.1" },
        difficulty: [{ level: "Easy", value: 8.6, color: "#10B981" }, { level: "Medium", value: 7.8, color: "#F59E0B" }, { level: "Hard", value: 6.9, color: "#EF4444" }],
        breakdown: {
            age: [{ name: "3-4", value: 7.2, color: "#10B981" }, { name: "4-5", value: 8.5, color: "#F59E0B" }, { name: "5-6", value: 7.8, color: "#6366F1" }],
            gender: [{ name: "Girls", value: 8.1, color: "#EC4899" }, { name: "Boys", value: 7.6, color: "#4F46E5" }]
        },
        teacher: { name: "Maja", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" }
    },
    "Math": {
        color: "#10B981",
        icon: Calculator,
        activitiesCount: 18,
        kpis: { participation: "78%", performance: "7.2", trend: "+1.4" },
        difficulty: [{ level: "Easy", value: 8.2, color: "#10B981" }, { level: "Medium", value: 7.1, color: "#F59E0B" }, { level: "Hard", value: 6.2, color: "#EF4444" }],
        breakdown: {
            age: [{ name: "3-4", value: 6.8, color: "#10B981" }, { name: "4-5", value: 7.9, color: "#F59E0B" }, { name: "5-6", value: 7.1, color: "#6366F1" }],
            gender: [{ name: "Girls", value: 7.4, color: "#EC4899" }, { name: "Boys", value: 7.1, color: "#4F46E5" }]
        },
        teacher: { name: "Elin", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" }
    },
    "Science": {
        color: "#F59E0B",
        icon: FlaskConical,
        activitiesCount: 12,
        kpis: { participation: "90%", performance: "8.5", trend: "+4.2" },
        difficulty: [{ level: "Easy", value: 8.9, color: "#10B981" }, { level: "Medium", value: 8.1, color: "#F59E0B" }, { level: "Hard", value: 7.5, color: "#EF4444" }],
        breakdown: {
            age: [{ name: "3-4", value: 7.5, color: "#10B981" }, { name: "4-5", value: 8.8, color: "#F59E0B" }, { name: "5-6", value: 8.2, color: "#6366F1" }],
            gender: [{ name: "Girls", value: 8.5, color: "#EC4899" }, { name: "Boys", value: 8.3, color: "#4F46E5" }]
        },
        teacher: { name: "Maja", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" }
    },
    "Emotional well-being": {
        color: "#EC4899",
        icon: Heart,
        activitiesCount: 30,
        kpis: { participation: "95%", performance: "9.2", trend: "+5.0" },
        difficulty: [{ level: "Easy", value: 9.5, color: "#10B981" }, { level: "Medium", value: 8.9, color: "#F59E0B" }, { level: "Hard", value: 8.4, color: "#EF4444" }],
        breakdown: {
            age: [{ name: "3-4", value: 8.8, color: "#10B981" }, { name: "4-5", value: 9.2, color: "#F59E0B" }, { name: "5-6", value: 9.0, color: "#6366F1" }],
            gender: [{ name: "Girls", value: 9.2, color: "#EC4899" }, { name: "Boys", value: 9.0, color: "#4F46E5" }]
        },
        teacher: { name: "Elin", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" }
    }
}


export const MOCK_STUDENT_DATA = [
    { id: "S-01", score: 9.1, avatar: "apple", hint: "Creative and focused", attempted: 12 },
    { id: "S-02", score: 8.9, avatar: "star", hint: "Curious and inquisitive", attempted: 11 },
    { id: "S-03", score: 8.8, avatar: "melon", hint: "Helpful and cooperative", attempted: 10 },
    { id: "S-04", score: 9.3, avatar: "balloon", hint: "Energetic and active", attempted: 13 },
    { id: "S-05", score: 9.0, avatar: "umbrella", hint: "Patient and methodical", attempted: 14 },
    { id: "S-06", score: 8.7, avatar: "flower1", hint: "Social and generous", attempted: 10 },
    { id: "S-07", score: 6.6, avatar: "sun", hint: "Persistent and determined", attempted: 8 },
    { id: "S-08", score: 6.2, avatar: "strawberry", hint: "Musical and expressive", attempted: 7 },
    { id: "S-09", score: 6.0, avatar: "butterfly", hint: "Quiet and observant", attempted: 6 },
    { id: "S-10", score: 6.8, avatar: "snail", hint: "Nature-loving and calm", attempted: 9 },
    { id: "S-11", score: 5.9, avatar: "car", hint: "Thoughtful and kind", attempted: 7 },
    { id: "S-12", score: 6.4, avatar: "tree", hint: "Imaginative and verbal", attempted: 8 },
    { id: "S-13", score: 5.8, avatar: "puppy", hint: "Enthusiastic and bold", attempted: 6 },
    { id: "S-14", score: 3.4, avatar: "flight", hint: "Empathetic and artistic", attempted: 5 },
    { id: "S-15", score: 2.9, avatar: "sparrow", hint: "Concentrated and steady", attempted: 4 },
    { id: "S-16", score: 3.1, avatar: "ice", hint: "Bubbly and spirited", attempted: 6 },
    { id: "S-17", score: 2.7, avatar: "ferry", hint: "Gentle and soft", attempted: 5 },
    { id: "S-18", score: null, avatar: "cat", hint: "Inquisitive and playful", attempted: 0 }
]

const MOCK_STUDENT_DETAILS: Record<string, any> = {
    "S-01": {
        participation: "92%",
        performance: "9.1",
        trend: "+0.4%",
        difficultyExposure: "hard",
        categories: [
            { category: "Language", value: 8.8, participation: 90 },
            { category: "Math", value: 9.4, participation: 95 },
            { category: "Science", value: 9.0, participation: 85 },
            { category: "Emotional well-being", value: 9.3, participation: 100 }
        ],
        difficulty: [
            { level: "Easy", value: 9.8, color: "#10B981" },
            { level: "Medium", value: 9.1, color: "#F59E0B" },
            { level: "Hard", value: 8.4, color: "#EF4444" }
        ],
        categoryMix: [
            { name: "Language", Easy: 9.5, Medium: 8.8, Hard: 8.1 },
            { name: "Math", Easy: 9.8, Medium: 9.4, Hard: 9.0 },
            { name: "Science", Easy: 9.2, Medium: 8.9, Hard: 8.5 },
            { name: "Emotional well-being", Easy: 9.6, Medium: 9.3, Hard: 9.0 }
        ]
    },
    "S-02": {
        participation: "65%",
        performance: "8.2",
        trend: "+1.2%",
        difficultyExposure: "mixed",
        categories: [
            { category: "Language", value: 8.0, participation: 60 },
            { category: "Math", value: 8.5, participation: 70 },
            { category: "Science", value: 8.2, participation: 65 },
            { category: "Emotional well-being", value: 8.1, participation: 65 }
        ],
        difficulty: [
            { level: "Easy", value: 9.0, color: "#10B981" },
            { level: "Medium", value: 8.2, color: "#F59E0B" },
            { level: "Hard", value: 7.4, color: "#EF4444" }
        ],
        categoryMix: [
            { name: "Language", Easy: 8.8, Medium: 8.0, Hard: 7.2 },
            { name: "Math", Easy: 9.2, Medium: 8.5, Hard: 7.8 },
            { name: "Science", Easy: 8.9, Medium: 8.2, Hard: 7.5 },
            { name: "Emotional well-being", Easy: 8.8, Medium: 8.1, Hard: 7.4 }
        ]
    },
    "S-07": {
        participation: "50%",
        performance: "7.8",
        trend: "-0.5%",
        difficultyExposure: "balanced",
        categories: [
            { category: "Language", value: 7.5, participation: 50 },
            { category: "Math", value: 8.0, participation: 55 },
            { category: "Science", value: 7.8, participation: 45 },
            { category: "Emotional well-being", value: 7.9, participation: 50 }
        ],
        difficulty: [
            { level: "Easy", value: 8.5, color: "#10B981" },
            { level: "Medium", value: 7.8, color: "#F59E0B" },
            { level: "Hard", value: 7.1, color: "#EF4444" }
        ],
        categoryMix: [
            { name: "Language", Easy: 8.2, Medium: 7.5, Hard: 6.8 },
            { name: "Math", Easy: 8.6, Medium: 8.0, Hard: 7.4 },
            { name: "Science", Easy: 8.5, Medium: 7.8, Hard: 7.1 },
            { name: "Emotional well-being", Easy: 8.6, Medium: 7.9, Hard: 7.2 }
        ]
    },
    "S-14": {
        participation: "75%",
        performance: "3.4",
        trend: "-1.2%",
        difficultyExposure: "easy",
        categories: [
            { category: "Language", value: 3.1, participation: 70 },
            { category: "Math", value: 3.8, participation: 80 },
            { category: "Science", value: 3.2, participation: 65 },
            { category: "Emotional well-being", value: 3.5, participation: 85 }
        ],
        difficulty: [
            { level: "Easy", value: 4.2, color: "#10B981" },
            { level: "Medium", value: 2.8, color: "#F59E0B" },
            { level: "Hard", value: 1.5, color: "#EF4444" }
        ],
        categoryMix: [
            { name: "Language", Easy: 3.8, Medium: 2.5, Hard: null },
            { name: "Math", Easy: 4.5, Medium: 3.2, Hard: 1.8 },
            { name: "Science", Easy: 3.5, Medium: null, Hard: 1.2 },
            { name: "Emotional well-being", Easy: 4.0, Medium: 3.0, Hard: 2.2 }
        ]
    },
    "S-15": {
        participation: "30%",
        performance: "2.9",
        trend: "-2.4%",
        difficultyExposure: "easy",
        categories: [
            { category: "Language", value: 2.5, participation: 25 },
            { category: "Math", value: 3.2, participation: 35 },
            { category: "Science", value: 2.8, participation: 30 },
            { category: "Emotional well-being", value: 3.1, participation: 30 }
        ],
        difficulty: [
            { level: "Easy", value: 3.5, color: "#10B981" },
            { level: "Medium", value: 2.3, color: "#F59E0B" },
            { level: "Hard", value: null, color: "#EF4444" }
        ],
        categoryMix: [
            { name: "Language", Easy: 3.0, Medium: 2.0, Hard: null },
            { name: "Math", Easy: 3.8, Medium: 2.6, Hard: null },
            { name: "Science", Easy: 3.2, Medium: 2.4, Hard: null },
            { name: "Emotional well-being", Easy: 3.6, Medium: 2.6, Hard: null }
        ]
    }
}


const BRAND_YELLOW = "#FCD34D";

const MOCK_KPIS: Record<string, any> = {
    "Today": { participation: "89.5%", performance: "6.8", balance: "0.82", trend: "+5.2%" },
    "Last 7 days": { participation: "89.5%", performance: "6.4", balance: "0.94", trend: "+4.2%" },
    "Last 30 days": { participation: "84.2%", performance: "6.1", balance: "0.89", trend: "-5.3%" },
    "Last 3 months": { participation: "78.9%", performance: "5.8", balance: "0.86", trend: "+5.2%" },
    "This school year": { participation: "73.7%", performance: "5.5", balance: "0.82", trend: "" }
}

const AVATARS = [
    "/kidsavatars/apple.png", "/kidsavatars/balloon.png", "/kidsavatars/bundle.png", "/kidsavatars/butterfly.png",
    "/kidsavatars/cat.png", "/kidsavatars/dun.png", "/kidsavatars/flight.png", "/kidsavatars/flower1.png",
    "/kidsavatars/flower2.png", "/kidsavatars/heart.png", "/kidsavatars/ice creame.png", "/kidsavatars/melon.png",
    "/kidsavatars/snail.png", "/kidsavatars/sparrow.png", "/kidsavatars/star.png", "/kidsavatars/strawberry.png",
    "/kidsavatars/tree.png", "/kidsavatars/umbrella.png"
]



function GroupInfoCard() {
    return (
        <div
            className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center"
            style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
        >
            <div className="flex items-start" style={{ gap: 'var(--kpicard-gap)' }}>
                <div
                    className="rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm flex-shrink-0 bg-white p-1 ml-0.5 mt-0.5"
                    style={{ width: 'var(--kpicard-avatar-size)', height: 'var(--kpicard-avatar-size)' }}
                >
                    <img src="/Fjärilarna.jpg" alt="Butterflies" className="w-full h-full object-contain" />
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
    )
}



function LearningAreaInfoCard({ category }: { category: { name: string, color: string } }) {
    const details = MOCK_CATEGORY_DETAILS[category.name] || MOCK_CATEGORY_DETAILS["Language"];
    const Icon = details.icon;

    return (
        <div
            className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center"
            style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
        >
            <div className="flex items-start" style={{ gap: 'var(--kpicard-gap)' }}>
                <div
                    className="rounded-full overflow-hidden border border-black/5 flex-shrink-0 bg-gray-50 flex items-center justify-center mt-1"
                    style={{ width: 'var(--kpicard-avatar-size)', height: 'var(--kpicard-avatar-size)', color: category.color }}
                >
                    <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex flex-col">
                    <div
                        className="uppercase leading-none mb-1"
                        style={{ fontSize: 'var(--kpicard-label-size)', fontWeight: 'var(--kpicard-label-weight)', letterSpacing: 'var(--kpicard-label-tracking)', color: 'var(--kpicard-label-color)' }}
                    >Learning Area</div>
                    <div className="truncate leading-tight mb-0.5" style={{ fontSize: 'var(--kpicard-title-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>{category.name}</div>
                    <div className="truncate" style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-secondary-weight)', color: 'var(--kpicard-secondary-color)' }}>{details.activitiesCount} activities</div>
                </div>
            </div>
        </div>
    )
}

function StudentIdentityCard({ student, onEdit }: { student: any, onEdit?: () => void }) {
    const avatarUrl = AVATAR_MAP[student.avatar];
    return (
        <div
            className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center relative"
            style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
        >
            <button
                onClick={onEdit}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.03] hover:bg-black/[0.06] text-black/40 hover:text-black/60 transition-all"
            >
                <Pencil className="w-4 h-4" />
            </button>
            <div className="flex items-center" style={{ gap: 'var(--kpicard-gap)' }}>
                <div
                    className="rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm flex-shrink-0 bg-white p-1.5"
                    style={{ width: 'var(--kpicard-avatar-size-lg)', height: 'var(--kpicard-avatar-size-lg)' }}
                >
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col min-w-0 pr-10">
                    <div className="uppercase leading-none mb-1" style={{ fontSize: 'var(--kpicard-label-size)', fontWeight: 'var(--kpicard-label-weight)', letterSpacing: 'var(--kpicard-label-tracking)', color: 'var(--kpicard-label-color)' }}>{student.id}</div>
                    <div className="leading-tight mb-1" style={{ fontSize: 'var(--kpicard-insight-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>{student.hint}</div>
                    <div className="leading-none" style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-secondary-weight)', color: 'var(--kpicard-secondary-color)' }}>Butterflies</div>
                </div>
            </div>
        </div>
    )
}

function LearningAreaTeacherCard({ category }: { category: { name: string } }) {
    const details = MOCK_CATEGORY_DETAILS[category.name] || MOCK_CATEGORY_DETAILS["Language"];
    const { teacher } = details;

    return (
        <div
            className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center items-center"
            style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
        >
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm">
                    <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
                <span style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>{teacher.name}</span>
            </div>
        </div>
    )
}

function TeachersCard() {
    return (
        <div
            className="bg-white rounded-card border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center"
            style={{ height: 'var(--kpicard-h)', padding: 'var(--kpicard-p)' }}
        >
            <div className="flex items-center gap-5 justify-center">
                <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" alt="Maja" className="w-full h-full object-cover" />
                    </div>
                    <span style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>Maja</span>
                </div>
                <div className="w-px h-8 bg-black/[0.06]" />
                <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" alt="Elin" className="w-full h-full object-cover" />
                    </div>
                    <span style={{ fontSize: 'var(--kpicard-secondary-size)', fontWeight: 'var(--kpicard-title-weight)', color: 'var(--kpicard-title-color)' }}>Elin</span>
                </div>
            </div>
        </div>
    )
}



function ProfileInfoItem({ label, value, prominent }: { label: string, value: string, prominent?: boolean }) {
    return (
        <div className="flex justify-between items-center py-0.5">
            <span style={{
                fontSize: 'var(--sidepanel-info-label-size)',
                fontWeight: 'var(--sidepanel-info-label-weight)',
                color: 'var(--sidepanel-info-label-color)',
            }}>{label}</span>
            <span style={{
                fontSize: prominent ? 'var(--sidepanel-info-value-prominent-size)' : 'var(--sidepanel-info-value-size)',
                fontWeight: prominent ? 'var(--sidepanel-info-value-prominent-weight)' : 'var(--sidepanel-info-value-weight)',
                color: prominent ? 'var(--sidepanel-info-value-prominent-color)' : 'var(--sidepanel-info-value-color)',
            }}>{value}</span>
        </div>
    )
}



function AvatarTick({ x, y, payload, sortedData, onSelect }: any) {
    const student = sortedData.find((s: any) => s.hint === payload.value)
    if (!student) return null

    const avatarUrl = AVATAR_MAP[student.avatar];

    return (
        <g transform={`translate(${x},${y})`} onClick={() => onSelect?.(student)} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
            <foreignObject x={-12} y={10} width={24} height={24}>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm bg-white p-0.5">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={payload.value} className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full bg-black/5 rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold text-gray-400">?</span>
                        </div>
                    )}
                </div>
            </foreignObject>
        </g>
    )
}

interface DashboardScreenProps {
    onLogout: () => void
}

export function DashboardScreen({ onLogout }: DashboardScreenProps) {
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState<"main" | "kids" | "activities" | "design-system">("main")
    const [handOverMode, setHandOverMode] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [direction, setDirection] = useState(0)
    const [swipeAxis, setSwipeAxis] = useState<'x' | 'y'>('x')
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
    const [selectedActivity, setSelectedActivity] = useState<any | null>(null)
    const [showInsights, setShowInsights] = useState(false)

    const [isKidGridModalOpen, setIsKidGridModalOpen] = useState(false)
    const [activeKidMode2, setActiveKidMode2] = useState(false)
    const [activeKidMode2View, setActiveKidMode2View] = useState<'intro' | 'gameplay'>('intro')
    const [selectedKidMode2, setSelectedKidMode2] = useState<any>(null)
    const [isMathGateModalOpen, setIsMathGateModalOpen] = useState(false)

    // Helper for consistent observations
    const getStudentInsight = (student: any) => {
        if (!student) return "";
        const seed = student.id.charCodeAt(0) + (student.id.charCodeAt(student.id.length - 1) || 0);
        const participationPercent = (seed * 11) % 100;
        const avgScore = student.score || 6.0;
        const difficultyExposure = (seed % 2 === 0) ? "mixed" : "low";

        if (participationPercent < 30) return "Low engagement detected. Recommend initiating a simple, high-interest activity.";
        if (participationPercent >= 60 && avgScore < 5) return "Highly engaged, but struggling. Focus on foundational activities with guidance.";
        if (participationPercent >= 40 && participationPercent <= 60 && avgScore >= 7) return "Strong understanding with limited activity attempts. Encourage more frequent practice.";
        if (participationPercent >= 70 && avgScore >= 7) return "Consistent engagement and strong performance. Continue with varied and challenging activities.";
        if (difficultyExposure === "mixed") return "Healthy adaptive learning. Activity difficulty is adjusting as intended.";
        return "Positive learning momentum. The current balance of activities supports steady growth.";
    };

    const handleHandOverAction = (active: boolean) => {
        if (active) {
            if (selectedStudent) {
                // If on a profile page, skip selection and go directly to game page
                setSelectedKidMode2(selectedStudent)
                setActiveKidMode2(true)
                setActiveKidMode2View('intro')
            } else {
                // Default behavior: show grid to select a kid
                setIsKidGridModalOpen(true)
            }
        } else {
            setHandOverMode(false)
        }
    }
    const touchStart = useRef<{ x: number, y: number } | null>(null);

    // Swipe Navigation Logic (Pointer Events for Mouse + Touch)
    const handlePointerDown = (e: React.PointerEvent) => {
        touchStart.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!touchStart.current) return;
        const deltaX = e.clientX - touchStart.current.x;
        const deltaY = e.clientY - touchStart.current.y;

        if (selectedStudent) {
            // Horizontal swipe: next/prev kid
            if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
                const kids = sortedStudentData;
                const currentIndex = kids.findIndex(k => k.id === selectedStudent.id);
                if (currentIndex !== -1) {
                    setSwipeAxis('x');
                    if (deltaX < 0) {
                        // Swipe Left -> Next kid
                        setDirection(1);
                        const nextIndex = (currentIndex + 1) % kids.length;
                        setSelectedStudent(kids[nextIndex]);
                    } else {
                        // Swipe Right -> Prev kid
                        setDirection(-1);
                        const prevIndex = (currentIndex - 1 + kids.length) % kids.length;
                        setSelectedStudent(kids[prevIndex]);
                    }
                }
            }
            // Vertical swipe: cycle periods (Unified with main dash behavior)
            else if (Math.abs(deltaY) > 60 && Math.abs(deltaY) > Math.abs(deltaX) * 2) {
                const periods = ["Today", "Last 7 days", "Last 30 days", "Last 3 months", "This school year"];
                const currentIndex = periods.indexOf(dateFilter);
                if (currentIndex !== -1) {
                    setSwipeAxis('y');
                    if (deltaY < 0) {
                        // Swipe Up -> Next period
                        setDirection(1);
                        const nextIndex = (currentIndex + 1) % periods.length;
                        setDateFilter(periods[nextIndex]);
                    } else {
                        // Swipe Down -> Prev period
                        setDirection(-1);
                        const prevIndex = (currentIndex - 1 + periods.length) % periods.length;
                        setDateFilter(periods[prevIndex]);
                    }
                }
            }
            touchStart.current = null;
            return;
        }

        if (activeTab === 'kids') {
            touchStart.current = null;
            return;
        }

        // Threshold 60px, Horizontal dominant (Navigate Categories/Group)
        if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
            const navItems = [null, ...CATEGORIES];
            const currentName = selectedCategory ? selectedCategory.name : null;
            const currentIndex = navItems.findIndex(item => item === null ? currentName === null : item.name === currentName);

            if (currentIndex !== -1) {
                setSwipeAxis('x');
                if (deltaX < 0) {
                    setDirection(1);
                    const nextIndex = (currentIndex + 1) % navItems.length;
                    setSelectedCategory(navItems[nextIndex]);
                } else {
                    setDirection(-1);
                    const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
                    setSelectedCategory(navItems[prevIndex]);
                }
            }
        }
        // Threshold 60px, Vertical dominant (Cycle Periods)
        else if (Math.abs(deltaY) > 60 && Math.abs(deltaY) > Math.abs(deltaX) * 2) {
            const periods = ["Today", "Last 7 days", "Last 30 days", "Last 3 months", "This school year"];
            const currentIndex = periods.indexOf(dateFilter);
            if (currentIndex !== -1) {
                setSwipeAxis('y');
                if (deltaY < 0) {
                    // Swipe Up -> Next period
                    setDirection(1);
                    const nextIndex = (currentIndex + 1) % periods.length;
                    setDateFilter(periods[nextIndex]);
                } else {
                    // Swipe Down -> Prev period
                    setDirection(-1);
                    const prevIndex = (currentIndex - 1 + periods.length) % periods.length;
                    setDateFilter(periods[prevIndex]);
                }
            }
        }
        touchStart.current = null;
    };
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
    const [isEditKidModalOpen, setIsEditKidModalOpen] = useState(false)
    const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false)
    const [editKidForm, setEditKidForm] = useState({
        id: '',
        hint: '',
        ageGroup: '3-4',
        avatar: ''
    })

    const handleEditKid = () => {
        if (!selectedStudent) return
        setEditKidForm({
            id: selectedStudent.id,
            hint: selectedStudent.hint,
            ageGroup: '4-5', // Default since it's not in mock data
            avatar: selectedStudent.avatar
        })
        setIsEditKidModalOpen(true)
    }
    const [dateFilter, setDateFilter] = useState("This school year")
    const [selectedCategory, setSelectedCategory] = useState<{ name: string, id: string, color: string } | null>(null)
    const [comparisonTab, setComparisonTab] = useState<'age' | 'gender' | 'difficulty'>('age')
    const [categoryView, setCategoryView] = useState<'category' | 'difficulty'>('category')
    const [trendView, setTrendView] = useState<'trend' | 'overview'>('overview')
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null)
    const [activeBreakdownIndex, setActiveBreakdownIndex] = useState<number | null>(null)
    const [navigatingCategoryIndex, setNavigatingCategoryIndex] = useState<number | null>(null)
    const [activeStudentIndex, setActiveStudentIndex] = useState<number | null>(null)
    const [userAvatar, setUserAvatar] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop")
    const [isFullView, setIsFullView] = useState(false)

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullView(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const trendData = useMemo(() => MOCK_TREND_DATA[dateFilter] || MOCK_TREND_DATA["This school year"], [dateFilter])
    const categoryData = useMemo(() => MOCK_CATEGORY_DATA[dateFilter] || MOCK_CATEGORY_DATA["This school year"], [dateFilter])
    const globalDifficultyData = useMemo(() => {
        if (selectedCategory) {
            return MOCK_CATEGORY_DETAILS[selectedCategory.name]?.difficulty || MOCK_CATEGORY_DETAILS["Language"].difficulty;
        }
        return MOCK_DIFFICULTY_DATA[dateFilter] || MOCK_DIFFICULTY_DATA["This school year"];
    }, [selectedCategory, dateFilter])

    const studentDetails = useMemo(() => {
        if (!selectedStudent) return null;
        return MOCK_STUDENT_DETAILS[selectedStudent.id] || MOCK_STUDENT_DETAILS["S-01"];
    }, [selectedStudent]);

    const kpis = useMemo(() => {
        if (selectedCategory) {
            return MOCK_CATEGORY_DETAILS[selectedCategory.name]?.kpis || MOCK_CATEGORY_DETAILS["Language"].kpis;
        }
        return MOCK_KPIS[dateFilter] || MOCK_KPIS["This school year"];
    }, [dateFilter, selectedCategory])

    const sortedStudentData = useMemo(() => {
        let data = [...MOCK_STUDENT_DATA];
        if (selectedCategory) {
            const shift = selectedCategory.name.length % 3;
            data = data.map(s => {
                if (s.score === null) return s;
                const rawScore = s.score + (s.id.charCodeAt(s.id.length - 1) % 2 === 0 ? shift * 0.5 : -shift * 0.3);
                return {
                    ...s,
                    score: Number(Math.min(10, Math.max(0, rawScore)).toFixed(1))
                }
            });
        }
        return data.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
    }, [selectedCategory]);

    const activeComparisonData = useMemo(() => {
        if (comparisonTab === 'difficulty') {
            const data = selectedCategory
                ? (MOCK_CATEGORY_DETAILS[selectedCategory.name]?.difficulty || MOCK_CATEGORY_DETAILS["Language"].difficulty)
                : (MOCK_DIFFICULTY_DATA[dateFilter] || MOCK_DIFFICULTY_DATA["This school year"]);
            return data.map((d: any) => ({ ...d, name: d.level }));
        }
        if (selectedCategory && MOCK_CATEGORY_DETAILS[selectedCategory.name]) {
            return MOCK_CATEGORY_DETAILS[selectedCategory.name].breakdown[comparisonTab] || [];
        }
        return MOCK_DEMOGRAPHIC_DATA[comparisonTab] || [];
    }, [comparisonTab, dateFilter, selectedCategory]);

    if (activeKidMode2 && selectedKidMode2) {
        return (
            <>
                {activeKidMode2View === 'intro' ? (
                    <KidMode2Page
                        kid={selectedKidMode2}
                        onGateRequest={() => setIsMathGateModalOpen(true)}
                        onPlay={() => setActiveKidMode2View('gameplay')}
                    />
                ) : (
                    <KidMode2GamePage
                        kid={selectedKidMode2}
                        onGateRequest={() => setIsMathGateModalOpen(true)}
                        onBack={() => setActiveKidMode2View('intro')}
                    />
                )}
                {isMathGateModalOpen && (
                    <MathGateModal
                        onClose={() => setIsMathGateModalOpen(false)}
                        onSwitch={() => {
                            setIsMathGateModalOpen(false)
                            setIsKidGridModalOpen(true)
                        }}
                        onExit={() => {
                            setIsMathGateModalOpen(false)
                            setActiveKidMode2(false)
                            setSelectedKidMode2(null)
                        }}
                    />
                )}
                {isKidGridModalOpen && (
                    <KidGridModal
                        onClose={() => setIsKidGridModalOpen(false)}
                        onSelect={(kid) => {
                            setSelectedKidMode2(kid)
                            setIsKidGridModalOpen(false)
                            setActiveKidMode2(true)
                            setActiveKidMode2View('intro')
                        }}
                    />
                )}
            </>
        )
    }

    if (handOverMode) {
        return <KidsGameEntryScreen onExit={() => setHandOverMode(false)} />
    }

    return (
        <div
            className="h-screen w-full bg-canvas overflow-hidden p-canvas gap-canvas select-none font-sans flex text-[#1A1F2E]"
            onPointerDownCapture={handlePointerDown}
            onPointerUpCapture={handlePointerUp}
        >
            <Toaster />
            <Sidebar
                variant={handOverMode ? 'kids' : 'teacher'}
                activeView={activeTab}
                onNavigate={(v) => {
                    setActiveTab(v as any);
                    setSelectedStudent(null);
                    setSelectedCategory(null);
                    if (v === 'activities' || v === 'main') setSelectedActivity(null);
                }}
                userAvatar={userAvatar}
                kidAvatar={selectedStudent ? AVATAR_MAP[selectedStudent.avatar] : undefined}
                onToggleProfile={() => setIsProfileOpen(!isProfileOpen)}
                isProfileOpen={isProfileOpen}
                handOverActive={handOverMode}
                onHandOverChange={(active) => {
                    if (active) setIsKidGridModalOpen(true)
                    else setHandOverMode(false)
                }}
            />

            {/* Main Content Canvas — Defined Panel with Dual-Tone Micro Stroke */}
            <main className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[var(--panel-bg-gradient)] rounded-panel relative z-0 border border-panel-border ring-1 ring-inset ring-panel-ring">
                {/* Subtle Radial Overlay for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent)] pointer-events-none" />

                {activeTab === 'activities' ? (
                    <ActivitiesPage
                        selectedActivity={selectedActivity}
                        setSelectedActivity={setSelectedActivity}
                        onSelectStudent={(avatar) => {
                            const kid = MOCK_STUDENT_DATA.find(k => k.avatar === avatar);
                            if (kid) {
                                setSelectedStudent(kid);
                                setActiveTab('kids');
                                setDirection(1);
                            }
                        }}
                    />
                ) : activeTab === 'design-system' ? (
                    <DesignSystemScreen />
                ) : (
                    <>
                        <div className={`${activeTab === 'kids' && !selectedStudent ? 'panel-scroll' : 'panel-fixed'}`}>
                            <Header
                                left={
                                    activeTab === 'kids' ? (
                                        selectedStudent ? (
                                            <Breadcrumb
                                                items={[
                                                    { label: t('kids'), onClick: () => { setSelectedStudent(null); setActiveTab('kids'); } },
                                                    { label: selectedStudent.id, active: true }
                                                ]}
                                            />
                                        ) : (
                                            <Breadcrumb
                                                items={[
                                                    { label: t('kids'), active: true }
                                                ]}
                                            />
                                        )
                                    ) : selectedStudent ? (
                                        <Breadcrumb
                                            items={[
                                                { label: t('main'), onClick: () => setSelectedStudent(null) },
                                                { label: selectedStudent.id, active: true }
                                            ]}
                                        />
                                    ) : (
                                        selectedCategory ? (
                                            <Breadcrumb
                                                items={[
                                                    { label: t('main'), onClick: () => setSelectedCategory(null) },
                                                    { label: t(selectedCategory.id as any), active: true }
                                                ]}
                                            />
                                        ) : (
                                            <Breadcrumb
                                                items={[
                                                    { label: t('main'), active: true }
                                                ]}
                                            />
                                        )
                                    )
                                }
                                right={
                                    selectedStudent ? (
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-black/60">{t('handOver')}</span>
                                                <HandOverToggle
                                                    isActive={handOverMode}
                                                    onChange={handleHandOverAction}
                                                    variant="light"
                                                    orientation="horizontal"
                                                />
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <DropdownFilter
                                                    value={dateFilter}
                                                    options={PERIOD_OPTIONS}
                                                    onChange={(val) => setDateFilter(val)}
                                                />
                                                <div className="w-px h-6 bg-black/[0.08]" />
                                                <MoreMenu context="kids" />
                                            </div>
                                        </div>
                                    ) : (activeTab === 'kids' && !selectedStudent) ? (
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-black/60">Insights</span>
                                                <button
                                                    onClick={() => setShowInsights(!showInsights)}
                                                    className="flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none"
                                                    style={{
                                                        width: 'var(--switch-w)',
                                                        height: 'var(--switch-h)',
                                                        backgroundColor: showInsights ? 'var(--switch-bg-on)' : 'var(--switch-bg-off)'
                                                    }}
                                                >
                                                    <div
                                                        className={`bg-white rounded-full shadow-sm transform transition-transform duration-300 ${showInsights ? 'translate-x-[100%]' : 'translate-x-0'}`}
                                                        style={{
                                                            width: 'var(--switch-handle-size)',
                                                            height: 'var(--switch-handle-size)'
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                            <div className="w-px h-6 bg-black/[0.08]" />
                                            <MoreMenu context="kids" />
                                        </div>
                                    ) : (activeTab !== 'kids') ? (
                                        <div className="flex items-center gap-4">
                                            <DropdownFilter
                                                value={dateFilter}
                                                options={PERIOD_OPTIONS}
                                                onChange={(val) => setDateFilter(val)}
                                            />
                                            <div className="w-px h-6 bg-black/[0.08]" />
                                            <MoreMenu context={selectedCategory ? "learning-area" : "general"} />
                                        </div>
                                    ) : null
                                }
                            />
                            <div className={`flex-1 w-full relative ${activeTab === 'kids' && !selectedStudent ? 'p-panel-wide' : 'p-panel-tight'}`}>
                                <AnimatePresence initial={false} custom={direction} mode="wait">
                                    <motion.div
                                        key={(selectedCategory ? selectedCategory.name : 'group') + dateFilter + (selectedStudent ? selectedStudent.id : 'no-student')}
                                        custom={direction}
                                        initial={swipeAxis === 'x'
                                            ? { x: direction > 0 ? 40 : -40, opacity: 0 }
                                            : { y: direction > 0 ? 40 : -40, opacity: 0 }
                                        }
                                        animate={{ x: 0, y: 0, opacity: 1 }}
                                        exit={swipeAxis === 'x'
                                            ? { x: direction > 0 ? -40 : 40, opacity: 0 }
                                            : { y: direction > 0 ? -40 : 40, opacity: 0 }
                                        }
                                        transition={{
                                            type: "spring",
                                            stiffness: 550,
                                            damping: 45,
                                            mass: 0.8,
                                            opacity: { duration: 0.15 }
                                        }}
                                        className={`flex-1 min-h-0 grid ${activeTab === 'kids' && !selectedStudent ? 'grid-rows-[auto] content-start gap-gap-wide' : 'grid-rows-[auto_1fr_1fr] gap-gap-tight'} mx-auto w-full h-full`}
                                    >

                                        {/* KPI Summary Row - Auto Height */}
                                        {!(activeTab === 'kids' && !selectedStudent) && (
                                            <div className={`grid grid-cols-1 ${selectedStudent ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} ${activeTab === 'kids' && !selectedStudent ? 'gap-gap-wide' : 'gap-gap-tight'}`}>
                                                {selectedStudent && studentDetails ? (
                                                    <>
                                                        <StudentIdentityCard student={selectedStudent} onEdit={handleEditKid} />
                                                        <KPICard label={t('avgPerformance')} value={studentDetails.performance} trend="+0.2" icon={<TrendingUp className="w-4 h-4" />} />
                                                        <DataInsightCard
                                                            insight={getStudentInsight(selectedStudent)}
                                                        />
                                                    </>
                                                ) : activeTab === 'kids' ? null : (
                                                    <>
                                                        {selectedCategory ? <LearningAreaInfoCard category={selectedCategory} /> : <GroupInfoCard />}
                                                        <KPICard label={t('avgPerformance')} value={kpis.performance} trend={selectedCategory ? kpis.trend : "+0.4"} icon={<TrendingUp className="w-4 h-4" />} />
                                                        {selectedCategory ? <LearningAreaTeacherCard category={selectedCategory} /> : <TeachersCard />}
                                                        <DataInsightCard
                                                            insight={selectedCategory
                                                                ? "Learning area performance is stable. Most kids are engaging with Medium difficulty activities successfully."
                                                                : "Most kids are actively engaging, with varied performance levels. Consider targeted support for those struggling at foundational levels."
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {/* Graph Row 1: 1fr Height (Implicit) */}
                                        {!(activeTab === 'kids' && !selectedStudent) && (
                                            <div className={`min-h-0 w-full h-full ${selectedStudent ? 'grid grid-cols-2 gap-2' : ''}`}>
                                                <GraphCard
                                                    className="h-full min-h-0"
                                                    title={selectedStudent ? t('kidPerformance') : (selectedCategory ? `${t(selectedCategory.id as any)} ${trendView === 'overview' ? t('performanceOverview') : t('performanceTrend')}` : `${t('groupTitle')} ${trendView === 'overview' ? t('performanceOverview') : t('performanceTrend')}`)}
                                                    actions={
                                                        selectedStudent ? null : (
                                                            <div className="flex items-center gap-2">
                                                                <SegmentedToggle
                                                                    options={[
                                                                        { label: t('overview'), value: "overview" },
                                                                        { label: t('trend'), value: "trend" }
                                                                    ]}
                                                                    value={trendView}
                                                                    onChange={(val) => setTrendView(val as any)}
                                                                    className="!bg-black/[0.04]" // Ensure it keeps the dark background style if needed
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    legend={
                                                        (trendView === 'trend' || selectedStudent) ? (
                                                            <div className="flex flex-wrap items-center" style={{ gap: 'var(--legend-gap-item)' }}>
                                                                {CATEGORIES.map(cat => (
                                                                    <div key={cat.name} className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                                                        <div className="rounded-full shadow-sm" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)', backgroundColor: cat.color }} />
                                                                        <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>{cat.name}</span>
                                                                    </div>
                                                                ))}
                                                                <div className="flex items-center" style={{ gap: 'var(--legend-gap-dot)' }}>
                                                                    <div className="rounded-full bg-[#94A3B8]" style={{ width: 'var(--legend-dot-size)', height: 'var(--legend-dot-size)' }} />
                                                                    <span style={{ fontSize: 'var(--legend-font-size)', fontWeight: 'var(--legend-font-weight)', textTransform: 'var(--legend-text-transform)' as any, letterSpacing: 'var(--legend-letter-spacing)', color: 'var(--legend-text-color)' }}>Average</span>
                                                                </div>
                                                            </div>
                                                        ) : null
                                                    }
                                                >
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {selectedStudent && studentDetails ? (
                                                            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#64748B' }} />
                                                                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} />
                                                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />

                                                                {/* Learning Area Lines */}
                                                                {CATEGORIES.map((cat) => (
                                                                    <Line
                                                                        key={cat.name}
                                                                        type="monotone"
                                                                        dataKey={cat.name}
                                                                        stroke={cat.color}
                                                                        strokeWidth={1.5}
                                                                        dot={false}
                                                                        activeDot={{ r: 5, fill: cat.color, stroke: '#fff', strokeWidth: 2 }}
                                                                    />
                                                                ))}

                                                                {/* Overall Average Line */}
                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="score"
                                                                    stroke="#94A3B8"
                                                                    strokeWidth={1}
                                                                    strokeDasharray="5 5"
                                                                    dot={false}
                                                                    activeDot={{ r: 4, fill: '#94A3B8', stroke: '#fff', strokeWidth: 1.5 }}
                                                                />
                                                            </LineChart>
                                                        ) : trendView === 'trend' ? (
                                                            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#64748B' }} />
                                                                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} />
                                                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />

                                                                {/* Learning Area Lines */}
                                                                {CATEGORIES.map((cat) => (
                                                                    <Line
                                                                        key={cat.name}
                                                                        type="monotone"
                                                                        dataKey={cat.name}
                                                                        stroke={cat.color}
                                                                        strokeWidth={1.5}
                                                                        dot={false}
                                                                        activeDot={{ r: 5, fill: cat.color, stroke: '#fff', strokeWidth: 2 }}
                                                                    />
                                                                ))}

                                                                {/* Overall Average Line */}
                                                                <Line
                                                                    type="monotone"
                                                                    dataKey="score"
                                                                    stroke="#94A3B8"
                                                                    strokeWidth={1}
                                                                    strokeDasharray="5 5"
                                                                    dot={false}
                                                                    activeDot={{ r: 4, fill: '#94A3B8', stroke: '#fff', strokeWidth: 1.5 }}
                                                                />
                                                            </LineChart>
                                                        ) : (
                                                            <BarChart
                                                                data={sortedStudentData}
                                                                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                                                onMouseMove={(state) => {
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
                                                                    tick={(props) => <AvatarTick {...props} sortedData={sortedStudentData} onSelect={setSelectedStudent} />}
                                                                    interval={0}
                                                                    height={50}
                                                                />
                                                                <YAxis domain={getYAxisDomain(sortedStudentData, 'score')} hide />
                                                                {/* No tooltip on navigation-capable chart */}
                                                                <Bar
                                                                    dataKey="score"
                                                                    radius={[4, 4, 0, 0]}
                                                                    barSize={24}
                                                                    label={{ position: 'top', fill: '#0F172A', fontSize: 12, fontWeight: 700 }}
                                                                    onClick={(data) => {
                                                                        if (data && data.payload) {
                                                                            setSelectedStudent(data.payload);
                                                                        }
                                                                    }}
                                                                >
                                                                    {sortedStudentData.map((_entry: any, index: number) => {
                                                                        const color = selectedCategory ? selectedCategory.color : BRAND_YELLOW;
                                                                        const isActive = activeStudentIndex === index;
                                                                        return (
                                                                            <Cell
                                                                                key={`cell-${index}`}
                                                                                fill={color}
                                                                                fillOpacity={activeStudentIndex === null || isActive ? 1 : 0.4}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    transition: 'all 0.2s ease'
                                                                                }}
                                                                            />
                                                                        );
                                                                    })}
                                                                    <LabelList content={<ChevronLabel />} />
                                                                </Bar>
                                                            </BarChart>
                                                        )}
                                                    </ResponsiveContainer>
                                                </GraphCard>

                                                {selectedStudent && studentDetails && (
                                                    <GraphCard
                                                        className="h-full min-h-0"
                                                        title="Kid Performance Score"
                                                    >
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart
                                                                data={studentDetails.categories}
                                                                margin={{ top: 20, right: 0, left: 10, bottom: 0 }}
                                                            >
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
                                                                <YAxis domain={getYAxisDomain(studentDetails.categories, 'value')} hide />
                                                                <Tooltip
                                                                    cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                                                    content={<CustomTooltip />}
                                                                    wrapperStyle={{ pointerEvents: 'none' }}
                                                                />
                                                                <Bar
                                                                    dataKey="value"
                                                                    radius={[6, 6, 0, 0]}
                                                                    barSize={40}
                                                                    label={{ position: 'top', fill: '#0F172A', fontSize: 12, fontWeight: 900, formatter: (v: any) => v?.toFixed(1) }}
                                                                >
                                                                    {studentDetails.categories.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={CATEGORIES.find(c => c.name === entry.category)?.color || BRAND_YELLOW} />
                                                                    ))}
                                                                </Bar>
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </GraphCard>
                                                )}
                                            </div>
                                        )}

                                        {/* Kids Home — Container-Driven Natural Grid (Zero-Scroll Locked) */}
                                        {activeTab === 'kids' && !selectedStudent ? (
                                            <div className="w-full h-auto grid content-start relative bg-transparent">
                                                <div className="w-full h-auto max-w-[1400px] mx-auto grid gap-4 
                                        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr 
                                        justify-items-center items-stretch"
                                                >
                                                    {sortedStudentData.slice(0, 18).map((kid: any) => (
                                                        <KidCard
                                                            key={kid.id}
                                                            kid={kid}
                                                            onClick={() => {
                                                                setSelectedStudent(kid);
                                                                setDirection(1);
                                                            }}
                                                            insight={showInsights ? getStudentInsight(kid) : undefined}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={`min-h-0 w-full h-full grid grid-cols-2 ${activeTab === 'kids' && !selectedStudent ? 'gap-gap-wide' : 'gap-gap-tight'}`}>
                                                <div className="h-full min-h-0">
                                                    <GraphCard
                                                        className="h-full min-h-0"
                                                        title={selectedStudent ? t('difficultyBreakdown') : (selectedCategory ? t('difficultyBreakdown') : (categoryView === 'category' ? t('learningAreaBreakdown') : t('difficultyBreakdown')))}
                                                        actions={
                                                            !selectedCategory && !selectedStudent ? (
                                                                <SegmentedToggle
                                                                    options={[
                                                                        { label: t('learningArea'), value: "category" },
                                                                        { label: t('difficulty'), value: "difficulty" }
                                                                    ]}
                                                                    value={categoryView}
                                                                    onChange={(val) => setCategoryView(val as 'category' | 'difficulty')}
                                                                />
                                                            ) : null
                                                        }
                                                        legend={null}
                                                    >
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart
                                                                data={activeTab === 'kids' && !selectedStudent ? [] : (selectedStudent && studentDetails ? studentDetails.difficulty : (selectedCategory ? globalDifficultyData : (categoryView === 'category' ? categoryData : globalDifficultyData)))}
                                                                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                                                                onMouseMove={(state) => {
                                                                    if (state && typeof state.activeTooltipIndex === 'number') {
                                                                        setActiveCategoryIndex(state.activeTooltipIndex);
                                                                    }
                                                                }}
                                                                onMouseLeave={() => setActiveCategoryIndex(null)}
                                                            >
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                                <XAxis
                                                                    dataKey={selectedStudent ? "level" : (!selectedCategory && categoryView === 'category' ? "category" : "level")}
                                                                    axisLine={false}
                                                                    tickLine={false}
                                                                    height={20}
                                                                    interval={0}
                                                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }}
                                                                />
                                                                <YAxis domain={getYAxisDomain(selectedStudent && studentDetails ? studentDetails.difficulty : (selectedCategory ? globalDifficultyData : (categoryView === 'category' ? categoryData : globalDifficultyData)), 'value')} hide />
                                                                {(selectedStudent || selectedCategory || categoryView === 'difficulty') && (
                                                                    <Tooltip
                                                                        cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                                                        content={<CustomTooltip />}
                                                                        wrapperStyle={{ pointerEvents: 'none' }}
                                                                    />
                                                                )}
                                                                <Bar
                                                                    dataKey="value"
                                                                    radius={[6, 6, 0, 0]}
                                                                    barSize={40}
                                                                    className={!selectedCategory && !selectedStudent && categoryView === 'category' ? "cursor-pointer outline-none focus:outline-none" : "outline-none focus:outline-none"}
                                                                    label={{ position: 'top', fill: '#0F172A', fontSize: 12, fontWeight: 900, formatter: (v: any) => v?.toFixed(1) }}
                                                                    onClick={(data: any, index: number) => {
                                                                        if (!selectedCategory && !selectedStudent && categoryView === 'category') {
                                                                            setNavigatingCategoryIndex(index);
                                                                            setTimeout(() => {
                                                                                const categoryName = data.category || (data.payload && data.payload.category);
                                                                                const cat = CATEGORIES.find(c => c.name === categoryName);
                                                                                if (cat) {
                                                                                    setSelectedCategory(cat);
                                                                                }
                                                                                setNavigatingCategoryIndex(null);
                                                                            }, 150);
                                                                        }
                                                                    }}
                                                                >
                                                                    {(selectedStudent && studentDetails ? studentDetails.difficulty : (selectedCategory ? globalDifficultyData : (categoryView === 'category' ? categoryData : globalDifficultyData))).map((entry: any, index: number) => {
                                                                        const color = selectedStudent
                                                                            ? (entry.color || BRAND_YELLOW)
                                                                            : (!selectedCategory && !selectedStudent && categoryView === 'category'
                                                                                ? CATEGORIES[index % CATEGORIES.length].color
                                                                                : (entry.color || 'var(--primary)'));
                                                                        const isActive = activeCategoryIndex === index;
                                                                        return (
                                                                            <Cell
                                                                                key={`cell-${index}`}
                                                                                fill={color}
                                                                                fillOpacity={navigatingCategoryIndex !== null ? (navigatingCategoryIndex === index ? 1 : 0.3) : (activeCategoryIndex === null || isActive ? 1 : 0.3)}
                                                                                style={{
                                                                                    transition: 'all 0.3s ease',
                                                                                    filter: isActive ? `drop-shadow(0 0 8px ${color}40)` : 'none'
                                                                                }}
                                                                            />
                                                                        );
                                                                    })}
                                                                    {!selectedCategory && !selectedStudent && categoryView === 'category' && (
                                                                        <LabelList content={<ChevronLabel />} />
                                                                    )}
                                                                </Bar>
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    </GraphCard>
                                                </div>

                                                <div className="h-full min-h-0">
                                                    <GraphCard
                                                        className="h-full min-h-0"
                                                        title={selectedStudent ? t('difficultyPerArea') : t('demographics')}
                                                        actions={
                                                            !selectedStudent ? (
                                                                <SegmentedToggle
                                                                    options={[
                                                                        { label: t('age'), value: "age" },
                                                                        { label: t('gender'), value: "gender" }
                                                                    ]}
                                                                    value={comparisonTab as any}
                                                                    onChange={(val) => setComparisonTab(val as any)}
                                                                />
                                                            ) : null
                                                        }
                                                    >
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            {selectedStudent && studentDetails ? (
                                                                <BarChart data={studentDetails.categoryMix} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barGap={2}>
                                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: '#64748B' }} />
                                                                    <YAxis domain={getYAxisDomain(studentDetails.categoryMix, ['Easy', 'Medium', 'Hard'])} hide />
                                                                    <Tooltip
                                                                        cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                                                        content={<CustomTooltip />}
                                                                        wrapperStyle={{ pointerEvents: 'none' }}
                                                                    />
                                                                    <Bar dataKey="Easy" fill="#10B981" radius={[2, 2, 0, 0]} label={{ position: 'top', fill: '#10B981', fontSize: 9, fontWeight: 700, formatter: (v: any) => v?.toFixed(1) }} />
                                                                    <Bar dataKey="Medium" fill="#F59E0B" radius={[2, 2, 0, 0]} label={{ position: 'top', fill: '#F59E0B', fontSize: 9, fontWeight: 700, formatter: (v: any) => v?.toFixed(1) }} />
                                                                    <Bar dataKey="Hard" fill="#EF4444" radius={[2, 2, 0, 0]} label={{ position: 'top', fill: '#EF4444', fontSize: 9, fontWeight: 700, formatter: (v: any) => v?.toFixed(1) }} />
                                                                </BarChart>
                                                            ) : (
                                                                <BarChart
                                                                    data={selectedCategory ? MOCK_CATEGORY_DETAILS[selectedCategory.name].breakdown[comparisonTab] : MOCK_DEMOGRAPHIC_DATA[comparisonTab]}
                                                                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                                                    onMouseMove={(state) => {
                                                                        if (state && typeof state.activeTooltipIndex === 'number') {
                                                                            setActiveBreakdownIndex(state.activeTooltipIndex);
                                                                        }
                                                                    }}
                                                                    onMouseLeave={() => setActiveBreakdownIndex(null)}
                                                                >
                                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                                    <XAxis
                                                                        dataKey="name"
                                                                        axisLine={false}
                                                                        tickLine={false}
                                                                        height={20}
                                                                        interval={0}
                                                                        tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }}
                                                                    />
                                                                    <YAxis domain={getYAxisDomain(selectedCategory ? MOCK_CATEGORY_DETAILS[selectedCategory.name].breakdown[comparisonTab] : MOCK_DEMOGRAPHIC_DATA[comparisonTab], 'value')} hide />
                                                                    <Tooltip
                                                                        cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 8 }}
                                                                        content={<CustomTooltip />}
                                                                    />
                                                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40} label={{ position: 'top', fill: '#0F172A', fontSize: 12, fontWeight: 700 }}>
                                                                        {activeComparisonData.map((entry: any, index: number) => {
                                                                            const color = entry.color || 'var(--primary)';
                                                                            const isActive = activeBreakdownIndex === index;
                                                                            return (
                                                                                <Cell
                                                                                    key={`cell-${index}`}
                                                                                    fill={color}
                                                                                    fillOpacity={activeBreakdownIndex === null || isActive ? 1 : 0.3}
                                                                                    style={{
                                                                                        filter: isActive ? `drop-shadow(0 0 8px ${color}40)` : 'none',
                                                                                        transition: 'all 0.3s ease'
                                                                                    }}
                                                                                />
                                                                            );
                                                                        })}
                                                                    </Bar>
                                                                </BarChart>
                                                            )}
                                                        </ResponsiveContainer>
                                                    </GraphCard>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Fixed Bottom Pagination Dots Container (Translucent Pill) */}
                        {
                            (activeTab !== 'kids' || selectedStudent) && (
                                <div
                                    className="absolute left-1/2 -translate-x-1/2 z-[20]"
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
                                        {selectedStudent ? (
                                            sortedStudentData.map((kid: any) => {
                                                const isActive = kid.id === selectedStudent.id;
                                                return (
                                                    <button
                                                        key={kid.id}
                                                        onClick={() => {
                                                            const currentIndex = sortedStudentData.findIndex(k => k.id === selectedStudent.id);
                                                            const targetIndex = sortedStudentData.findIndex(k => k.id === kid.id);
                                                            setSwipeAxis('x');
                                                            setDirection(targetIndex > currentIndex ? 1 : -1);
                                                            setSelectedStudent(kid);
                                                        }}
                                                        className="transition-all duration-300 rounded-full"
                                                        style={{
                                                            width: isActive ? 'var(--pagination-active-w)' : 'var(--pagination-dot-size)',
                                                            height: 'var(--pagination-dot-size)',
                                                            backgroundColor: isActive ? 'var(--pagination-active-color)' : 'var(--pagination-inactive-color)'
                                                        }}
                                                    />
                                                );
                                            })
                                        ) : (
                                            (selectedCategory ? [null, ...CATEGORIES] : [null, ...CATEGORIES]).map((item) => {
                                                const itemId = item ? item.name : 'group'
                                                const currentId = selectedCategory ? selectedCategory.name : 'group'
                                                const isActive = itemId === currentId
                                                return (
                                                    <button
                                                        key={itemId}
                                                        onClick={() => {
                                                            setSwipeAxis('x');
                                                            const targetIndex = (item ? CATEGORIES.findIndex(c => c.name === item.name) + 1 : 0);
                                                            const currentIndex = (selectedCategory ? CATEGORIES.findIndex(c => c.name === selectedCategory.name) + 1 : 0);
                                                            setDirection(targetIndex > currentIndex ? 1 : -1);
                                                            setSelectedCategory(item);
                                                        }}
                                                        className="transition-all duration-300 rounded-full"
                                                        style={{
                                                            width: isActive ? 'var(--pagination-active-w)' : 'var(--pagination-dot-size)',
                                                            height: 'var(--pagination-dot-size)',
                                                            backgroundColor: isActive ? 'var(--pagination-active-color)' : 'var(--pagination-inactive-color)'
                                                        }}
                                                    />
                                                )
                                            })
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
                }
            </main >

            {
                isProfileOpen && (
                    <div className="fixed left-[81px] inset-y-1 overflow-hidden z-[70] pointer-events-none font-sans" style={{ width: 'var(--sidepanel-width)' }}>
                        <aside
                            className="h-full w-full border border-l-0 flex flex-col pointer-events-auto animate-in slide-in-from-left-full duration-300 ease-out"
                            style={{
                                backgroundColor: 'var(--sidepanel-bg)',
                                borderColor: 'var(--sidepanel-border)',
                                borderTopRightRadius: 'var(--sidepanel-radius)',
                                borderBottomRightRadius: 'var(--sidepanel-radius)',
                                boxShadow: 'var(--sidepanel-shadow)',
                            }}
                        >
                            {/* Header */}
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
                                <button onClick={() => setIsProfileOpen(false)} className="p-1.5 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-colors"><X className="w-4 h-4" /></button>
                            </div>

                            {/* Body */}
                            <div
                                className="flex-1 overflow-hidden flex flex-col"
                                style={{ padding: 'var(--sidepanel-body-p)' }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sidepanel-body-gap)' }}>
                                    {/* Avatar Section */}
                                    <div className="flex flex-col items-center">
                                        <button onClick={() => setIsAvatarModalOpen(true)} className="relative group focus:outline-none">
                                            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 shadow-xl bg-white/5">
                                                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity"><Camera className="w-5 h-5 text-white" /></div>
                                        </button>
                                        <button onClick={() => setIsAvatarModalOpen(true)} className="mt-2 text-[11px] font-bold text-primary hover:text-primary/80 uppercase tracking-wider">Edit</button>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="space-y-3.5">
                                        <ProfileInfoItem label="Name" value="Maja" prominent />
                                        <ProfileInfoItem label="Group" value="Butterflies" />
                                        <ProfileInfoItem label="School" value="Little Academy" />
                                        <ProfileInfoItem label="Municipality" value="Stockholm" />
                                        <ProfileInfoItem label="Email" value="maja.e@skola.se" />
                                    </div>

                                    {/* Actions - Subtle Outline Buttons */}
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
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--sidepanel-border)' }}>
                                    <button
                                        onClick={onLogout}
                                        className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl transition-colors font-semibold text-sm"
                                        style={{ color: 'var(--sidepanel-logout-color)' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'var(--sidepanel-logout-hover-color)';
                                            e.currentTarget.style.backgroundColor = 'var(--sidepanel-logout-hover-bg)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = 'var(--sidepanel-logout-color)';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                )
            }

            {
                isAvatarModalOpen && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsAvatarModalOpen(false)} />
                        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#1A1F2E] mb-4">Choose avatar</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {AVATARS.map((avatar, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setUserAvatar(avatar);
                                                setIsAvatarModalOpen(false);
                                            }}
                                            className="relative aspect-square rounded-xl overflow-hidden hover:ring-4 hover:ring-primary/20 transition-all group"
                                        >
                                            <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                            {userAvatar === avatar && (
                                                <div className="absolute inset-0 ring-4 ring-primary rounded-xl" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isEditKidModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/60"
                            style={{ backdropFilter: 'var(--modal-backdrop)' }}
                            onClick={() => setIsEditKidModalOpen(false)}
                        />
                        <div
                            className="relative w-full max-w-lg overflow-hidden border flex flex-col max-h-[90vh]"
                            style={{
                                backgroundColor: 'var(--modal-bg)',
                                borderColor: 'var(--modal-border)',
                                borderRadius: 'var(--modal-radius)',
                                boxShadow: 'var(--modal-shadow)'
                            }}
                        >
                            {/* Header */}
                            <div
                                className="flex items-center justify-between border-b"
                                style={{
                                    paddingTop: 'var(--modal-header-py)',
                                    paddingBottom: 'var(--modal-header-py)',
                                    paddingLeft: 'var(--modal-header-px)',
                                    paddingRight: 'var(--modal-header-px)',
                                    borderColor: 'var(--modal-border)'
                                }}
                            >
                                <h3 style={{
                                    fontSize: 'var(--modal-title-size)',
                                    fontWeight: 'var(--modal-title-weight)',
                                    color: 'var(--modal-title-color)'
                                }}>Edit kid details</h3>
                                <button
                                    onClick={() => setIsEditKidModalOpen(false)}
                                    className="p-1 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
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
                                {/* Avatar Selection */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{
                                        fontSize: 'var(--modal-label-size)',
                                        fontWeight: 'var(--modal-label-weight)',
                                        color: 'var(--modal-label-color)',
                                        textTransform: 'var(--modal-label-transform)' as any,
                                        letterSpacing: 'var(--modal-label-spacing)'
                                    }}>Avatar</label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {Object.keys(AVATAR_MAP).map((key) => {
                                            const isSelected = editKidForm.avatar === key
                                            const isUsed = sortedStudentData.some(s => s.avatar === key && s.id !== editKidForm.id)

                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    disabled={isUsed || isSelected}
                                                    onClick={() => !isUsed && !isSelected && setEditKidForm(prev => ({ ...prev, avatar: key }))}
                                                    className={`
                                                        aspect-square rounded-lg p-1.5 flex items-center justify-center transition-all relative
                                                        ${isSelected ? 'bg-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-[#252B3B] cursor-default' : 'bg-white/5 hover:bg-white/10'}
                                                        ${isUsed ? 'opacity-20 cursor-not-allowed grayscale' : ''}
                                                    `}
                                                >
                                                    <img src={AVATAR_MAP[key]} alt={key} className="w-full h-full object-contain" />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{
                                            fontSize: 'var(--modal-label-size)',
                                            fontWeight: 'var(--modal-label-weight)',
                                            color: 'var(--modal-label-color)',
                                            textTransform: 'var(--modal-label-transform)' as any,
                                            letterSpacing: 'var(--modal-label-spacing)'
                                        }}>Kid ID</label>
                                        <input
                                            value={editKidForm.id}
                                            disabled
                                            className="w-full border border-white/10 text-white/30 cursor-not-allowed focus:ring-0"
                                            style={{
                                                height: 'var(--modal-input-h)',
                                                borderRadius: 'var(--modal-input-radius)',
                                                backgroundColor: 'var(--modal-input-bg)',
                                                paddingLeft: 'var(--modal-input-px)',
                                                paddingRight: 'var(--modal-input-px)',
                                                fontSize: 'var(--modal-input-font-size)'
                                            }}
                                        />
                                    </div>
                                    <div className="relative" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{
                                            fontSize: 'var(--modal-label-size)',
                                            fontWeight: 'var(--modal-label-weight)',
                                            color: 'var(--modal-label-color)',
                                            textTransform: 'var(--modal-label-transform)' as any,
                                            letterSpacing: 'var(--modal-label-spacing)'
                                        }}>Age Group</label>
                                        <button
                                            type="button"
                                            onClick={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
                                            className="w-full border border-white/10 text-white flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors hover:border-white/20"
                                            style={{
                                                height: 'var(--modal-input-h)',
                                                borderRadius: 'var(--modal-input-radius)',
                                                backgroundColor: 'var(--modal-input-bg)',
                                                paddingLeft: 'var(--modal-input-px)',
                                                paddingRight: 'var(--modal-input-px)',
                                                fontSize: 'var(--modal-input-font-size)'
                                            }}
                                        >
                                            <span>{editKidForm.ageGroup} years</span>
                                            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-200 ${isAgeDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isAgeDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsAgeDropdownOpen(false)} />
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1F2E] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100">
                                                    {["1-2", "2-3", "3-4", "4-5", "5-6"].map((age) => (
                                                        <button
                                                            key={age}
                                                            type="button"
                                                            onClick={() => {
                                                                setEditKidForm(prev => ({ ...prev, ageGroup: age }))
                                                                setIsAgeDropdownOpen(false)
                                                            }}
                                                            className={`w-full px-3 py-2 text-left text-[13px] transition-colors flex items-center justify-between
                                                                ${editKidForm.ageGroup === age ? 'bg-primary/20 text-white font-medium' : 'text-white/80 hover:bg-white/5 hover:text-white'}
                                                            `}
                                                        >
                                                            {age} years
                                                            {editKidForm.ageGroup === age && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{
                                            fontSize: 'var(--modal-label-size)',
                                            fontWeight: 'var(--modal-label-weight)',
                                            color: 'var(--modal-label-color)',
                                            textTransform: 'var(--modal-label-transform)' as any,
                                            letterSpacing: 'var(--modal-label-spacing)'
                                        }}>Hint</label>
                                        <input
                                            value={editKidForm.hint}
                                            onChange={(e) => setEditKidForm(prev => ({ ...prev, hint: e.target.value }))}
                                            className="w-full border border-white/10 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            placeholder="Enter kid hint"
                                            style={{
                                                height: 'var(--modal-input-h)',
                                                borderRadius: 'var(--modal-input-radius)',
                                                backgroundColor: 'var(--modal-input-bg)',
                                                paddingLeft: 'var(--modal-input-px)',
                                                paddingRight: 'var(--modal-input-px)',
                                                fontSize: 'var(--modal-input-font-size)'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Read-Only Info */}
                                <div className="space-y-4 pt-2 border-t border-white/10">
                                    <h4 style={{
                                        fontSize: 'var(--modal-label-size)',
                                        fontWeight: 'var(--modal-label-weight)',
                                        color: 'var(--modal-label-color)',
                                        textTransform: 'var(--modal-label-transform)' as any,
                                        letterSpacing: 'var(--modal-label-spacing)'
                                    }}>Details (read-only)</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div style={{
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                color: 'white',
                                                opacity: 0.3,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>Group</div>
                                            <div className="text-white text-sm font-medium mt-1">Butterflies</div>
                                        </div>
                                        <div>
                                            <div style={{
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                color: 'white',
                                                opacity: 0.3,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>School</div>
                                            <div className="text-white text-sm font-medium mt-1">Little Academy</div>
                                        </div>
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
                                        }}>
                                            These details can be changed from the Analytics portal. Contact admin.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div
                                className="flex items-center justify-end gap-2 border-t"
                                style={{
                                    paddingTop: 'var(--modal-footer-py)',
                                    paddingBottom: 'var(--modal-footer-py)',
                                    paddingLeft: 'var(--modal-footer-px)',
                                    paddingRight: 'var(--modal-footer-px)',
                                    backgroundColor: 'var(--modal-footer-bg)',
                                    borderColor: 'var(--modal-border)'
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setIsEditKidModalOpen(false)}
                                    className="text-white/40 hover:text-white hover:bg-white/5 transition-colors font-semibold"
                                    style={{
                                        height: 'var(--modal-button-h)',
                                        paddingLeft: 'var(--modal-button-px)',
                                        paddingRight: 'var(--modal-button-px)',
                                        borderRadius: 'var(--modal-button-radius)',
                                        fontSize: 'var(--modal-button-font-size)'
                                    }}
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={() => setIsEditKidModalOpen(false)}
                                    className="font-bold shadow-lg flex items-center justify-center transition-all duration-200 bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-[0_4px_12px_-2px_rgba(79,70,229,0.3)]"
                                    style={{
                                        height: 'var(--modal-button-h)',
                                        minWidth: '100px',
                                        paddingLeft: 'var(--modal-button-px)',
                                        paddingRight: 'var(--modal-button-px)',
                                        borderRadius: 'var(--modal-button-radius)',
                                        fontSize: 'var(--modal-button-font-size)'
                                    }}
                                >
                                    {t('save')}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isProfileOpen && (
                    <div
                        className="fixed inset-0 bg-black/10 z-[60] animate-in fade-in duration-300"
                        onClick={() => setIsProfileOpen(false)}
                    />
                )
            }
            {/* Floating Full View FAB */}
            <div className="fixed bottom-6 right-6 z-[100]">
                <PillButton
                    icon={isFullView ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    variant="white"
                    onClick={() => {
                        if (isFullView) {
                            document.exitFullscreen();
                        } else {
                            document.documentElement.requestFullscreen();
                        }
                    }}
                    className="shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                />
            </div>

            {/* Teacher Dashboard Entry Modal for Kid Mode 2 */}
            {
                isKidGridModalOpen && !activeKidMode2 && (
                    <KidGridModal
                        onClose={() => setIsKidGridModalOpen(false)}
                        onSelect={(kid) => {
                            setSelectedKidMode2(kid)
                            setIsKidGridModalOpen(false)
                            setActiveKidMode2(true)
                            setActiveKidMode2View('intro')
                        }}
                    />
                )
            }
        </div >
    )
}
