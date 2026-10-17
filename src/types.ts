export type ThemeMode = 'creamy' | 'light' | 'dark';

export interface AccentColor {
  id: string;
  name: string;
  hex: string;
  hoverHex: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  termsAccepted: boolean;
  joinDate: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  callout?: {
    type: 'warning' | 'info' | 'tip';
    title: string;
    text: string;
  };
  example?: {
    title: string;
    type: 'phishing' | 'safe';
    from: string;
    subject: string;
    body: string;
    redFlags: string[];
  };
}

export interface LearningModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  overview: string;
  sections: ModuleSection[];
  takeaways: string[];
  practicePrompt: string;
}

export interface SimulatorScenario {
  id: string;
  scenarioNumber: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  senderName: string;
  senderEmail: string;
  replyTo?: string;
  returnPath?: string;
  dkimStatus: 'Pass' | 'Fail' | 'None';
  spfStatus: 'Pass' | 'Fail' | 'SoftFail';
  date: string;
  subject: string;
  previewSnippet: string;
  bodyText: string;
  bodyHtml?: string;
  links: {
    anchorText: string;
    displayUrl: string;
    destinationUrl: string;
    isDeceptive: boolean;
    explanation: string;
  }[];
  attachments?: {
    filename: string;
    size: string;
    isMalicious: boolean;
    note: string;
  }[];
  isPhishing: boolean;
  redFlags: string[];
  safeActions: string[];
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  domainModuleId: string;
}

export interface QuizSubmissionResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  answers: Record<number, number>;
  categoryScores: Record<string, { correct: number; total: number }>;
  weakAreas: string[];
}

export interface UserProgressState {
  completedModules: string[];
  simulatorAnswers: Record<string, 'phishing' | 'legitimate' | 'unsure'>;
  quizResult: QuizSubmissionResult | null;
  securityStreakDays: number;
  lastActive: string;
}
