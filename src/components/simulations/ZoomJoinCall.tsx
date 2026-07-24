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
        setHasAnswered(true);
    };

    const handleNext = () => {
        if (currentStepIndex === steps.length - 1) {
            setIsComplete(true);
        } else {
            setCurrentStepIndex(currentStepIndex + 1);
            setHasAnswered(false);
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
                        ].map(({label, bgClass, emoji}) => (
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
        }
    }

    return (
        <div> 
            <p>
                {currentStep.instruction}
            </p>

            {renderCurrentScreen()}

            {hasAnswered && (
                <div>
                    <p>
                        {feedbackText}
                    </p>
                    {isCorrect && (
                        <button onClick={handleNext}>
                            {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next Step'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

