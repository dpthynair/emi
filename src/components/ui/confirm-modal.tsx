import { Button } from "./button"

interface ConfirmModalProps {
    isOpen: boolean
    title: string
    message: string
    confirmLabel: string
    cancelLabel: string
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmModal({
    isOpen,
    title,
    message,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel
}: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
                onClick={onCancel}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-[#252B3B] border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-black/50 transform transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-4">
                {/* Icon Placeholder (Optional - could add a warning icon here) */}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h2 className="text-white text-xl font-semibold mb-3 text-center">
                    {title}
                </h2>

                <p className="text-white/50 text-sm leading-relaxed mb-10 text-center">
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={onConfirm}
                        className="h-14 w-full text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                    >
                        {confirmLabel}
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        className="h-14 w-full text-base font-medium text-white/40 hover:text-white/60 hover:bg-white/5"
                    >
                        {cancelLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}
