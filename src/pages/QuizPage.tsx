import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, HelpCircle, Check, ChevronRight } from 'lucide-react';
import { useTraining } from '../context/TrainingContext';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { FullPageLoader } from '../components/common/CyberShieldLoader';

interface QuizPageProps {
  onNavigate: (path: string) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const { quizResult, submitQuiz, resetQuiz } = useTraining();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(() => {
    return quizResult ? quizResult.answers : {};
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewMode, setReviewMode] = useState(!!quizResult);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    if (reviewMode) return; // Prevent changing answers in review mode
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  
  const handleSubmit = async () => {
    if (answeredCount < totalQuestions) {
      const confirmIncomplete = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Unanswered questions will be scored as incorrect. Would you like to submit now?`
      );

      if (!confirmIncomplete) return;
    }

    setIsSubmitting(true);

    try {
      await submitQuiz(selectedAnswers);
      setReviewMode(true);
      onNavigate('/results');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';

      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    resetQuiz();
    setSelectedAnswers({});
    setCurrentIndex(0);
    setReviewMode(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] py-8 px-4 sm:px-6 lg:px-8">
      {isSubmitting && (
        <FullPageLoader
          message="Calculating Security Assessment..."
          submessage="Evaluating threat awareness answers against industry compliance standards"
        />
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Knowledge Evaluation</span>
              <span aria-hidden="true">·</span>
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[var(--accent-color)]">{currentQ.difficulty}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1">
              Interactive Cybersecurity Assessment
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Category: <strong className="text-[var(--text-primary)]">{currentQ.category}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {reviewMode ? (
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Assessment
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-xl shadow-xs transition-transform active:scale-98"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar & Jump Palette */}
        <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)] font-medium">
              Assessment Completion: <strong className="text-[var(--text-primary)] font-mono">{answeredCount}/{totalQuestions}</strong>
            </span>
            <span className="font-mono tabular-nums text-[var(--accent-color)] font-bold">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full bg-[var(--border-subtle)] h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(answeredCount / totalQuestions) * 100}%`,
                backgroundColor: 'var(--accent-color)',
              }}
            />
          </div>

          {/* Jump palette pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const isSelected = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              let statusStyle = 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)]';

              if (reviewMode && quizResult) {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;
                statusStyle = isCorrect
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-600 border-rose-500/30';
              } else if (isSelected) {
                statusStyle = 'bg-[var(--accent-soft)] text-[var(--accent-color)] border-[var(--accent-color)]/30 font-semibold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 text-xs rounded-lg border font-mono transition-transform hover:scale-105 ${statusStyle} ${
                    isCurrent ? 'ring-2 ring-[var(--accent-color)] ring-offset-1' : ''
                  }`}
                  aria-label={`Jump to question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question & Options Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[var(--accent-color)]">
              QUESTION {currentIndex + 1}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* 4 Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isChosen = selectedAnswers[currentQ.id] === optIdx;
              const isCorrectAnswer = optIdx === currentQ.correctIndex;

              let optionCardClass = 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)]';

              if (reviewMode) {
                if (isCorrectAnswer) {
                  optionCardClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200';
                } else if (isChosen && !isCorrectAnswer) {
                  optionCardClass = 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200';
                }
              } else if (isChosen) {
                optionCardClass = 'border-[var(--accent-color)] bg-[var(--accent-soft)] text-[var(--accent-color)] shadow-xs';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={reviewMode}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${optionCardClass} ${
                    !reviewMode ? 'cursor-pointer active:scale-99' : 'cursor-default'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChosen || (reviewMode && isCorrectAnswer)
                        ? 'bg-[var(--accent-color)] text-white border-transparent'
                        : 'bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>

                  <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                    {option}
                  </span>

                  {reviewMode && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {reviewMode && isChosen && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Review Mode Explanation Card */}
          {reviewMode && (
            <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[var(--accent-color)]" />
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  Forensic Security Rationale:
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate(`/learn/${currentQ.domainModuleId}`)}
                  className="text-xs font-semibold text-[var(--accent-color)] hover:underline inline-flex items-center gap-1"
                >
                  Review relevant module
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)] disabled:opacity-40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-lg shadow-xs"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Next Question
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              !reviewMode && (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-lg shadow-xs"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  Submit Assessment
                  <Check className="w-3.5 h-3.5" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};