import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Lightbulb } from "lucide-react";
import { ModuleHeader } from "../Shared";
import { cn } from "@/src/lib/utils";

interface Scenario {
  id: string;
  topic: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const ScenarioQA: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const scenarios: Scenario[] = [
    {
      id: "s1",
      topic: "Tokenization",
      scenario: "You type 'artificial intelligence' into a simple tokenizer.",
      question: "Why might this text become multiple tokens?",
      options: [
        "To save space on the screen",
        "LLMs break common words into subwords to manage complex patterns",
        "The model doesn't understand long words",
        "It makes the sentence colorful"
      ],
      correctAnswer: "LLMs break common words into subwords to manage complex patterns",
      explanation: "Tokenization handles long or less common words by splitting them into subwords to maintain a manageable vocabulary size."
    },
    {
      id: "s2",
      topic: "Embeddings",
      scenario: "In an embedding graph, the words 'doctor' and 'hospital' appear very close to each other.",
      question: "What does this suggest about the model's understanding?",
      options: [
        "They both contain the letter 'o'",
        "They are semantically related and often appear in similar contexts",
        "The model made a mistake",
        "They have the same number of tokens"
      ],
      correctAnswer: "They are semantically related and often appear in similar contexts",
      explanation: "Proximity in vector space indicates conceptual relationship. The model has learned that doctors are frequently associated with hospitals."
    },
    {
      id: "s3",
      topic: "Multimodal Embeddings",
      scenario: "A user types 'dog playing in park' and the AI retrieves a photo of a golden retriever fetching a ball.",
      question: "How is this cross-modal search possible?",
      options: [
        "The image has a secret text file attached",
        "The model converts both text and images into vectors in the same coordinate space",
        "The AI is guessing based on common searches",
        "A human tagged every single photo"
      ],
      correctAnswer: "The model converts both text and images into vectors in the same coordinate space",
      explanation: "Multimodal embeddings map different formats into a shared space, allowing 'meaning' to connect text to visuals."
    },
    {
      id: "s4",
      topic: "Self-Attention",
      scenario: "Sentence: 'Riya gave Neha her notebook because she forgot hers.'",
      question: "Why is self-attention critical for understanding this sentence?",
      options: [
        "To count how many characters are in each name",
        "To decide who 'she' and 'her' refer to in the context",
        "To translate the sentence into French",
        "To make the names bold"
      ],
      correctAnswer: "To decide who 'she' and 'her' refer to in the context",
      explanation: "Self-attention resolves references (coreference resolution) by weighing the relationship between pronouns and nouns."
    },
    {
      id: "s5",
      topic: "Next-Word Prediction",
      scenario: "Prompt: 'The students opened their books and started to ____'",
      question: "Which word likely has the highest probability score?",
      options: ["swim", "sleep", "read", "fly"],
      correctAnswer: "read",
      explanation: "Based on billions of pages of training data, 'read' is the most statistically likely continuation for a classroom setting."
    }
  ];

  const current = scenarios[currentIdx];

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    setIsCorrect(option === current.correctAnswer);
  };

  const next = () => {
    setSelected(null);
    setIsCorrect(null);
    setCurrentIdx((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Scenario-Based Q&A" current={14} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <HelpCircle size={100} />
        </div>

        <div className="mb-8">
           <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
              <span className="p-1 px-2 bg-blue-500/20 rounded">Scenario {currentIdx + 1}</span>
              <span className="text-slate-600">/</span>
              {current.topic}
           </div>
           <h2 className="text-2xl font-bold text-white mb-4 italic">"{current.scenario}"</h2>
           <p className="text-lg text-slate-300 font-medium">{current.question}</p>
        </div>

        <div className="grid md:grid-cols-1 gap-3">
           {current.options.map((opt) => (
             <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={selected !== null}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all relative flex items-center justify-between group",
                  selected === opt 
                    ? (isCorrect ? "bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : "bg-red-500/10 border-red-500")
                    : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white-[0.07]"
                )}
             >
                <span className={cn(
                  "font-medium transition-colors",
                  selected === opt ? (isCorrect ? "text-green-400" : "text-red-400") : "text-slate-200"
                )}>
                  {opt}
                </span>

                {selected === opt && (
                  <div className={isCorrect ? "text-green-500" : "text-red-500"}>
                    {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  </div>
                )}
             </button>
           ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div 
               initial={{ opacity: 0, h: 0 }}
               animate={{ opacity: 1, h: "auto" }}
               className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10"
            >
               <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                 <Lightbulb size={16} /> Explanation
               </div>
               <p className="text-slate-300 text-sm leading-relaxed">{current.explanation}</p>
               
               <div className="mt-6 flex justify-end">
                  <button 
                    onClick={next}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
                  >
                    {currentIdx === scenarios.length - 1 ? "Revisit First" : "Next Scenario"}
                    <ArrowRight size={18} />
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
