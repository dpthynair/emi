import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

type RecordingState = "idle" | "requesting" | "ready" | "recording" | "review" | "playing"

interface VoiceRecordingScreenProps {
    onComplete?: () => void
    onSkip?: () => void
}

// 3 sentences - functionally required
// Longer durations for comfortable reading pace (21s total)
const SENTENCES = [
    { text: "Good morning, everyone! Today we'll read a fun story, sing a little song, and then play outside together.", duration: 8000 },
    { text: "The children are laughing, sharing their toys, and talking about the animals they love.", duration: 7000 },
    { text: "It's such a bright and happy day to learn and explore new things.", duration: 6000 },
]

const MAX_DURATION = SENTENCES.reduce((acc, s) => acc + s.duration, 0)

// Warm, calm red (not error red)
const RECORDING_RED = "#E05A5A"

export function VoiceRecordingScreen({ onComplete, onSkip }: VoiceRecordingScreenProps) {
    const [state, setState] = useState<RecordingState>("idle")
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [amplitude, setAmplitude] = useState(0)
    const [playbackProgress, setPlaybackProgress] = useState(0)
    const [activeSentence, setActiveSentence] = useState(0)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const animationRef = useRef<number | null>(null)
    const recordingTimeoutRef = useRef<number | null>(null)
    const sentenceTimerRef = useRef<number | null>(null)

    useEffect(() => {
        return () => {
            if (audioUrl) URL.revokeObjectURL(audioUrl)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current)
            if (sentenceTimerRef.current) clearTimeout(sentenceTimerRef.current)
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
        }
    }, [audioUrl])

    useEffect(() => {
        if (state !== "recording") {
            setActiveSentence(0)
            return
        }

        let currentIndex = 0
        setActiveSentence(0)

        const advanceSentence = () => {
            if (currentIndex < SENTENCES.length - 1) {
                sentenceTimerRef.current = window.setTimeout(() => {
                    currentIndex++
                    setActiveSentence(currentIndex)
                    advanceSentence()
                }, SENTENCES[currentIndex].duration)
            }
        }

        advanceSentence()

        return () => {
            if (sentenceTimerRef.current) clearTimeout(sentenceTimerRef.current)
        }
    }, [state])

    const analyzeAudio = useCallback(() => {
        if (!analyserRef.current || state !== "recording") return

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArray)

        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        // Boost sensitivity for standard laptop microphones
        const normalizedAmplitude = Math.min((avg / 64) * 1.5, 1)

        setAmplitude(prev => prev * 0.7 + normalizedAmplitude * 0.3)

        animationRef.current = requestAnimationFrame(analyzeAudio)
    }, [state])

    useEffect(() => {
        if (state === "recording") {
            analyzeAudio()
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            setAmplitude(0)
        }
    }, [state, analyzeAudio])

    useEffect(() => {
        if (state !== "playing" || !audioRef.current) {
            setPlaybackProgress(0)
            return
        }

        const updateProgress = () => {
            if (audioRef.current) {
                const progress = audioRef.current.currentTime / audioRef.current.duration
                setPlaybackProgress(isNaN(progress) ? 0 : progress)
            }
        }

        const interval = setInterval(updateProgress, 50)
        return () => clearInterval(interval)
    }, [state])

    const requestMicPermission = async () => {
        setState("requesting")
        setError(null)

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream

            const audioContext = new AudioContext()
            const source = audioContext.createMediaStreamSource(stream)
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256
            analyser.smoothingTimeConstant = 0.8
            source.connect(analyser)
            analyserRef.current = analyser

            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data)
                }
            }

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
                const url = URL.createObjectURL(audioBlob)
                if (audioUrl) URL.revokeObjectURL(audioUrl)
                setAudioUrl(url)
                setState("review")
            }

            setState("ready")
        } catch (err) {
            setError("Microphone access denied. You can skip this step and set it up later.")
            setState("idle")
        }
    }

    const startRecording = () => {
        if (!mediaRecorderRef.current) return

        audioChunksRef.current = []
        setActiveSentence(0)
        mediaRecorderRef.current.start()
        setState("recording")

        recordingTimeoutRef.current = window.setTimeout(() => {
            stopRecording()
        }, MAX_DURATION)
    }

    const stopRecording = () => {
        if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current)
        if (sentenceTimerRef.current) clearTimeout(sentenceTimerRef.current)
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop()
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
        }
    }

    const playRecording = () => {
        if (!audioUrl) return

        if (audioRef.current) {
            audioRef.current.pause()
        }

        const audio = new Audio(audioUrl)
        audioRef.current = audio

        audio.onended = () => {
            setPlaybackProgress(0)
            setState("review")
        }

        audio.play()
        setState("playing")
    }

    const stopPlayback = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
        setPlaybackProgress(0)
        setState("review")
    }

    const reRecord = async () => {
        if (audioUrl) URL.revokeObjectURL(audioUrl)
        setAudioUrl(null)
        setPlaybackProgress(0)
        await requestMicPermission()
    }

    // Ring indicator component
    const RingIndicator = ({ size = 120 }: { size?: number }) => {
        const strokeWidth = 3
        const radius = (size - strokeWidth * 2) / 2
        const circumference = 2 * Math.PI * radius

        const isRecording = state === "recording"
        const scale = isRecording ? 1 + amplitude * 0.15 : 1
        const progressOffset = state === "playing" ? circumference * (1 - playbackProgress) : circumference

        return (
            <div className="relative flex items-center justify-center overflow-visible" style={{ width: size, height: size }}>
                {/* Inner glow (only when recording) */}
                <div
                    className="absolute inset-4 rounded-full transition-all duration-150 ease-out pointer-events-none"
                    style={{
                        background: isRecording
                            ? `radial-gradient(circle, ${RECORDING_RED}50 0%, transparent 70%)`
                            : "transparent",
                        transform: `scale(${scale})`,
                    }}
                />

                <svg
                    className="absolute inset-0 transition-transform duration-200 ease-out pointer-events-none"
                    style={{ transform: `scale(${scale})` }}
                    viewBox={`0 0 ${size} ${size}`}
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        className="stroke-white/10"
                    />

                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        strokeWidth={isRecording ? strokeWidth + amplitude * 6 : strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={state === "playing" ? progressOffset : 0}
                        className="transition-all duration-300 ease-out"
                        style={{
                            stroke: isRecording ? RECORDING_RED : (state === "playing" ? "#F8CB16" : "rgba(255,255,255,0.15)"),
                            transform: "rotate(-90deg)",
                            transformOrigin: "center",
                            opacity: isRecording ? 0.7 + amplitude * 0.3 : 1
                        }}
                    />
                </svg>

                <div className="relative z-10">
                    {state === "ready" && (
                        <button
                            onClick={startRecording}
                            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all duration-200 shadow-lg shadow-primary/25"
                        >
                            <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
                                <path d="M19 11a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 10-2 0 7 7 0 006 6.92V20H8a1 1 0 100 2h8a1 1 0 100-2h-3v-2.08A7 7 0 0019 11z" />
                            </svg>
                        </button>
                    )}

                    {state === "recording" && (
                        <button
                            onClick={stopRecording}
                            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{ backgroundColor: RECORDING_RED, boxShadow: `0 6px 20px ${RECORDING_RED}50` }}
                        >
                            <div className="w-5 h-5 rounded bg-white" />
                        </button>
                    )}

                    {(state === "review" || state === "playing") && (
                        <button
                            onClick={state === "playing" ? stopPlayback : playRecording}
                            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all duration-200 shadow-lg shadow-primary/25"
                        >
                            {state === "playing" ? (
                                <div className="flex gap-1.5">
                                    <div className="w-1.5 h-5 rounded-sm bg-primary-foreground" />
                                    <div className="w-1.5 h-5 rounded-sm bg-primary-foreground" />
                                </div>
                            ) : (
                                <svg className="w-9 h-9 text-primary-foreground ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>
            </div>
        )
    }

    // Initial state - request permission
    if (state === "idle" || state === "requesting") {
        return (
            <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-10">
                <div className="space-y-6">
                    <p className="text-white text-xl font-medium leading-relaxed">
                        Record your voice sample
                    </p>

                    <p className="text-white/50 text-base leading-relaxed">
                        We'll ask you to read a short sentence aloud.
                        This helps eMi recognize and filter your voice during classroom sessions.
                    </p>
                </div>

                {error && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                        <p className="text-amber-400 text-sm mb-3">{error}</p>
                        <button
                            className="text-amber-400/70 text-xs underline hover:text-amber-400"
                            onClick={() => { setError(null); requestMicPermission(); }}
                        >
                            Try again
                        </button>
                    </div>
                )}

                <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                        <Button
                            className="h-14 px-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                            onClick={requestMicPermission}
                            disabled={state === "requesting"}
                        >
                            {state === "requesting" ? "Requesting access..." : "Enable microphone"}
                        </Button>

                        <button
                            className="text-white/60 text-sm hover:text-white/80 font-medium py-2"
                            onClick={onSkip}
                        >
                            Skip for now
                        </button>
                    </div>

                    <p className="text-white/20 text-xs leading-relaxed">
                        Your voice sample stays on your device and is never uploaded.
                    </p>
                </div>
            </div>
        )
    }

    // Review / Playing state - centered layout
    if (state === "review" || state === "playing") {
        return (
            <div className="text-center flex flex-col items-center gap-8">
                <p className="text-white/60 text-sm font-medium">
                    {state === "playing" ? "Playing your recording..." : "Here's your recording"}
                </p>

                <RingIndicator size={140} />

                <button
                    onClick={state === "playing" ? stopPlayback : playRecording}
                    className="text-white/60 text-sm font-medium hover:text-white transition-colors"
                >
                    {state === "playing" ? "Tap to pause" : "Tap to listen"}
                </button>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="secondary"
                            className="h-14 px-8 text-base font-medium bg-[#2A3142] hover:bg-[#353D50] text-white/80 border-0"
                            onClick={reRecord}
                        >
                            <svg className="w-6 h-6 mr-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Re-Record
                        </Button>

                        <Button
                            className="h-14 px-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                            onClick={onComplete}
                        >
                            Looks good, continue
                        </Button>
                    </div>

                    <button
                        className="text-white/60 text-sm hover:text-white/80 font-medium py-2"
                        onClick={onSkip}
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        )
    }

    // Ready / Recording state - TWO COLUMN LAYOUT (sentences left, button right)
    return (
        <div className="flex items-center gap-24 lg:gap-32 max-w-7xl mx-auto px-6 lg:px-12">
            {/* Left: Sentences */}
            <div className="flex-1 text-left flex flex-col gap-12">
                <p className="text-white/40 text-sm">
                    Please read the following sentences aloud. When you're ready, tap the microphone to start recording your voice.
                </p>

                <div className="space-y-12">
                    {SENTENCES.map((sentence, index) => {
                        const isActive = state === "recording" && index === activeSentence
                        const isPast = state === "recording" && index < activeSentence

                        return (
                            <p
                                key={index}
                                className={`transition-all duration-300 ${isActive
                                    ? "text-white text-2xl font-medium leading-tight"
                                    : isPast
                                        ? "text-white/40 text-lg leading-snug"
                                        : state === "recording"
                                            ? "text-white/20 text-lg leading-snug"
                                            : "text-white/70 text-2xl font-medium leading-tight"
                                    }`}
                            >
                                {sentence.text}
                            </p>
                        )
                    })}
                </div>
            </div>

            {/* Right: Recording Control - centered in its block */}
            <div className="flex flex-col items-center justify-center min-w-[200px]">
                <p
                    className="text-sm font-medium mb-8 transition-colors duration-300"
                    style={{ color: state === "recording" ? RECORDING_RED : "rgba(255,255,255,0.6)" }}
                >
                    {state === "recording" ? "Recording..." : "Start recording"}
                </p>

                <RingIndicator size={140} />

                <button
                    onClick={stopRecording}
                    className="relative z-50 text-white/60 text-sm mt-8 font-medium hover:text-white transition-colors h-6 px-4 py-2"
                >
                    {state === "recording" ? "Tap to stop" : ""}
                </button>
            </div>
        </div>
    )
}
