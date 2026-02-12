import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

interface MathGateModalProps {
    onClose: () => void;
    onSwitch: () => void; // Open Kid Grid Modal
    onExit: () => void;   // Return to Teacher Mode
}

export function MathGateModal({ onClose, onSwitch, onExit }: MathGateModalProps) {
    const [num1] = useState(Math.floor(Math.random() * 5) + 3)
    const [num2] = useState(Math.floor(Math.random() * 5) + 2)
    const [answer, setAnswer] = useState("")
    const [isSolved, setIsSolved] = useState(false)

    const expectedAnswer = (num1 + num2).toString()

    const handleSubmit = (val: string) => {
        if (val === expectedAnswer) {
            setIsSolved(true)
        } else {
            setAnswer("")
        }
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-sm bg-[#1A1F2E] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
                >
                    <div className="p-8 text-center">
                        <h2 className="text-xl font-semibold text-white mb-2">Teacher Check</h2>
                        <p className="text-sm text-white/40 mb-8">Please solve this to access settings</p>

                        <div className="flex flex-col items-center gap-6">
                            <div className="text-3xl font-bold text-white tracking-widest flex items-center gap-4">
                                <span>{num1}</span>
                                <span className="text-primary">+</span>
                                <span>{num2}</span>
                                <span className="text-primary">=</span>
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary">
                                    {answer || "?"}
                                </div>
                            </div>

                            {!isSolved ? (
                                <div className="grid grid-cols-3 gap-2 w-full">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => {
                                                const newAnswer = answer + num
                                                setAnswer(newAnswer)
                                                if (newAnswer.length >= expectedAnswer.length) {
                                                    handleSubmit(newAnswer)
                                                }
                                            }}
                                            className={`h-14 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-medium text-white transition-all ${num === 0 ? 'col-span-2' : ''}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setAnswer("")}
                                        className="h-14 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <button
                                        onClick={onSwitch}
                                        className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-5 h-5" />
                                        Switch Kid
                                    </button>
                                    <button
                                        onClick={onExit}
                                        className="w-full h-14 bg-white/5 hover:bg-white/10 text-white/60 font-semibold rounded-2xl transition-all"
                                    >
                                        Exit Kid Mode
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
