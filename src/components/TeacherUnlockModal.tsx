import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, X, Delete } from "lucide-react"

interface TeacherUnlockModalProps {
    onClose: () => void
    onConfirm: () => void
}

export function TeacherUnlockModal({ onClose, onConfirm }: TeacherUnlockModalProps) {
    const [pin, setPin] = useState<string>("")
    const [isError, setIsError] = useState(false)
    const correctPin = "1111" // Standard prototype PIN

    const handleKeyClick = (num: string) => {
        if (pin.length < 4) {
            const newPin = pin + num
            setPin(newPin)
            setIsError(false)

            if (newPin.length === 4) {
                if (newPin === correctPin) {
                    setTimeout(() => onConfirm(), 200)
                } else {
                    setTimeout(() => {
                        setIsError(true)
                        setPin("")
                    }, 200)
                }
            }
        }
    }

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1))
        setIsError(false)
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    className="w-full max-w-sm bg-[#1A1F2E] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-8 text-center space-y-3">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-1">
                            <Lock className="w-7 h-7 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Teacher Zone</h2>
                        <p className="text-sm text-white/40">Enter security code to exit game mode</p>
                    </div>

                    {/* PIN Display */}
                    <div className="flex justify-center gap-5 mb-8">
                        {[0, 1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={isError ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                                transition={{ duration: 0.4 }}
                                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${pin.length > i
                                        ? 'bg-primary scale-110 shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]'
                                        : isError ? 'bg-red-500/50' : 'bg-white/10'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-2 px-8 pb-10">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleKeyClick(num.toString())}
                                className="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-xl font-medium text-white flex items-center justify-center"
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={onClose}
                            className="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-white/40"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => handleKeyClick("0")}
                            className="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-xl font-medium text-white flex items-center justify-center"
                        >
                            0
                        </button>
                        <button
                            onClick={handleDelete}
                            className="h-16 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-white/40"
                        >
                            <Delete className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
