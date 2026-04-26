import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Box, Cpu, RefreshCw, Layers, CheckCircle } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

export const TransformerBlock: React.FC = () => {
  const [view, setView] = useState<"beginner" | "advanced">("beginner");

  const steps = [
    { id: "tokens", label: "Input Tokens", desc: "Digital barcodes for words.", detail: "Batch of IDs [101, 2457, ...]" },
    { id: "embedding", label: "Embeddings + Position", desc: "Meaning + Word order.", detail: "Concatenated dense vectors" },
    { id: "attention", label: "Self-Attention", desc: "Contextual weighing.", detail: "Softmax(QK^T/sqrt(d))V" },
    { id: "norm1", label: "Add & Normalize", desc: "Keeping values stable.", detail: "LayerNorm(x + sublayer(x))" },
    { id: "ffn", label: "Feed-Forward", desc: "Pattern recognition.", detail: "ReLU/GELU activated Linear layers" },
    { id: "norm2", label: "Add & Normalize", desc: "Prep for next block.", detail: "Residual connection summation" },
    { id: "output", label: "Hidden State", desc: "The deep understanding.", detail: "Updated representation vector" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Transformer Block Flow" current={9} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="flex justify-between items-center mb-10">
           <h3 className="text-xl font-bold text-white">The Assembly Line</h3>
           <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setView("beginner")}
                className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", view === "beginner" ? "bg-blue-600 text-white" : "text-slate-500")}
              >
                Beginner
              </button>
              <button 
                onClick={() => setView("advanced")}
                className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", view === "advanced" ? "bg-blue-600 text-white" : "text-slate-500")}
              >
                Advanced
              </button>
           </div>
        </div>

        <div className="flex flex-col items-center gap-4 relative">
           {steps.map((step, i) => (
             <React.Fragment key={step.id}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={cn(
                    "w-full max-w-md p-5 rounded-2xl border transition-all relative overflow-hidden group",
                    i === 0 ? "bg-blue-600/10 border-blue-500/30" : 
                    i === steps.length - 1 ? "bg-green-600/10 border-green-500/30" :
                    "bg-white/5 border-white/10"
                  )}
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center font-bold text-slate-400 border border-white/5 group-hover:border-white/20 transition-colors">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold text-sm tracking-wide">{step.label}</h4>
                            {i === steps.length - 1 && <CheckCircle size={16} className="text-green-500" />}
                         </div>
                         <p className="text-xs text-slate-400 mt-0.5">{view === 'beginner' ? step.desc : step.detail}</p>
                      </div>
                   </div>
                   
                   {/* Background Glow */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
                </motion.div>
                
                {i < steps.length - 1 && (
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: 24 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-[2px] h-full bg-gradient-to-b from-blue-500/50 to-transparent" />
                    <ArrowDown size={14} className="text-blue-500/50 -mt-1" />
                  </motion.div>
                )}
             </React.Fragment>
           ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
               <RefreshCw size={24} />
            </div>
            <div>
               <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest text-purple-400">Repeated Layers</h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                 A typical LLM doesn't just pass through one block. It passes through <span className="text-white font-bold">12, 24, or even 96</span> of these identical blocks in sequence to build deep comprehension.
               </p>
            </div>
         </div>
         
         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
               <Layers size={24} />
            </div>
            <div>
               <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest text-blue-400">Residual Streams</h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                 The original information is "carried along" via Add & Normalize shortcuts, preventing the model from forgetting the original input tokens.
               </p>
            </div>
         </div>
      </div>

      <ReadingMaterial 
        simple="The Transformer is a sequence of blocks that refine the understanding of text."
        analogy="It is like an assembly line. At the first station, we get the parts (tokens). At the second, we add labels (embeddings). At the third, we check how parts fit together (attention). By the end, we have a finished product (output state)."
        technical="A Transformer block consists of two main components: Multi-Head Attention and a Position-wise Feed-Forward Network. Both are wrapped in residual connections followed by Layer Normalization."
        example="Input 'The' -> Pass through 12 blocks -> Output 'A vector predicting the next word'."
        takeaway="Modern AI is a tower of these blocks reaching high levels of abstraction."
      />
    </div>
  );
};
