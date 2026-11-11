import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RefreshCw, Send, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../../types';
import { learningService } from '../../services/learningService';

interface QuizCardProps {
  quizzes: QuizQuestion[];
  langSlug: string;
  tutorialSlug: string;
  onQuizCompleted?: (score: number, total: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quizzes,
  langSlug,
  tutorialSlug,
  onQuizCompleted,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!quizzes || quizzes.length === 0) return null;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await learningService.submitQuiz(langSlug, tutorialSlug, selectedAnswers);
      setResult(res);
      setSubmitted(true);
      if (onQuizCompleted) {
        onQuizCompleted(res.score, res.total);
      }
    } catch {
      // Local fallback calculation if offline
      let score = 0;
      const feedback = quizzes.map((q) => {
        const userAns = selectedAnswers[q.id];
        const isCorrect = userAns === q.correctAnswer;
        if (isCorrect) score++;
        return {
          id: q.id,
          userAnswer: userAns,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
        };
      });
      const total = quizzes.length;
      const percentage = Math.round((score / total) * 100);
      setResult({
        score,
        total,
        percentage,
        passed: percentage >= 60,
        feedback,
      });
      setSubmitted(true);
      if (onQuizCompleted) onQuizCompleted(score, total);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  const allAnswered = quizzes.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="mt-8 p-6 rounded-2xl bg-[#15171C] border border-[#272B35] shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-[#272B35] pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FF7900]" />
          <h3 className="font-bold text-base text-white">Interactive Concept Quiz</h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          {quizzes.length} Questions
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quizzes.map((q, qIndex) => {
          const feedbackItem = result?.feedback?.find((f: any) => f.id === q.id);

          return (
            <div key={q.id} className="p-4 rounded-xl bg-[#09090B]/60 border border-[#272B35]">
              <p className="text-sm font-semibold text-zinc-100 mb-3 flex items-start gap-2">
                <span className="text-[#168BFF] font-mono">{qIndex + 1}.</span>
                {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  let optionClass = 'bg-[#15171C] border-[#272B35] text-zinc-300 hover:border-zinc-500';

                  if (submitted) {
                    if (optIdx === q.correctAnswer) {
                      optionClass = 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-medium';
                    } else if (isSelected && optIdx !== q.correctAnswer) {
                      optionClass = 'bg-red-500/15 border-red-500 text-red-300';
                    } else {
                      optionClass = 'bg-[#15171C]/50 border-transparent text-zinc-500';
                    }
                  } else if (isSelected) {
                    optionClass = 'bg-[#FF7900]/15 border-[#FF7900] text-white font-medium shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${optionClass}`}
                    >
                      <span>{option}</span>
                      {submitted && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && optIdx !== q.correctAnswer && (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {submitted && feedbackItem && (
                <div className="mt-3 p-3 rounded-lg bg-[#15171C] border border-[#272B35] text-xs flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-white">Explanation: </span>
                    {feedbackItem.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Results / Submit Actions */}
      <div className="mt-6 pt-4 border-t border-[#272B35] flex flex-col sm:flex-row items-center justify-between gap-4">
        {submitted ? (
          <>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-xl border font-bold text-sm ${
                result?.passed ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400' : 'bg-red-500/15 border-red-500 text-red-400'
              }`}>
                Score: {result?.score} / {result?.total} ({result?.percentage}%) • {result?.passed ? 'PASSED 🎉' : 'KEEP PRACTICING 💪'}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Again
            </button>
          </>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className="text-xs text-zinc-400">
              {Object.keys(selectedAnswers).length} of {quizzes.length} answered
            </span>
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 disabled:opacity-40 transition-all flex items-center gap-2"
            >
              {submitting ? 'Checking...' : (
                <>
                  Submit Answers <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
