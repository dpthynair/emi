

export interface SegmentedToggleOption {
    label: string;
    value: string;
    color?: string; // Optional colored dot
}

export interface SegmentedToggleProps {
    options: SegmentedToggleOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function SegmentedToggle({ options, value, onChange, className = "" }: SegmentedToggleProps) {
    return (
        <div
            className={`flex items-center rounded-full ${className}`}
            style={{
                backgroundColor: 'var(--seg-bg)',
                borderRadius: 'var(--seg-radius)',
                padding: 'var(--seg-padding)',
                border: '1px solid var(--seg-border)',
            }}
        >
            {options.map((option) => {
                const isActive = value === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className="flex items-center gap-2 justify-center uppercase transition-all relative"
                        style={{
                            minWidth: 'var(--seg-btn-min-width)',
                            height: 'var(--seg-btn-height)',
                            paddingLeft: 'var(--seg-btn-px)',
                            paddingRight: 'var(--seg-btn-px)',
                            fontSize: 'var(--seg-btn-font-size)',
                            fontWeight: 'var(--seg-btn-font-weight)',
                            letterSpacing: 'var(--seg-btn-letter-spacing)',
                            borderRadius: 'var(--seg-btn-radius)',
                            backgroundColor: isActive ? 'var(--seg-active-bg)' : 'transparent',
                            color: isActive ? 'var(--seg-active-color)' : 'var(--seg-inactive-color)',
                            boxShadow: isActive ? 'var(--seg-active-shadow)' : 'none',
                            ...(isActive ? { boxShadow: 'var(--seg-active-shadow), inset 0 0 0 1px var(--seg-active-ring)' } : {}),
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.color = 'var(--seg-inactive-hover-color)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.color = 'var(--seg-inactive-color)';
                            }
                        }}
                    >
                        {option.color && (
                            <div
                                className={`w-2 h-2 rounded-full shadow-sm transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}
                                style={{ backgroundColor: option.color }}
                            />
                        )}
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
