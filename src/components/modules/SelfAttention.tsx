import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MousePointer2, Zap, Eye, Table, ArrowRight, Lightbulb } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

interface AttentionScore {
  targetIndex: number;
  word: string;
  score: number;
}

export const SelfAttention: React.FC = () => {
  const tokens = ["The", "dog", "chased", "the", "cat", "because", "it", "was", "fast"];
  const [selectedIdx, setSelectedIdx] = useState<number | null>(6); // Default select "it"

  // Simulated scores for the visualization
  const getAttentionScores = (idx: number | null): AttentionScore[] => {
    if (idx === null) return [];
    
    const word = tokens[idx].toLowerCase();
    
    if (word === "it") return [
      { targetIndex: 1, word: "dog", score: 0.65 },
      { targetIndex: 4, word: "cat", score: 0.25 },
      { targetIndex: 8, word: "fast", score: 0.10 }
    ];
    
    if (word === "chased") return [
      { targetIndex: 1, word: "dog", score: 0.45 },
      { targetIndex: 4, word: "cat", score: 0.45 },
      { targetIndex: 0, word: "The", score: 0.10 }
    ];

    if (word === "fast") return [
      { targetIndex: 6, word: "it", score: 0.70 },
      { targetIndex: 1, word: "dog", score: 0.20 }
    ];

    return tokens.map((t, i) => ({ targetIndex: i, word: t, score: i === idx ? 0 : 0.1 })).slice(0, 3);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="How AI Understands Context" current={7} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="text-center mb-10">
           <h3 className="text-2xl font-black text-white mb-3">The "Attention" Secret</h3>
           <p className="text-slate-400 text-sm max-w-xl mx-auto">AI doesn't just read words; it plays a game of <b>relationships</b>. Click a word to see which others help the AI understand its meaning.</p>
        </div>

        <div className="relative bg-black/40 border border-white/5 rounded-[40px] p-12 min-h-[450px] flex flex-col items-center justify-between shadow-2xl overflow-hidden">
           {/* Visual Lines/Arrows */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <defs>
               <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                 <polygon points="0 0, 10 3.5, 0 7" fill="rgba(234, 179, 8, 0.6)" />
               </marker>
             </defs>
             {selectedIdx !== null && getAttentionScores(selectedIdx).map((s, i) => {
                const step = 100 / (tokens.length - 1);
                const startX = 10 + (selectedIdx * step);
                const endX = 10 + (s.targetIndex * step);
                
                return (
                  <motion.path
                    key={`line-${selectedIdx}-${s.targetIndex}`}
                    d={`M ${startX}% 30% C ${startX}% 10%, ${endX}% 10%, ${endX}% 25%`}
                    stroke="rgba(234, 179, 8, 0.4)"
                    strokeWidth={s.score * 12}
                    fill="transparent"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                );
             })}
           </svg>

           {/* Word Circles */}
           <div className="w-full flex justify-between px-4 z-20 mt-12">
             {tokens.map((token, i) => {
               const isActive = selectedIdx === i;
               const scoreObj = getAttentionScores(selectedIdx).find(s => s.targetIndex === i);
               const isTarget = !!scoreObj;
               
               return (
                 <motion.button
                   key={i}
                   onClick={() => setSelectedIdx(i)}
                   className={cn(
                     "relative w-14 h-14 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center border transition-all group",
                     isActive 
                      ? "bg-yellow-500 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.4)]" 
                      : isTarget
                        ? "bg-yellow-500/10 border-yellow-500/50 shadow-inner"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                   )}
                   whileHover={{ y: -5 }}
                 >
                   <span className={cn(
                     "text-[10px] md:text-sm font-black transition-colors uppercase tracking-tight",
                     isActive ? "text-slate-900" : isTarget ? "text-yellow-400" : "text-slate-500"
                   )}>{token}</span>
                   
                   {isTarget && (
                     <div className="absolute -bottom-6 text-[10px] font-mono text-yellow-500 font-black">
                       {Math.round(scoreObj!.score * 100)}%
                     </div>
                   )}
                 </motion.button>
               );
             })}
           </div>

           {/* Explanation Card */}
           <div className="w-full mt-24 grid md:grid-cols-2 gap-6 z-10">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                 <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Table size={16} className="text-yellow-500" /> Focus Percentages
                 </h4>
                 <div className="space-y-4">
                    {getAttentionScores(selectedIdx).map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs text-slate-300 font-bold mb-1.5 uppercase">
                           <span>Relating to: "{s.word}"</span>
                           <span className="text-yellow-400">Strength: {Math.round(s.score * 100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${s.score * 100}%` }}
                             className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                           />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                    <Lightbulb size={120} />
                 </div>
                 <div className="flex items-center gap-2 text-yellow-500 mb-4">
                    <Zap size={20} className="fill-yellow-500" />
                    <h4 className="font-black text-lg uppercase tracking-tight">The AI Result</h4>
                 </div>
                 <p className="text-sm text-slate-200 leading-relaxed font-medium">
                   {selectedIdx === 6 
                     ? "To understand the word 'it', the AI looks back and finds that 'dog' is the main topic. It ignores smaller words like 'the' to find the real meaning."
                     : selectedIdx === 8
                     ? "The word 'fast' points strongly to 'it' (the dog). This helps the AI connect an action or state to the right subject."
                     : "Every word in the sentence acts like a little magnet, pulling information from other words to build a complete picture of the story."}
                 </p>
              </div>
           </div>
        </div>

        {/* QKV Simplified */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch gap-4">
           {[
             { label: "Query", q: "What am I looking for?", color: "blue", desc: "The search request." },
             { label: "Key", q: "What is my role?", color: "purple", desc: "The matching label." },
             { label: "Value", q: "What info do I have?", color: "green", desc: "The actual meaning." }
           ].map((item, i) => (
             <div key={i} className="flex-1 p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between">
                <div>
                   <div className={`text-[10px] font-black uppercase text-${item.color}-400 mb-1`}>{item.label}</div>
                   <div className="text-sm text-white font-bold">{item.q}</div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 italic">{item.desc}</div>
             </div>
           ))}
        </div>
      </div>

      <ReadingMaterial 
        simple="Self-attention is like a person reading a sentence and highlighting the most important words. When AI sees the word 'it', it quickly highlights 'dog' so it knows what you're talking about."
        analogy="Imagine a group of friends. When someone says 'He is over there', everyone's eyes move to look at the person being talked about. Attention is how the AI's digital eyes 'look' at related words."
        technical="Math-wise, the model multiplies vectors of information. High multiplication results mean high 'attention'. This allows the model to handle long-range dependencies where a word at the beginning of a page relates to one at the end."
        example="In 'The chef cooked a meal and it was delicious', the AI uses attention to connect 'it' to 'meal' and 'delicious' to 'meal'."
        takeaway="Attention is what makes AI understand context, instead of just reading a list of random words."
      />
    </div>
  );
};

