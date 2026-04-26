import React, { useState } from "react";
import { motion, Reorder } from "motion/react";
import { ArrowRight, MoveHorizontal, Hash, AlertTriangle } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

interface TokenBlock {
  id: string;
  word: string;
}

export const PositionalEncoding: React.FC = () => {
  const [tokens, setTokens] = useState<TokenBlock[]>([
    { id: "1", word: "Dog" },
    { id: "2", word: "bites" },
    { id: "3", word: "man" },
    { id: "4", word: "." },
  ]);

  const meaningText = () => {
    const sequence = tokens.map(t => t.word.toLowerCase()).join(" ");
    if (sequence.includes("dog bites man")) return "A news story about an animal attack.";
    if (sequence.includes("man bites dog")) return "A very strange news story where a human attacks an animal!";
    return "The sentence is being reordered...";
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Positional Encoding" current={6} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="mb-10 text-center">
           <h3 className="text-xl font-bold text-white mb-2">Order Matters!</h3>
           <p className="text-slate-400 text-sm">Drag the tokens to reorder the sentence and see how position changes literal meaning.</p>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-12 mb-8 flex flex-col items-center justify-center gap-12 relative overflow-hidden">
           <div className="absolute top-4 left-6 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
             <MoveHorizontal size={14} /> Draggable Sequence
           </div>

           <Reorder.Group axis="x" values={tokens} onReorder={setTokens} className="flex gap-4">
             {tokens.map((token, index) => (
               <Reorder.Item 
                 key={token.id} 
                 value={token}
                 className="relative group cursor-grab active:cursor-grabbing"
               >
                 <motion.div 
                   className={cn(
                    "w-20 h-28 bg-gradient-to-b from-blue-600/20 to-blue-900/40 border border-blue-500/30 rounded-xl flex flex-col items-center justify-between p-3 transition-shadow group-hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]",
                    index === 0 && "border-l-4 border-l-blue-400"
                   )}
                 >
                   <div className="w-full flex justify-between items-center px-1">
                      <span className="text-[10px] font-mono text-blue-300">#{index}</span>
                      <Hash size={10} className="text-blue-500/50" />
                   </div>
                   
                   <span className="text-lg font-bold text-white group-hover:scale-110 transition-transform">{token.word}</span>
                   
                   <div className="w-full h-1 bg-blue-500/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-400"
                        style={{ width: `${((index + 1) / tokens.length) * 100}%` }}
                      />
                   </div>
                 </motion.div>
                 
                 {/* Position Label */}
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-blue-500 tracking-widest whitespace-nowrap">
                   Pos: {index}
                 </div>
               </Reorder.Item>
             ))}
           </Reorder.Group>

           <div className="mt-8 bg-blue-950/40 border border-blue-500/20 p-4 rounded-xl flex items-center gap-4 max-w-md">
              <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                <AlertTriangle size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-black text-blue-400 mb-1">Inferred Meaning</div>
                <div className="text-sm text-blue-100 font-medium">{meaningText()}</div>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center pt-8 border-t border-white/5">
           <div className="space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <div className="p-1 px-2 bg-blue-600 rounded text-xs font-mono">1</div>
                Word Embedding
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Represents the pure concept (e.g., "dog-ness"). This vector stays the same regardless of where the word is in the sentence.
              </p>

              <h4 className="text-white font-bold flex items-center gap-2">
                 <div className="p-1 px-2 bg-purple-600 rounded text-xs font-mono">2</div>
                 Position Vector
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                 A unique math pattern describing exactly WHERE the word is. Different for index 0, 1, 2, etc.
              </p>
           </div>

           <div className="bg-gradient-to-br from-slate-800 to-black p-6 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex flex-col items-center gap-3">
                 <div className="flex items-center gap-2 w-full">
                    <div className="flex-1 h-3 bg-blue-500/40 rounded flex items-center justify-center text-[7px] text-white font-bold">CONCEPT VECTOR</div>
                 </div>
                 <div className="text-white font-bold text-lg leading-none">+</div>
                 <div className="flex items-center gap-2 w-full">
                    <div className="flex-1 h-3 bg-purple-500/40 rounded flex items-center justify-center text-[7px] text-white font-bold">POSITION VECTOR</div>
                 </div>
                 <div className="w-full border-t border-white/20 pt-3 flex items-center gap-3">
                    <ArrowRight className="text-green-400 rotate-90" />
                    <div className="flex-1 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center shadow-lg border border-white/20 text-[10px] text-white font-bold tracking-widest">
                       FINAL INPUT EMBEDDING
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <ReadingMaterial 
        simple="Embeddings capture meaning, but word order also matters for the context of a sentence."
        analogy="Each word in a sentence is like a student in a classroom. 'Meaning' is who the student is, but 'Position' is where their desk is. The teacher needs to know both to manage the class!"
        technical="Unlike previous architectures (like RNNs), Transformers process tokens in parallel. To 'tell' the model the order, they use sinusoidal functions (sine and cosine) of different frequencies to add unique positional values to each embedding."
        example="'Dog bites man' vs 'Man bites dog'. Same words, but very different reality!"
        takeaway="Without positional encoding, the model would view every sentence as a 'bag of words' with no sequence."
      />
    </div>
  );
};
