import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LEARNING_MODULES } from '../data/learningModules';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { SIMULATOR_SCENARIOS } from '../data/simulatorScenarios';
import { QuizSubmissionResult, UserProgressState } from '../types';

interface TrainingContextType {
  completedModules: string[];
  markModuleComplete: (moduleId: string) => void;
  unmarkModule: (moduleId: string) => void;
  isModuleCompleted: (moduleId: string) => boolean;
  simulatorAnswers: Record<string, 'phishing' | 'legitimate' | 'unsure'>;
  recordSimulatorAnswer: (scenarioId: string, answer: 'phishing' | 'legitimate' | 'unsure') => void;
  resetSimulator: () => void;
  quizResult: QuizSubmissionResult | null;
  submitQuiz: (
  answers: Record<number, number>
) => Promise<QuizSubmissionResult>;
  resetQuiz: () => void;
  resetAllProgress: () => void;
  // Computed analytics
  stats: {
    modulesCompletedCount: number;
    modulesTotal: number;
    modulePercent: number;
    simulatorTestedCount: number;
    simulatorTotal: number;
    simulatorCorrectCount: number;
    simulatorAccuracyPercent: number;
    quizTaken: boolean;
    quizScorePercent: number;
    overallReadinessScore: number;
    rankTitle: string;
  };
}

const STORAGE_KEY = 'phishguard_training_progress_v1';

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    // Initial starting demo state with Module 1 marked to give immediate visual context, but fully modifiable
    return {
      completedModules: ['module-1'],
      simulatorAnswers: {
        'sim-1': 'phishing',
      },
      quizResult: null,
      securityStreakDays: 3,
      lastActive: new Date().toISOString(),
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  const markModuleComplete = (moduleId: string) => {
    setProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        lastActive: new Date().toISOString(),
      };
    });
  };

  const unmarkModule = (moduleId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedModules: prev.completedModules.filter((id) => id !== moduleId),
    }));
  };

  const isModuleCompleted = (moduleId: string) => {
    return progress.completedModules.includes(moduleId);
  };

  const recordSimulatorAnswer = (scenarioId: string, answer: 'phishing' | 'legitimate' | 'unsure') => {
    setProgress((prev) => ({
      ...prev,
      simulatorAnswers: {
        ...prev.simulatorAnswers,
        [scenarioId]: answer,
      },
      lastActive: new Date().toISOString(),
    }));
  };

  const resetSimulator = () => {
    setProgress((prev) => ({
      ...prev,
      simulatorAnswers: {},
    }));
  };

   
const submitQuiz = async (
  answers: Record<number, number>
): Promise<QuizSubmissionResult> => {
  let correctCount = 0;

  const categoryScores: Record<
    string,
    { correct: number; total: number }
  > = {};

  const weakCategoriesSet = new Set<string>();

  QUIZ_QUESTIONS.forEach((q) => {
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { correct: 0, total: 0 };
    }

    categoryScores[q.category].total += 1;

    if (answers[q.id] === q.correctIndex) {
      correctCount += 1;
      categoryScores[q.category].correct += 1;
    } else {
      weakCategoriesSet.add(q.category);
    }
  });

  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((correctCount / total) * 100);
  const completedAt = new Date().toISOString();

  const result: QuizSubmissionResult = {
    score: correctCount,
    total,
    percentage,
    passed: percentage >= 75,
    completedAt,
    answers,
    categoryScores,
    weakAreas: Array.from(weakCategoriesSet),
  };

  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error('Please sign in before saving your quiz history.');
  }

  const { error: saveError } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: userData.user.id,
      quiz_name: 'Phishing Awareness Quiz',
      score: correctCount,
      total_questions: total,
      answers,
    });

  if (saveError) {
    console.error('Could not save quiz attempt:', saveError);
    throw new Error(
      `Quiz history could not be saved: ${saveError.message}`
    );
  }

  setProgress((prev) => ({
    ...prev,
    quizResult: result,
    lastActive: completedAt,
  }));

  return result;
};


  const resetQuiz = () => {
    setProgress((prev) => ({
      ...prev,
      quizResult: null,
    }));
  };

  const resetAllProgress = () => {
    setProgress({
      completedModules: [],
      simulatorAnswers: {},
      quizResult: null,
      securityStreakDays: 1,
      lastActive: new Date().toISOString(),
    });
  };

  // Compute overall statistics
  const modulesTotal = LEARNING_MODULES.length;
  const modulesCompletedCount = progress.completedModules.length;
  const modulePercent = Math.round((modulesCompletedCount / modulesTotal) * 100);

  const simulatorTotal = SIMULATOR_SCENARIOS.length;
  const simulatorTestedCount = Object.keys(progress.simulatorAnswers).length;
  let simulatorCorrectCount = 0;
  SIMULATOR_SCENARIOS.forEach((scenario) => {
    const ans = progress.simulatorAnswers[scenario.id];
    if (ans) {
      const isCorrect = (scenario.isPhishing && ans === 'phishing') || (!scenario.isPhishing && ans === 'legitimate');
      if (isCorrect) simulatorCorrectCount += 1;
    }
  });

  const simulatorAccuracyPercent = simulatorTestedCount > 0 ? Math.round((simulatorCorrectCount / simulatorTestedCount) * 100) : 0;

  const quizTaken = !!progress.quizResult;
  const quizScorePercent = progress.quizResult ? progress.quizResult.percentage : 0;

  // Composite Readiness Score: 40% Modules, 30% Simulator, 30% Quiz
  let readiness = Math.round(modulePercent * 0.4 + (simulatorTestedCount > 0 ? simulatorAccuracyPercent * 0.3 : 0) + (quizTaken ? quizScorePercent * 0.3 : 0));
  if (readiness > 100) readiness = 100;

  let rankTitle = 'Recruit Guardian';
  if (readiness >= 90) rankTitle = 'Senior Security Sentinel';
  else if (readiness >= 75) rankTitle = 'Vigilant Cyber Defender';
  else if (readiness >= 50) rankTitle = 'Security Practitioner';
  else if (readiness >= 25) rankTitle = 'Awareness Cadet';

  return (
    <TrainingContext.Provider
      value={{
        completedModules: progress.completedModules,
        markModuleComplete,
        unmarkModule,
        isModuleCompleted,
        simulatorAnswers: progress.simulatorAnswers,
        recordSimulatorAnswer,
        resetSimulator,
        quizResult: progress.quizResult,
        submitQuiz,
        resetQuiz,
        resetAllProgress,
        stats: {
          modulesCompletedCount,
          modulesTotal,
          modulePercent,
          simulatorTestedCount,
          simulatorTotal,
          simulatorCorrectCount,
          simulatorAccuracyPercent,
          quizTaken,
          quizScorePercent,
          overallReadinessScore: readiness,
          rankTitle,
        },
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};
