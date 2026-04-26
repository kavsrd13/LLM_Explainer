import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BarChart3, Cloud, Layout, Play, RefreshCw, Thermometer } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

export const NextWord: React.FC = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [temperature, setTemperature] = useState(0.7);

  const basePredictions = [
    { word: "mat", prob: 42 },
    { word: "sofa", prob: 21 },
    { word: "floor", prob: 18 },
    { word: "chair", prob: 10 },
    { word: "table", prob: 6 },
    { word: "roof", prob: 3 },
  ];

  // Adjust probabilities based on temperature
  const getAdjustedProbs = () => {
    if (temperature < 0.4) {
      // Conservative
      return [
        { word: "mat", prob: 75 },
        { word: "sofa", prob: 15 },
        { word: "floor", prob: 5 },
        { word: "chair", prob: 3 },
        { word: "table", prob: 2 },
        { word: "roof", prob: 0 },
      ];
    }
    if (temperature > 1.2) {
      // Creative / Chaos
      return [
        { word: "mat", prob: 25 },
        { word: "sofa", prob: 20 },
        { word: "floor", prob: 18 },
        { word: "chair", prob: 15 },
        { word: "table", prob: 12 },
        { word: "spaceship", prob: 10 },
      ];
    }
    return basePredictions;
  };

  const currentProbs = getAdjustedProbs();

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => setIsPredicting(false), 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Next-Word Prediction" current={10} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-8 mb-10">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 mb-3 tracking-widest">
              <Layout size={14} /> Model Context (Prompt)
           </div>
           <div className="text-2xl font-medium text-white flex items-center gap-3">
              The cat sat on the <div className="w-24 h-8 bg-blue-500/20 border-2 border-dashed border-blue-500/40 rounded flex items-center justify-center text-blue-400 font-bold animate-pulse text-sm">____</div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Thermometer size={18} className="text-orange-400" /> Temperature
                </h3>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  temperature < 0.5 ? "bg-blue-500/20 text-blue-400" :
                  temperature < 1 ? "bg-orange-500/20 text-orange-400" :
                  "bg-red-500/20 text-red-400"
                )}>
                  {temperature < 0.5 ? "Conservative" : temperature < 1 ? "Balanced" : "Creative"}
                </span>
              </div>
              
              <div className="space-y-4">
                 <input 
                   type="range" 
                   min="0.1" 
                   max="1.5" 
                   step="0.1"
                   value={temperature}
                   onChange={e => setTemperature(parseFloat(e.target.value))}
                   className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                 />
                 <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                   <span>Low (Predictable)</span>
                   <span>High (Creative)</span>
                 </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                 <p className="text-xs text-slate-400 leading-relaxed italic">
                    {temperature < 0.5 
                      ? "The model is very confident and will likely choose the most obvious word." 
                      : temperature < 1 
                      ? "The model is weighing likely options but might pick something slightly varied."
                      : "The model is exploring many unlikely options, leading to creative or 'hallucinated' outputs."}
                 </p>
              </div>

              <button 
                onClick={handlePredict}
                disabled={isPredicting}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
              >
                {isPredicting ? <RefreshCw size={20} className="animate-spin" /> : <Play size={20} />}
                Generate Probabilities
              </button>
           </div>

           <div className="bg-black/30 border border-white/10 rounded-2xl p-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <BarChart3 size={16} className="text-blue-400" /> Probability Distribution
              </h4>
              <div className="space-y-5">
                 <AnimatePresence mode="popLayout">
                   {currentProbs.map((p, i) => (
                     <motion.div 
                       key={p.word}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.05 }}
                       className="space-y-1.5"
                     >
                        <div className="flex justify-between items-end">
                           <span className={cn("text-sm font-bold", i === 0 ? "text-blue-400" : "text-white")}>{p.word}</span>
                           <span className="text-[10px] font-mono text-slate-500">{p.prob}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${p.prob}%` }}
                             className={cn("h-full", i === 0 ? "bg-blue-500" : "bg-slate-600")}
                           />
                        </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 uppercase font-black text-[9px] tracking-tighter">
                   <Cloud size={14} /> Softmax Layer Output
                </div>
                <div className="text-[9px] font-mono text-blue-400">∑ P = 1.0</div>
              </div>
           </div>
        </div>
      </div>

      <ReadingMaterial 
        simple="The model does not 'know' the next word with certainty. It calculates a probability for every word in its dictionary."
        analogy="It is like a weather forecast. The forecaster says '60% chance of rain, 30% chance of clouds, 10% chance of sun'. The model does the same for words."
        technical="The final layer of the network produces raw scores (logits). These are passed through a Softmax function, which normalizes them into a probability distribution whose values sum to 1."
        example="The cat sat on the [mat: 0.42, floor: 0.18, sofa: 0.21, chair: 0.10, table: 0.06, roof: 0.03]"
        takeaway="Language generation is a game of probability, not certainty."
      />
    </div>
  );
};
