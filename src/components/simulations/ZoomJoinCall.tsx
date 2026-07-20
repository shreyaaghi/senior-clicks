import { useState } from 'react';

const steps = [
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
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [feedbackText, setFeedbackText] = useState(false);

    const currentStep = steps[currentStepIndex];
    const isLastStep = currentStepIndex === steps.length - 1;

    const handleButtonClick = (label: string) => {
        if (hasAnswered) return;
        setSelectedButton(label);
        setHasAnswered(true);
    };

    const handleNext = () => {
        if (isLastStep) {
            setIsComplete(true);
        } else {
            setCurrentStepIndex(currentStepIndex + 1);
            setSelectedButton(null);
            setHasAnswered(false);
        }
    };

    // const renderCurrentScreen = () => {
    //     switch(currentStepIndex) {
    //         case 0: return <ZoomHomeScreen onButtonClick={handleButtonClick} />;
    //         case 1: return <ZoomJoinScreen onButtonClick={handleButtonClick} />;
    //         case 2: return <ZoomAudioScreen onButtonClick={handleButtonClick} />;
    //     }
    // }

    if (isComplete) {
        return (
            <div>
                <p>You have successfully joined a Zoom call!</p>
            </div>
        );
    }

    return (
        <div> /* phone frame */
            <div> /* status bar */
                <div>/* header */
                    <div> /* icon grid */
                        <button onClick={() => handleButtonClick('Meet')}>Meet</button>
                        <button onClick={() => handleButtonClick('Join')}>Join</button>
                        <button onClick={() => handleButtonClick('Schedule')}>Schedule</button>
                        <button onClick={() => handleButtonClick('Share')}>Share</button>
                        <div> /* bottom nav bar */
            <p>Step {currentStepIndex + 1} of {steps.length}</p>
            <p>{currentStep.instruction}</p>

            {hasAnswered && (
                <div className="feedback-banner">
                    {feedbackText}
                </div>
            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

