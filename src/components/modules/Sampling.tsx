import React, { useState } from "react";
import { motion } from "motion/react";
import { Filter, Zap, Target, MousePointer2, Info } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

export const Sampling: React.FC = () => {
  const [strategy, setStrategy] = useState<"greedy" | "topk" | "topp">("topk");
  const words = [
    { word: "mat", prob: 42, active: true },
    { word: "sofa", prob: 21, active: true },
    { word: "floor", prob: 18, active: true },
    { word: "chair", prob: 10, active: true },
    { word: "table", prob: 6, active: true },
    { word: "roof", prob: 3, active: true },
  ];

  const getFilteredWords = () => {
    if (strategy === "greedy") return words.map((w, i) => ({ ...w, active: i === 0 }));
    if (strategy === "topk") return words.map((w, i) => ({ ...w, active: i < 3 }));
    if (strategy === "topp") return words.map((w, i) => ({ ...w, active: i < 4 })); // Sums to ~91%
    return words;
  };

  const currentWords = getFilteredWords();
  const selectedWord = currentWords.find(w => w.active)?.word || "mat";

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Sampling Strategies" current={11} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-12">
           <div className="flex-1 space-y-8">
              <div className="space-y-4">
                 <h3 className="text-white font-bold text-lg mb-4">Select Decoding Method</h3>
                 <div className="space-y-3">
                   {[
                     { id: "greedy", label: "Greedy Decoding", desc: "Always choose the absolute best word.", icon: <Target size={16} /> },
                     { id: "topk", label: "Top-K Sampling", desc: "Choose from the top 3 most likely words.", icon: <Filter size={16} /> },
                     { id: "topp", label: "Top-P (Nucleus)", desc: "Choose from a group that sums to a probability score.", icon: <Zap size={16} /> }
                   ].map((item) => (
                     <button
                       key={item.id}
                       onClick={() => setStrategy(item.id as any)}
                       className={cn(
                         "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
                         strategy === item.id 
                          ? "bg-blue-600/10 border-blue-500 shadow-lg" 
                          : "bg-white/5 border-white/10 opacity-70 hover:opacity-100"
                       )}
                     >
                       <div className="flex items-center gap-4">
                          <div className={cn("p-2 rounded-lg bg-black/20", strategy === item.id ? "text-blue-400" : "text-slate-500")}>
                            {item.icon}
                          </div>
                          <div>
                             <div className="text-white font-bold text-sm tracking-tight">{item.label}</div>
                             <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{item.desc}</div>
                          </div>
                       </div>
                       {strategy === item.id && <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />}
                     </button>
                   ))}
                 </div>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-500/10 rounded-xl flex gap-4">
                 <Info size={20} className="text-blue-400 shrink-0 mt-1" />
                 <p className="text-xs text-slate-300 leading-relaxed italic">
                   {strategy === 'greedy' && "Greedy is fast but often leads to boring or repetitive sentences. It never takes risks."}
                   {strategy === 'topk' && "Top-K prevents the model from choosing complete nonsense by ignoring low-probability tail words."}
                   {strategy === 'topp' && "Top-P is dynamic (Nucleus). It expands or shrinks the candidate pool based on how confident the model is."}
                 </p>
              </div>
           </div>

           <div className="md:w-80 space-y-6">
              <div className="bg-black/40 border border-white/5 rounded-3xl p-6 h-full flex flex-col">
                 <h4 className="text-[10px] font-black uppercase text-slate-500 mb-6 tracking-widest text-center">Selection Pool</h4>
                 <div className="flex-1 space-y-3">
                   {currentWords.map((w, i) => (
                     <motion.div 
                        key={w.word}
                        animate={{ opacity: w.active ? 1 : 0.2, x: w.active ? 0 : 10 }}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border text-sm transition-all relative overflow-hidden",
                          w.active ? "bg-blue-500/10 border-blue-500/30 text-white font-bold" : "bg-white/5 border-transparent text-slate-600 grayscale"
                        )}
                     >
                        <span className="flex items-center gap-2">
                           {w.active ? <CheckSquare size={14} className="text-blue-400" /> : <div className="w-3.5 h-3.5 border border-slate-700 rounded" />}
                           {w.word}
                        </span>
                        <span className="text-[10px] font-mono opacity-60">{w.prob}%</span>
                        
                        {w.active && i === 0 && strategy === 'greedy' && (
                          <div className="absolute right-0 top-0 text-[6px] bg-blue-500 px-1 font-black text-white rounded-bl">WINNER</div>
                        )}
                     </motion.div>
                   ))}
                 </div>

                 <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <div className="text-[10px] uppercase font-black text-slate-500 mb-2">Final Output Choice</div>
                    <motion.div 
                      key={selectedWord}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                    >
                      {selectedWord.toUpperCase()}
                    </motion.div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <ReadingMaterial 
        simple="Sampling is how the model actually chooses one word from the probability scores it calculated."
        analogy="Imagine a talent show. Greedy decoding only picks the person with the most votes. Top-K picks a random person from the top 3 best performers. Top-P picks from a group of people who together have 90% of the total votes."
        technical="Sampling methods like Top-K (filtering to top k logits) and Top-P (filtering to the smallest set of logits whose cumulative probability exceeds p) add diversity and 'human-like' randomness to the model's output."
        example="If 'mat' is 42% and 'sofa' is 21%, a Greedy model ALWAYS says 'mat'. A Top-K model might pick 'sofa' occasionally."
        takeaway="Decoding strategies determine the balance between accuracy and creativity."
      />
    </div>
  );
};

const CheckSquare: React.FC<{ size?: number; className?: string }> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
