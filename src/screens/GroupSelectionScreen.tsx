import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/LanguageContext"

interface Group {
    id: string
    name: string
    image: string
}

const GROUPS: Group[] = [
    { id: "bjornarna", name: "Bears", image: "/Björnarna.jpg" },
    { id: "fjarilarna", name: "Butterflies", image: "/Fjärilarna.jpg" },
    { id: "nyckelpigorna", name: "Ladybugs", image: "/Nyckelpigorna.jpg" },
]

interface GroupSelectionScreenProps {
    userName?: string
    onSelect?: (groupId: string) => void
}

export function GroupSelectionScreen({ onSelect }: GroupSelectionScreenProps) {
    const { t } = useLanguage()
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
    const [rememberSelection, setRememberSelection] = useState(false)

    const handleSelect = (id: string) => {
        setSelectedGroup(id)
        if (onSelect) {
            // Add a small delay for visual feedback
            setTimeout(() => onSelect(id), 200)
        }
    }

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
            {/* Titles */}
            <div className="text-center">
                <h2 className="text-white text-xl font-medium">
                    {t('groupTitle')}
                </h2>
            </div>

            {/* Group Grid */}
            <div className="flex flex-wrap justify-center gap-12">
                {GROUPS.map((group) => (
                    <button
                        key={group.id}
                        onClick={() => handleSelect(group.id)}
                        className="group flex flex-col items-center gap-6"
                    >
                        <div className={`
                            w-32 h-32 rounded-full bg-white overflow-hidden p-4
                            transition-all duration-300 ring-4 
                            ${selectedGroup === group.id
                                ? "ring-primary scale-110 shadow-2xl shadow-primary/20"
                                : "ring-transparent hover:ring-white/10 group-hover:scale-105"}
                        `}>
                            <img
                                src={group.image}
                                alt={group.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className={`
                            text-base font-medium transition-colors duration-300
                            ${selectedGroup === group.id ? "text-primary" : "text-white/80 group-hover:text-white"}
                        `}>
                            {t(group.name as any)}
                        </span>
                    </button>
                ))}
            </div>

            {/* Remember Selection */}
            <div className="flex items-center justify-center gap-3">
                <Checkbox
                    id="remember"
                    checked={rememberSelection}
                    onCheckedChange={(checked: boolean) => setRememberSelection(checked)}
                    className="w-5 h-5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                    htmlFor="remember"
                    className="text-sm text-white/40 font-normal cursor-pointer hover:text-white/60 transition-colors"
                >
                    {t('rememberGroup')}
                </Label>
            </div>
        </div>
    )
}
