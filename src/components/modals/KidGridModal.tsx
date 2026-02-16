import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { MOCK_STUDENT_DATA, AVATAR_MAP } from "@/mocks/dashboard.mock"

interface KidGridModalProps {
    onClose: () => void;
    onSelect: (kid: any) => void;
}

export function KidGridModal({ onClose, onSelect }: KidGridModalProps) {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-[#1A1F2E] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-8 pb-4 text-center">
                        <h2 className="text-2xl font-bold text-white mb-1">Select Kid</h2>
                        <p className="text-sm text-white/40">Choose which kid will enter game mode</p>
                    </div>

                    {/* Scrollable Grid */}
                    <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                            {MOCK_STUDENT_DATA.map((kid) => (
                                <button
                                    key={kid.id}
                                    onClick={() => onSelect(kid)}
                                    className="group flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all outline-none"
                                >
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:scale-110 transition-transform p-1">
                                        <img
                                            src={AVATAR_MAP[kid.avatar] || AVATAR_MAP["apple"]}
                                            alt={kid.id}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-xs text-white/40 font-normal leading-none group-hover:text-white/60 transition-colors">
                                        {kid.id}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors bg-white/5 rounded-full"
                    >
                        <X size={24} />
                    </button>

                    {/* Bottom visual spacer */}
                    <div className="h-4 bg-gradient-to-t from-black/20 to-transparent flex-shrink-0" />
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
