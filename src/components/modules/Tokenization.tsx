import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scissors, Play, RefreshCw, Type } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

export const Tokenization: React.FC = () => {
  const [input, setInput] = useState("The dog is playing in the garden.");
  const [mode, setMode] = useState<"word" | "subword">("subword");
  const [tokens, setTokens] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const wordTokenize = (text: string) => {
    return text.split(/(\s+)/).filter(t => t.trim().length > 0);
  };

  const subwordTokenize = (text: string) => {
    // Simulated subword tokenization
    const words = text.split(/\s+/);
    let result: string[] = [];
    words.forEach(word => {
      if (word.toLowerCase() === "unbelievable") result.push("un", "##believ", "##able");
      else if (word.toLowerCase().includes("playing")) result.push("play", "##ing");
      else if (word.length > 7) result.push(word.substring(0, 4), "##" + word.substring(4));
      else result.push(word);
    });
    return result;
  };

  const runTokenization = () => {
    setIsAnimating(true);
    setTokens([]);
    
    setTimeout(() => {
      const result = mode === "word" ? wordTokenize(input) : subwordTokenize(input);
      setTokens(result);
      setIsAnimating(false);
    }, 500);
  };

  // Run on first load
  useEffect(() => {
    runTokenization();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Tokenization Lab" current={2} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Interactive Input</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a sentence..."
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && runTokenization()}
              />
              <button 
                onClick={runTokenization}
                disabled={isAnimating}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                {isAnimating ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} />}
                Tokenize
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-black/20 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Strategy:</span>
              <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                <button 
                  onClick={() => setMode("word")}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === "word" ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Word
                </button>
                <button 
                  onClick={() => setMode("subword")}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === "subword" ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Subword
                </button>
              </div>
            </div>
            
            <div className="h-8 w-[1px] bg-white/10" />
            
            <div className="flex items-center gap-4">
               <div className="text-center">
                 <div className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Total Tokens</div>
                 <div className="text-xl font-mono text-blue-400 font-bold">{tokens.length}</div>
               </div>
               <div className="text-center">
                 <div className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Efficiency</div>
                 <div className="text-xl font-mono text-green-400 font-bold">~{Math.round(tokens.length / input.split(' ').length * 100) / 100}x</div>
               </div>
            </div>
          </div>

          <div className="min-h-[120px] bg-black/40 rounded-2xl p-6 border border-blue-500/10 flex flex-wrap gap-2 items-center justify-center relative overflow-hidden">
             {/* Decorative Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
             
             <AnimatePresence mode="popLayout">
               {tokens.map((token, i) => (
                 <motion.div
                   key={token + i}
                   initial={{ scale: 0, opacity: 0, y: 10 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   exit={{ scale: 0, opacity: 0 }}
                   transition={{ delay: i * 0.05, type: 'spring' }}
                   className={cn(
                     "px-3 py-1.5 rounded-lg border text-sm font-mono font-medium shadow-sm",
                     token.startsWith("##") 
                      ? "bg-purple-500/20 border-purple-500/40 text-purple-300" 
                      : "bg-blue-500/20 border-blue-500/40 text-blue-300"
                   )}
                 >
                   {token}
                 </motion.div>
               ))}
             </AnimatePresence>
             
             {tokens.length === 0 && !isAnimating && (
               <div className="text-slate-500 italic text-sm">Waiting for input...</div>
             )}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
           <div className="bg-white/5 p-4 rounded-xl border border-white/5">
             <div className="flex items-center gap-2 text-blue-400 mb-2">
               <Scissors size={16} />
               <span className="text-xs font-bold uppercase">Pro Tip</span>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed">
               Try typing <span className="text-white">"unbelievable playing"</span> to see how subword tokenization splits complex words!
             </p>
           </div>
           
           <div className="bg-white/5 p-4 rounded-xl border border-white/5">
             <div className="flex items-center gap-2 text-yellow-400 mb-2">
               <Type size={16} />
               <span className="text-xs font-bold uppercase">Why it matters</span>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed">
               More tokens = more computation and more cost. Efficient tokenizers help models process more information faster.
             </p>
           </div>
        </div>
      </div>

      <ReadingMaterial 
        simple="AI models can't actually 'read' text the way humans do. Imagine you have a loaf of bread—you have to slice it into pieces before you eat it. Tokenization is the process of slicing human sentences into tiny, bite-sized pieces that the AI's digital brain can handle."
        analogy="Think of it like Scrabble tiles. Instead of looking at a whole word like 'UNBELIEVABLE', the AI might see 'UN', 'BELIEVE', and 'ABLE'."
        technical="Tokenization is the prep-step where characters are grouped into meaningful strings. Most modern models use 'Subword' tokenization, which helps the model understand new or complex words by looking at their internal structure (like prefixes and suffixes)."
        example="'Learning is fun!' → 'Learn', '##ing', 'is', 'fun', '!'"
        takeaway="By breaking words down, AI can understand millions of word combinations using just a small list of 'parts'."
      />
    </div>
  );
};
