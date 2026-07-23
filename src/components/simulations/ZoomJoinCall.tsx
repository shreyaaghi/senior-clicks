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
        if (hasAnswered) return;
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
                <div className="flex bg-[#1c1c1e] rounded-xl w-80 p-5"
                style ={{
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}>
                    <div style = {{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        marginBottom: '16px'
                    }}>
                        <span>9:24</span>
                        <span>📶 🔋</span>
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

