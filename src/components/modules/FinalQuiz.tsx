import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Award, RefreshCw, ChevronRight } from "lucide-react";
import { ModuleHeader } from "../Shared";
import { QuizAnswer } from "@/src/types";
import { cn } from "@/src/lib/utils";

interface Question {
  id: string;
  q: string;
  options: string[];
  correct: number;
}

interface FinalQuizProps {
  onComplete: (score: number, answers: QuizAnswer[]) => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const questions: Question[] = [
    { id: "q1", q: "What is tokenization?", options: ["Changing colors of words", "Breaking text into smaller units called tokens", "Deleting spaces between words", "Drawing pictures of text"], correct: 1 },
    { id: "q2", q: "Why are Subword tokenizers used?", options: ["They are faster to type", "To handle long or rare words efficiently", "They make tokens smaller", "They only work for English"], correct: 1 },
    { id: "q3", q: "What is a 'vector' in LLMs?", options: ["A fast vehicle", "A list of numbers representing meaning", "A way to delete data", "The name of a robot"], correct: 1 },
    { id: "q4", q: "In embedding space, 'Dog' is closer to:", options: ["Car", "Puppy", "Pizza", "Bridge"], correct: 1 },
    { id: "q5", q: "Positional encoding helps the model:", options: ["Count words", "Know the order of words", "Choose font size", "Connect to the internet"], correct: 1 },
    { id: "q6", q: "Self-Attention allows a model to:", options: ["Focus on itself", "Resolve references like 'it' using context", "Ignore input text", "Translate without reading"], correct: 1 },
    { id: "q7", q: "What does 'Multi-Head Attention' mean?", options: ["The model has 4 physical heads", "Multiple attention processes run in parallel", "The model is very smart", "The model reads multiple sentences"], correct: 1 },
    { id: "q8", q: "Which part of the Transformer block 'refines' patterns?", options: ["Tokenizer", "Feed-Forward Network", "Embeddings", "Input Cable"], correct: 1 },
    { id: "q9", q: "A 'Decoder' model is typically used for:", options: ["Sorting emails", "Generating text like a chatbot", "Reading barcodes", "Editing photos"], correct: 1 },
    { id: "q11", q: "A 'Low Temperature' setting makes the model:", options: ["Stop working", "More predictable and conservative", "Extremely creative", "Run faster"], correct: 1 },
    { id: "q12", q: "Greedy decoding always picks:", options: ["The highest probability word", "A random word", "The shortest word", "The last word"], correct: 0 },
    { id: "q13", q: "What happens during 'Training'?", options: ["Model weights are updated to learn", "The user chats with model", "The model is deleted", "The internet is turned off"], correct: 0 },
    { id: "q14", q: "Multimodal embeddings can link 'dog' text to a:", options: ["Space rocket", "Barking sound", "Pizza recipe", "Math equation"], correct: 1 },
    { id: "q15", q: "Inference mode means the model is:", options: ["Learning new concepts", "Locked and answering user prompts", "Updating its weights", "Going to sleep"], correct: 1 }
  ];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    
    const q = questions[currentIdx];
    const newAnswer: QuizAnswer = {
      questionId: q.id,
      question: q.q,
      selectedAnswer: q.options[idx],
      correctAnswer: q.options[q.correct],
      isCorrect: idx === q.correct
    };
    
    setAnswers([...answers, newAnswer]);
  };

  const next = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      setIsFinished(true);
      const score = answers.reduce((acc, curr) => acc + (curr.isCorrect ? 1 : 0), 0);
      onComplete(score, answers);
    }
  };

  const current = questions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Final Knowledge Quiz" current={15} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="flex justify-between items-center mb-10">
           <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
              Question {currentIdx + 1} of {questions.length}
           </div>
           <div className="flex gap-1">
              {questions.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-3 h-1.5 rounded-full transition-all",
                    i < currentIdx ? "bg-green-500" : i === currentIdx ? "bg-blue-500 w-6" : "bg-white/10"
                  )} 
                />
              ))}
           </div>
        </div>

        <div className="mb-10">
           <h2 className="text-2xl font-bold text-white leading-tight">{current.q}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
           {current.options.map((option, i) => (
             <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={cn(
                  "p-6 rounded-2xl border-2 text-left transition-all relative flex flex-col gap-2 group",
                  selected === i 
                    ? (i === current.correct ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10")
                    : (selected !== null && i === current.correct ? "border-green-500/50 bg-green-500/5 opacity-60" : "bg-white/5 border-white/5 hover:border-white/20")
                )}
             >
                <div className="flex justify-between items-center w-full">
                  <span className={cn("text-sm font-medium", selected === i ? (i === current.correct ? 'text-green-400' : 'text-red-400') : 'text-slate-200')}>
                    {option}
                  </span>
                  {selected === i && (i === current.correct ? <CheckCircle2 size={24} className="text-green-500" /> : <XCircle size={24} className="text-red-500" />)}
                  {selected !== null && i === current.correct && i !== selected && <CheckCircle2 size={20} className="text-green-500/60" />}
                </div>
             </button>
           ))}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex justify-end"
            >
               <button 
                 onClick={next}
                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl group"
               >
                 {currentIdx === questions.length - 1 ? "Finish Lab" : "Next Question"}
                 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
