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

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

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

  return (
    <div>
      <p>{currentQuestion.question_text}</p>
      <ul>
        {currentQuestion.quiz_options.map((option) => (
          <li key={option.id}>
            <button onClick={() => handleSelectOption(option.id)}>{option.option_text}</button>

            {hasAnswered && selectedOptionId === option.id && (<p>{option.feedback_text}</p>)}
          </li>
        ))}
      </ul>

      {hasAnswered && (
        isLastQuestion ? (
        <p>Finished, good job!</p>
      ) : (
        <button onClick={handleNext}>Next Question</button>
        )
      )}
    </div>
  );
}