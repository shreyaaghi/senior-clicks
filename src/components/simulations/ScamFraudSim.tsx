import { useState, useEffect } from 'react';

type Step = {
    instruction: string;
    correctTarget: string;
    feedbackCorrect: string;
    feedbackIncorrect: { [key: string]: string };
}

const steps: Step[] = [
    {
        instruction: "You just received this text message. What do you do?",
        correctTarget: 'delete-lookup',
        feedbackCorrect: "Perfect. Deleting the suspicious text and looking up the real number yourself is always the safest move.",
        feedbackIncorrect: {
            "call": "Scammers use fake numbers that look official. Never call a number from an unexpected text. Always look up the real one yourself.",
            "reply": "Replying confirms your number is active, which leads to more scam attempts. Avoid engaging.",
            "delete": "Deleting is a safe move, but taking the extra step to look up Medicare.gov yourself is even better, in case it is real.",
        }
    },
    {
        instruction: "You received this email. What do you do?",
        correctTarget: 'go-direct',
        feedbackCorrect: "Exactly. Always go directly to the real website yourself instead of clicking a link in an email.",
        feedbackIncorrect: {
            "click": "This is a phishing email. Clicking the link could install malware or steal your login information.",
            "reply": "Replying to phishing emails confirms your address is active, and may cause more scam attempts. Avoid engaging.",
            "delete": "Deleting is safe, but going to amazon.com directly is an even better way to make sure your account is actually fine.",
        }
    },
    {
        instruction: "You get this phone call. What do you do?",
        correctTarget: 'hangup',
        feedbackCorrect: "Exactly right. The IRS never calls demanding immediate payment or gift cards. This is one of the most common phone scams targeting seniors.",
        feedbackIncorrect: {
            "listen": "Staying on the line gives scammers more time to pressure and manipulate you.",
            "credit-card": "Never give payment information to an unsolicited caller. The IRS sends oficial letters and do not call demanding immediate payment.",
            "gift-cards": "The IRS never asks for gift card payments. This is a classic scam technique.",
        }
    },
]

