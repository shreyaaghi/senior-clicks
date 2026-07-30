import { useState } from 'react';

type Step = {
    instruction: string;
    correctTarget: string;
    feedbackCorrect: string;
    feedbackIncorrect: { [key: string]: string };
}

const steps: Step[] = [
    {
        instruction: "Your healthcare provider sent you a meeting link with a 'meeting ID' included. What do you click to join?",
        correctTarget: 'Join',
        feedbackCorrect: "That's it! You're one step closer to entering the meeting.",
        feedbackIncorrect: {
            "Meet": "Good thinking, but 'Meet' starts a brand new call. You're trying to join one that's already set up.",
            "Schedule": "Not quite. This will schedule a meeting in the future, and you're trying to join one right now.",
            "Share": "Not quite. Share Screen is used during a call to show what's on your screen to others."
        }
    },
    {
        instruction: "Type the 11-digit meeting ID (123 4567 8910) your healthcare provider gave you and click join.",
        correctTarget: 'Join',
        feedbackCorrect: "That's it! You're entering the meeting.",
        feedbackIncorrect: {
            "Cancel": "Cancel will close this screen."
        },
    },
    {
        instruction: "Zoom is asking how you want to hear the call. What do you choose?",
        correctTarget: 'Wi-Fi or cellular data',
        feedbackCorrect: "Yes! This connects your phone's speakers and microphone over Wi-Fi or cellular data, so you can hear and be heard.",
        feedbackIncorrect: {
            "No Audio": "With no audio, others wont be able to hear you and you won't be able to hear others."
        },
    }
]

