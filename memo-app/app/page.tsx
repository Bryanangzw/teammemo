'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Zap, Briefcase, Rocket, ChevronRight, CheckCircle2 } from 'lucide-react';

type Question = {
  id: string;
  text: string;
  options: { label: string; value: string; next?: string; result?: string }[];
};

const questions: Question[] = [
  {
    id: 'budget',
    text: 'Does this require budget over $500?',
    options: [
      { label: 'Yes, significant budget needed', value: 'yes', next: 'founder_approval' },
      { label: 'No, or minimal budget', value: 'no', next: 'team_size' },
    ],
  },
  {
    id: 'founder_approval',
    text: 'Does this need Bryan & Melvin\'s sign-off?',
    options: [
      { label: 'Yes, founders must approve', value: 'yes', result: 'initiative' },
      { label: 'No, team can decide', value: 'no', result: 'project' },
    ],
  },
  {
    id: 'team_size',
    text: 'How many team members are needed?',
    options: [
      { label: 'Just me (solo execution)', value: 'solo', next: 'reversible' },
      { label: 'Multiple team members', value: 'team', result: 'project' },
    ],
  },
  {
    id: 'reversible',
    text: 'Can you complete it in a day or two?',
    options: [
      { label: 'Yes, quick execution', value: 'yes', result: 'quick' },
      { label: 'No, needs more time', value: 'no', result: 'project' },
    ],
  },
];

const memoTypes = {
  quick: {
    name: 'Quick Memo',
    description: 'For small tests, content ideas, minor improvements',
    time: '15 minutes',
    color: 'bg-green-500',
    icon: Zap,
  },
  project: {
    name: 'Project Memo',
    description: 'For campaigns, new offers, system builds, content series',
    time: '30-60 minutes',
    color: 'bg-blue-500',
    icon: Briefcase,
  },
  initiative: {
    name: 'Initiative Memo',
    description: 'For major launches, strategic pivots, new hires, significant investments',
    time: '2-4 hours',
    color: 'bg-red-500',
    icon: Rocket,
  },
};

export default function Home() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<string>('budget');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (option: { value: string; next?: string; result?: string }) => {
    setAnswers({ ...answers, [currentQuestion]: option.value });
    
    if (option.result) {
      setResult(option.result);
    } else if (option.next) {
      setCurrentQuestion(option.next);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion('budget');
    setAnswers({});
    setResult(null);
  };

  const goToForm = (type: string) => {
    router.push(`/memo/${type}`);
  };

  const question = questions.find(q => q.id === currentQuestion);

  if (result) {
    const memo = memoTypes[result as keyof typeof memoTypes];
    const Icon = memo.icon;
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className={`w-20 h-20 ${memo.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You need a {memo.name}</h2>
        <p className="text-gray-600 mb-2">{memo.description}</p>
        <p className="text-sm text-gray-500 mb-8">Estimated time: {memo.time}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => goToForm(result)}
            className={`${memo.color} text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
          >
            Start {memo.name}
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={resetQuiz}
            className="bg-gray-100 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Start Over
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or choose a different memo type:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(memoTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => goToForm(key)}
                className={`text-sm py-2 px-4 rounded-lg border-2 transition-colors ${
                  key === result 
                    ? 'border-gray-900 bg-gray-900 text-white' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const questionIndex = questions.findIndex(q => q.id === currentQuestion);
  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Finding the right memo</span>
          <span>Question {questionIndex + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.text}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group"
          >
            <span className="font-medium text-gray-700 group-hover:text-blue-700">
              {option.label}
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
          </button>
        ))}
      </div>

      {questionIndex > 0 && (
        <button
          onClick={() => {
            const prevQuestion = questions[questionIndex - 1];
            if (prevQuestion) setCurrentQuestion(prevQuestion.id);
          }}
          className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Go back
        </button>
      )}

      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-4">Or skip the quiz and choose directly:</p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(memoTypes).map(([key, type]) => (
            <button
              key={key}
              onClick={() => goToForm(key)}
              className="text-sm py-2 px-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
