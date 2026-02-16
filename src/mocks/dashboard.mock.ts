import { BookOpen, Calculator, FlaskConical, Heart } from "lucide-react"


export  const CATEGORIES: { name: string; id: string; color: string }[] = [
    { name: "Language", id: "language", color: "#4F46E5" },
    { name: "Math", id: "math", color: "#10B981" },
    { name: "Science", id: "science", color: "#F59E0B" },
    { name: "Emotional well-being", id: "emotionalWellbeing", color: "#EC4899" }
]

export const getYAxisDomain = (data: any[], keys: string | string[], isPercentage: boolean = false) => {
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

export const PERIOD_OPTIONS = ["Today", "Last 7 days", "Last 30 days", "Last 3 months", "This school year"]

export const MOCK_TREND_DATA: Record<string, any[]> = {
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

export const MOCK_CATEGORY_DATA: Record<string, any[]> = {
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

export const MOCK_DIFFICULTY_DATA: Record<string, any[]> = {
    "Today": [{ level: "Easy", value: 9.4, color: "#10B981" }, { level: "Medium", value: 8.2, color: "#F59E0B" }, { level: "Hard", value: 7.1, color: "#EF4444" }],
    "Last 7 days": [{ level: "Easy", value: 8.8, color: "#10B981" }, { level: "Medium", value: 7.5, color: "#F59E0B" }, { level: "Hard", value: 6.4, color: "#EF4444" }],
    "Last 30 days": [{ level: "Easy", value: 8.5, color: "#10B981" }, { level: "Medium", value: 7.1, color: "#F59E0B" }, { level: "Hard", value: 6.2, color: "#EF4444" }],
    "Last 3 months": [{ level: "Easy", value: 8.2, color: "#10B981" }, { level: "Medium", value: 6.8, color: "#F59E0B" }, { level: "Hard", value: 5.9, color: "#EF4444" }],
    "This school year": [{ level: "Easy", value: 7.9, color: "#10B981" }, { level: "Medium", value: 6.5, color: "#F59E0B" }, { level:"Hard", value :5.4 ,color:"#EF4444"}]
}

export const MOCK_DEMOGRAPHIC_DATA: Record<string, any> = {
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

export const MOCK_CATEGORY_DETAILS: Record<string, any> = {
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

export const MOCK_STUDENT_DETAILS: Record<string, any> = {
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


 export const BRAND_YELLOW = "#FCD34D";

export const MOCK_KPIS: Record<string, any> = {
    "Today": { participation: "89.5%", performance: "6.8", balance: "0.82", trend: "+5.2%" },
    "Last 7 days": { participation: "89.5%", performance: "6.4", balance: "0.94", trend: "+4.2%" },
    "Last 30 days": { participation: "84.2%", performance: "6.1", balance: "0.89", trend: "-5.3%" },
    "Last 3 months": { participation: "78.9%", performance: "5.8", balance: "0.86", trend: "+5.2%" },
    "This school year": { participation: "73.7%", performance: "5.5", balance: "0.82", trend: "" }
}

export const AVATARS = [
    "/kidsavatars/apple.png", "/kidsavatars/balloon.png", "/kidsavatars/bundle.png", "/kidsavatars/butterfly.png",
    "/kidsavatars/cat.png", "/kidsavatars/dun.png", "/kidsavatars/flight.png", "/kidsavatars/flower1.png",
    "/kidsavatars/flower2.png", "/kidsavatars/heart.png", "/kidsavatars/ice creame.png", "/kidsavatars/melon.png",
    "/kidsavatars/snail.png", "/kidsavatars/sparrow.png", "/kidsavatars/star.png", "/kidsavatars/strawberry.png",
    "/kidsavatars/tree.png", "/kidsavatars/umbrella.png"
]