export default function ZoomJoinCall() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const currentStep = steps[currentStepIndex];

    const handleClick = (buttonLabel: string) => {
        if (isCorrect) return;
        const correct = buttonLabel === currentStep.correctTarget;
        setIsCorrect(correct);
        setFeedbackText(
            correct ? currentStep.feedbackCorrect : currentStep.feedbackIncorrect[buttonLabel]
        )
        setShowFeedback(true);

        if(!correct) {
            setTimeout(() => setShowFeedback(false), 5000);
        }
    };

    const handleNext = () => {
        if (currentStepIndex === steps.length - 1) {
            setIsComplete(true);
        } else {
            setCurrentStepIndex(currentStepIndex + 1);
            setShowFeedback(false);
            setFeedbackText('');
            setIsCorrect(false);
        }
    }

    if (isComplete) {
        return (
            <div>
                <p>You have successfully joined a Zoom call!</p>
            </div>
        );
    }

    const renderCurrentScreen = () => {
        if (currentStepIndex === 0) {
            return (
                <div className="relative flex flex-col bg-[#1c1c1e] rounded-xl w-80 h-[500px] pb-20 p-5 font-sans text-white overflow-hidden mx-auto">
                    {/* status bar */}
                    <div className="flex justify-between mb-4 text-xs font-bold">
                        <span>9:24</span>
                        <span>📶 🔋</span>
                    </div>
                    {/* header */}
                    <div className="flex justify-between text-md">
                        <span>Home</span>
                        <span>🔍</span>
                    </div>
                    {/* icon grid */}
                    <div className="grid grid-cols-2 gap-4 mt-4 mx-2">
                        {[
                            { label: 'Meet', bgClass: 'bg-[#F26D21]', emoji: '📞' },
                            { label: 'Join', bgClass: 'bg-[#1A3Ff5]', emoji: '👥' },
                            { label: 'Schedule', bgClass: 'bg-[#1A3Ff5]', emoji: '🗓️' },
                            { label: 'Share', bgClass: 'bg-[#1A3Ff5]', emoji: '🖥️' }
                        ].map(({ label, bgClass, emoji }) => (
                            <button key={label} onClick={() => handleClick(label)} className={`rounded-md ${bgClass} p-3 font-bold hover:bg-[#1e3f70]`}>
                                <span className="text-lg">{emoji} </span>
                                {label}
                            </button>
                        ))}
                    </div>
                    {/* nav bar */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around mt-50 bg-[#121212] rounded-lg border-t border-[#333] py-3 px-4" >
                        <div className="flex flex-col items-center">
                            <span>🏠</span>
                            <span className="text-sm">Home</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>💬</span>
                            <span className="text-sm">Chat</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>📧</span>
                            <span className="text-sm">Mail</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>📅</span>
                            <span className="text-sm">Calendar</span>
                        </div>
                    </div>
                </div>
            )
        } else if (currentStepIndex === 1) {
            return (
                <div className="relative flex flex-col bg-[#1c1c1e] rounded-xl w-80 h-[500px] pb-20 p-5 font-sans text-white overflow-hidden mx-auto">
                    {/* status bar */}
                    <div className="flex justify-between mb-4 text-xs font-bold">
                        <span>9:24</span>
                        <span>📶 🔋</span>
                    </div>
                    {/* header */}
                    <div className="grid grid-cols-3 items-center text-md">
                        <button onClick={() => handleClick('Cancel')} className="justify-self-start">Cancel</button>
                        <span className="font-bold justify-self-center whitespace-nowrap">Join Meeting</span>
                        <div></div>
                    </div>
                    {/* meeting id enter */}
                    <div className="my-4">
                        <p className="text-xs text-white font-bold mb-1">Meeting ID</p>
                        <p className="text-white bg-[#888] w-68">123 4567 8910</p>
                    </div>
                    {/* join button */}
                    <div className="">
                        <button onClick={() => handleClick('Join')} className="rounded-md bg-[#1A3Ff5] p-2 px-30 font-bold hover:bg-[#1e3f70]">
                            Join
                        </button>
                    </div>
                </div>
            )
        } else if (currentStepIndex === 2) {
            return (
                <div className="relative flex flex-col bg-[#1c1c1e] rounded-xl w-80 h-[500px] font-sans text-white overflow-hidden mx-auto">
                    {/* status bar */}
                    <div className=" absolute top-0 left-0 right-0 flex justify-between px-5 pt-3 text-xs font-bold z-20">
                        <span>9:24</span>
                        <span>📶 🔋</span>
                    </div>
                    {/* screen background, blurry background titles */}
                    <div className="absolute inset-0 bg-[#1c1c1e]">
                        <div className="absolute top-4 left-4 w-32 h-24 bg-[#2d2d2d] rounded-lg blur-sm" />
                        <div className="absolute top-4 right-4 w-32 h-24 bg-[#3a3a3a] rounded-lg blur-sm" />
                        <div className="absolute bottom-20 left-8 w-40 h-28 bg-[#2a2a2a] rounded-lg blur-sm" />
                    </div>
                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />

                    {/* modal */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#2c2c23]/95 rounded-lg w-64 overflow-hidden">
                        <p className="text-white text-center font-bold px-6 pt-5 pb-4">
                            To hear others please join audio
                        </p>
                        <div className="border-t border-[#444]">
                            <button onClick={() => handleClick('Wi-Fi or cellular data')} className="w-full py-3 text-[#3b82f6] text-center border-b border-[#444]">
                                Wi-Fi or cellular data
                            </button>
                            <button onClick={() => handleClick('No Audio')} className="w-full py-3 text-[#3b82f6] text-center">
                                No Audio
                            </button>
                        </div>
                    </div>
                    {/* nav bar */}
                    {/* nav bar */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-[#1c1c1e] rounded-lg border-t border-[#333] py-3 px-2 text-xs" >
                        <div className="flex flex-col items-center gap-1">
                            <span>🎥</span>
                            <span className="text-sm">Start Video</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span>💬</span>
                            <span className="text-sm">Chat</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span>...</span>
                            <span className="text-sm">More</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span>❌</span>
                            <span className="text-sm">End</span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-center max-w-xs font-medium">
                {currentStep.instruction}
            </p>

            <div className="relative flex flex-col bg-[#1c1c1e] rounded-xl w-80 h-[500px] font-sans text-white overflow-hidden mx-auto">

                {renderCurrentScreen()}

                {showFeedback && (
                    <div className={`absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 z-30 ${isCorrect ? 'bg-green-500/30' : 'bg-red-500/20'}`}>
                        <div className={`rounded-xl px-4 py-3 mb-3 w-full text-center text-sm font-medium ${isCorrect ? 'bg-green-600/90 text-white' : 'bg-red-500/90 text-white'}`}>
                            {feedbackText}
                        </div>
                        {isCorrect && (
                            <button onClick={handleNext} className="bg-white text-green-700 font-bold px-6 py-2 rounded-lg text-sm">
                                {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next Step'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

