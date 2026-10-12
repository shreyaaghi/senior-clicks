import { useState } from 'react';

type QuizOption = {
  id: string;
  option_text: string;
  is_correct: boolean;
  feedback_text: string;
};

type QuizQuestion = {
  id: string;
  question_text: string;
  quiz_options: QuizOption[];
};

type PracticeScenarioProps = {
  questions: QuizQuestion[];
};

export default function PracticeScenario({ questions }: PracticeScenarioProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  if (!questions || questions.length === 0) {
    return <p className="text-sc-gray text-sm">No questions available yet.</p>;
  }
  
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const selectedOption = currentQuestion.quiz_options.find(o => o.id === selectedOptionId);


  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    setSelectedOptionId(null);
    setHasAnswered(false);
  }

  const getButtonStyle = (option: QuizOption) => {
    if(!hasAnswered) {
      return 'bg-white border-2 border-sc-light text-sc-darkest hover:border-sc-navy hover:bg-sc-light';
    }
    if (option.id === selectedOptionId) {
      return option.is_correct ? 'bg-green-50 border-2 border-green-500 text-green-800' : 'bg-red-50 border-2 border-red-400 text-red-800';
    }
    if (option.is_correct && hasAnswered) {
      return 'bg-green-50 border-2 border-green-500 text-green-800';
    }
    return 'bg-white border-2 border-sc-light text-sc-gray opacity-50';
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sc-darkest text-lg font-semibold leading-snug">{currentQuestion.question_text}</p>

      <ul className="flex flex-col gap-3">
        {currentQuestion.quiz_options.map((option) => (
          <li key={option.id}>
            <button className={`w-full text-left px-5 py-4 rounded-xl text-base font-medium transition-colors ${getButtonStyle(option)}`} 
            onClick={() => handleSelectOption(option.id)}>{option.option_text}</button>
          </li>
        ))}
      </ul>
      {hasAnswered && selectedOption && (
        <div className={`rounded-xl px-5 py-4 text-sm ${selectedOption.is_correct ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>{selectedOption.feedback_text}</div>
      )}

      {hasAnswered && (
        isLastQuestion ? (
        <p className="text-sc-navy font-lexend font-semibold text-center">Finished, good job!</p>
      ) : (
        <button onClick={handleNext} className="self-start bg-sc-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-sc-dark transition-colors">Next Question</button>
        )
      )}
    </div>
  );
}