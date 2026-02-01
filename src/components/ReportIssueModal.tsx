import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ReportIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    defaultType?: string;
}

const ISSUE_TYPES = ["General", "Learning area", "Kids", "Activities"];
const MOCK_KIDS = ["S-01", "S-02", "S-03", "S-04"];
const MOCK_ACTIVITIES = ["L-101 Playground", "L-102 Bathroom", "M-201 Counting"];
const MOCK_AREAS = ["Language", "Math", "Science", "Art"];

export function ReportIssueModal({ isOpen, onClose, onSuccess, defaultType = "General" }: ReportIssueModalProps) {
    const [issueType, setIssueType] = useState<string>(defaultType);
    const [relatedItem, setRelatedItem] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset and Auto-select on open
    useEffect(() => {
        if (isOpen) {
            setIssueType(defaultType || "General");
            setRelatedItem("");
            setTitle("");
            setDescription("");
        }
    }, [isOpen, defaultType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        onSuccess();
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60"
                style={{ backdropFilter: 'var(--modal-backdrop)' }}
                onClick={onClose}
            />

            {/* Modal - Dark Theme */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-lg overflow-hidden border"
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
                    <h2 style={{
                        fontSize: 'var(--modal-title-size)',
                        fontWeight: 'var(--modal-title-weight)',
                        color: 'var(--modal-title-color)'
                    }}>Report an issue</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div
                    style={{
                        paddingTop: 'var(--modal-body-py)',
                        paddingBottom: 'var(--modal-body-py)',
                        paddingLeft: 'var(--modal-body-px)',
                        paddingRight: 'var(--modal-body-px)'
                    }}
                >
                    <p
                        className="leading-relaxed mb-5"
                        style={{
                            fontSize: 'var(--modal-desc-size)',
                            color: 'var(--modal-desc-color)'
                        }}
                    >
                        Do you find any issue? Kindly report it to us.<br />
                        Your feedback helps us improve the experience of the application.
                    </p>

                    <form id="report-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--modal-body-gap)' }}>
                        {/* Issue Type */}
                        <div className="space-y-1.5 text-left">
                            <label style={{
                                fontSize: 'var(--modal-label-size)',
                                fontWeight: 'var(--modal-label-weight)',
                                color: 'var(--modal-label-color)',
                                textTransform: 'var(--modal-label-transform)' as any,
                                letterSpacing: 'var(--modal-label-spacing)'
                            }}>Issue type</label>
                            <CustomSelect
                                value={issueType}
                                options={ISSUE_TYPES}
                                placeholder="Select issue type"
                                onChange={setIssueType}
                            />
                        </div>

                        {/* Context Selector */}
                        <AnimatePresence mode="wait">
                            {issueType === "General" ? (
                                <motion.div
                                    key="general"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1.5 text-left"
                                >
                                    <label style={{
                                        fontSize: 'var(--modal-label-size)',
                                        fontWeight: 'var(--modal-label-weight)',
                                        color: 'var(--modal-label-color)',
                                        textTransform: 'var(--modal-label-transform)' as any,
                                        letterSpacing: 'var(--modal-label-spacing)'
                                    }}>Issue title</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full border outline-none transition-all placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary"
                                        style={{
                                            height: 'var(--modal-input-h)',
                                            paddingLeft: 'var(--modal-input-px)',
                                            paddingRight: 'var(--modal-input-px)',
                                            borderRadius: 'var(--modal-input-radius)',
                                            backgroundColor: 'var(--modal-input-bg)',
                                            borderColor: 'var(--modal-border)',
                                            fontSize: 'var(--modal-input-font-size)',
                                            color: '#FFFFFF'
                                        }}
                                        placeholder="Issue title"
                                    />
                                </motion.div>
                            ) : issueType && (
                                <motion.div
                                    key="specific"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1.5 text-left"
                                >
                                    <label style={{
                                        fontSize: 'var(--modal-label-size)',
                                        fontWeight: 'var(--modal-label-weight)',
                                        color: 'var(--modal-label-color)',
                                        textTransform: 'var(--modal-label-transform)' as any,
                                        letterSpacing: 'var(--modal-label-spacing)'
                                    }}>
                                        {issueType === "Learning area" ? "Choose learning area" :
                                            issueType === "Kids" ? "Choose kid" :
                                                "Choose activity"}
                                    </label>
                                    <CustomSelect
                                        value={relatedItem}
                                        options={
                                            issueType === "Kids" ? MOCK_KIDS :
                                                issueType === "Activities" ? MOCK_ACTIVITIES :
                                                    issueType === "Learning area" ? MOCK_AREAS : []
                                        }
                                        placeholder={`Choose ${issueType.toLowerCase().replace('kids', 'kid').replace('activities', 'activity').replace('learning area', 'learning area')}`}
                                        onChange={setRelatedItem}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Description */}
                        <div className="space-y-1.5 text-left">
                            <label style={{
                                fontSize: 'var(--modal-label-size)',
                                fontWeight: 'var(--modal-label-weight)',
                                color: 'var(--modal-label-color)',
                                textTransform: 'var(--modal-label-transform)' as any,
                                letterSpacing: 'var(--modal-label-spacing)'
                            }}>Issue Description</label>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full border outline-none transition-all placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                                style={{
                                    paddingLeft: 'var(--modal-input-px)',
                                    paddingRight: 'var(--modal-input-px)',
                                    paddingTop: '0.75rem',
                                    paddingBottom: '0.75rem',
                                    borderRadius: 'var(--modal-input-radius)',
                                    backgroundColor: 'var(--modal-input-bg)',
                                    borderColor: 'var(--modal-border)',
                                    fontSize: 'var(--modal-input-font-size)',
                                    color: '#FFFFFF'
                                }}
                                placeholder="Describe the issue in detail"
                            />
                        </div>
                    </form>

                    <div className="pt-2 text-left">
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
                                This issue will be submitted to the administrator.
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
                        onClick={onClose}
                        className="text-white/40 hover:text-white hover:bg-white/5 transition-colors font-semibold"
                        style={{
                            height: 'var(--modal-button-h)',
                            paddingLeft: 'var(--modal-button-px)',
                            paddingRight: 'var(--modal-button-px)',
                            borderRadius: 'var(--modal-button-radius)',
                            fontSize: 'var(--modal-button-font-size)'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        form="report-form"
                        type="submit"
                        disabled={!issueType || !description || isSubmitting}
                        className={`
                            font-bold shadow-lg flex items-center gap-2 transition-all duration-200
                            ${!issueType || !description || isSubmitting
                                ? 'bg-secondary/40 text-white/40 cursor-not-allowed'
                                : 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-[0_4px_12px_-2px_rgba(79,70,229,0.3)]'
                            }
                        `}
                        style={{
                            height: 'var(--modal-button-h)',
                            paddingLeft: 'var(--modal-button-px)',
                            paddingRight: 'var(--modal-button-px)',
                            borderRadius: 'var(--modal-button-radius)',
                            fontSize: 'var(--modal-button-font-size)'
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </motion.div>
        </div>,
        document.body
    );
}

function CustomSelect({ value, options, placeholder, onChange }: { value: string, options: string[], placeholder: string, onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border text-left flex items-center justify-between transition-all"
                style={{
                    height: 'var(--modal-input-h)',
                    paddingLeft: 'var(--modal-input-px)',
                    paddingRight: 'var(--modal-input-px)',
                    borderRadius: 'var(--modal-input-radius)',
                    backgroundColor: isOpen ? 'var(--modal-input-bg)' : 'var(--modal-input-bg)',
                    borderColor: isOpen ? 'var(--primary)' : 'var(--modal-border)',
                    fontSize: 'var(--modal-input-font-size)',
                    boxShadow: isOpen ? '0 0 0 1px var(--primary)' : 'none'
                }}
            >
                <span style={{ color: value ? "#FFFFFF" : "rgba(255, 255, 255, 0.2)" }}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div
                        className="absolute top-full left-0 right-0 mt-2 border shadow-2xl z-20 max-h-48 overflow-y-auto py-1 animate-in fade-in zoom-in-95 duration-100"
                        style={{
                            backgroundColor: 'var(--modal-bg)',
                            borderColor: 'var(--modal-border)',
                            borderRadius: 'var(--modal-input-radius)'
                        }}
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                    onChange(opt);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full px-4 py-2.5 text-left text-[13px] hover:bg-white/5
                                    ${value === opt ? 'text-primary font-bold bg-primary/5' : 'text-white/70'}
                                `}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