export default function ScamFraudSim() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const currentStep = steps[currentStepIndex];

    const handleClick = (target: string) => {
        if (isCorrect) return;
        const correct = target === currentStep.correctTarget;
        setIsCorrect(correct);
        setFeedbackText(
            correct ? currentStep.feedbackCorrect : currentStep.feedbackIncorrect[target]
        )
        setShowFeedback(true);
        if (!correct) {
            setTimeout(() => setShowFeedback(false), 2500);
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
            <div className="flex flex-col items-center gap-4 p-8 text-center">
                <p className="font-bold">Great work!</p>
                <p className="max-w-sm text-black">You know how to spot and handle common scams. When in doubt, don't click, don't call back, and don't give out any personal information.</p>
            </div>
        );
    }

    const renderChoiceButtons = (choices: { label: string; target: string }[]) => (
        <div className="flex flex-col gap-2 w-full mt-4">
          {choices.map(({ label, target }) => (
            <button
              key={target}
              onClick={() => handleClick(target)}
              className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium border border-gray-200"
            >
              {label}
            </button>
          ))}
        </div>
      );

    const renderCurrentScreen = () => {
        if (currentStepIndex === 0) {
            return (
                <div className="flex flex-col bg-white rounded-xl w-80 mx-auto overflow-hidden border-2">
                    {/* imessage header */}
                    <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200">
                        <button className="text-blue-500 text-sm"></button>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs mb-1">?</div>
                            <span className="text-xs text-gray-600">(347) 291-8823</span>
                        </div>
                        <button className="text-blue-500 text-sm"></button>
                    </div>
                    {/* message thread */}
                    <div className="bg-white px-4 py-6 min-h-[180px]">
                        <div className="flex justify-start">
                            <div className="bg-gray-200 rounded-lg px-4 py-3 max-w-[85%]">
                                <p className="text-sm text-gray-800">
                                    MEDICARE ALERT: Your benefits are expiring. Call 1-800-291-8823 immediately to avoid losing coverage. Act now.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* text input bar */}
                    <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-t border-gray-200">
                        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400 border border-gray-300">
                            iMessage
                        </div>
                        <button className="text-blue-500">↑</button>
                    </div>
                    {/* choice buttons */}
                    <div className="px-4 pb-4">
                        {renderChoiceButtons([
                            {label: 'Call the number in the text', target: 'call'},
                            {label: 'Reply to ask if it\'s real', target: 'reply'},
                            {label: 'Delete the text', target: 'delete'},
                            {label: 'Delete it and look up Medicare.gov myself', target: 'delete-lookup'},
                        ])}
                    </div>
                </div>
            )
        } else if (currentStepIndex === 1) {
            return (
                <div className="flex flex-col bg-white rounded-xl w-80 mx-auto overflow-hidden border-2">
                    {/* email header */}
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">From: security@amaz0n-accounts.com</p>
                        <p className="font-bold text-sm text-gray-800">Your Amazon account has been locked</p>
                    </div>

                    {/* email body */}
                    <div className="px-4 py-4 min-h-[180px]">
                        <p className="text-sm text-gray-700 mb-3">Dear Customer,</p>
                        <p className="text-sm text-gray-700 mb-3">We have detected unusual activity on your account. Your account has been temporarily locked for your protection.</p>
                        <p className="text-sm text-gray-700 mb-4">Please verify your identity immediately to restore access:</p>
                        <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded text-sm font-bold w-full">Verify My Account</button>
                    </div>

                    {/* choice buttons */}
                    <div className="px-4 pb-4">
                        {renderChoiceButtons([
                            { label: 'Click the link to verify my account', target: 'click' },
                            { label: 'Reply asking if it\'s real', target: 'reply' },
                            { label: 'Check my account on Amazon.com myself', target: 'go-direct' },
                            { label: 'Delete the email', target: 'delete' }
                        ])}
                    </div>
                </div>
            )
        } else if (currentStepIndex === 2) {
            return (
                <div className="flex flex-col bg-white rounded-xl w080 mx-auto overflow-hidden border-2">
                    {/* incoming call screen */}
                    <div className="bg-gray-900 px-4 py-8 flex flex-col items-center min-h-[220px]">
                        <p className="text-white font-bold text-sm mb-1">Incoming Call</p>
                        <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-2x1 mb-3">?</div>
                        <p className="text-white text-xl font-bold mb-1">IRS Tax Division</p>
                        <p className="text-gray-400 text-sm">(202) 555-0147</p>
                        <p className="text-gray-300 text-xs mt-4 text-center px-4">
                        "This is an urgent call from the IRS. You owe $2,847 in back taxes. To avoid arrest, you must pay immediately using gift cards."
                        </p>
                    </div>
                    {/* choice buttons */}
                    <div className="px-4 py-4">
                        {renderChoiceButtons([
                            { label: 'Stay on the line and listen', target: 'listen' },
                            { label: 'Hang up', target: 'hangup' },
                            { label: 'Give them my credit card number', target: 'credit-card' },
                            { label: 'Buy gift cards and call back', target: 'gift-cards' }
                        ])}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-center max-w-xs font-medium px-4">
                {currentStep.instruction}
            </p>

            <div className="relative w-80 mx-auto">
                {renderCurrentScreen()}

            {/* feedback */}
                {showFeedback && (
                    <div className={`absolute inset-0 flex flex-col items-end justify-end pb-4 px-4 rounded-xl ${isCorrect ? 'bg-green-500/30' : 'bg-red-500/20'}`}>
                        <div className={`rounded-xl px-4 py-3 mb-3 w-full text-center text-sm font-medium ${isCorrect ? 'bg-green-600/90 text-white' : 'bg-red-500/90 text-white'}`}>
                            {feedbackText}
                        </div>
                        {isCorrect && (
                            <button onClick={handleNext} className="w-full bg-white text-green-700 font-bold px-6 py-2 rounded-full text-sm">
                                {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next Scenario'}
                            </button>
                        )}
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-400 text-center max-w-xs px-4">
                Step {currentStepIndex + 1} of {steps.length}
            </p>
        </div>
    );
}

