import React, { useState } from "react";
import { motion } from "motion/react";
import { Network, Brain, Hash, Type, Ghost } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

export const MultiHeadAttention: React.FC = () => {
  const [activeHead, setActiveHead] = useState<"grammar" | "meaning" | "pronoun" | "position">("meaning");
  const tokens = ["The", "dog", "chased", "the", "cat", "because", "it", "was", "fast"];

  const heads = {
    grammar: { 
      label: "Grammar Head", 
      icon: <Type size={16} />, 
      color: "text-blue-400", 
      bg: "bg-blue-500/10",
      border: "border-blue-500/40",
      focus: [
        { from: 1, to: 2 }, // dog -> chased
        { from: 4, to: 2 }, // cat -> chased
        { from: 6, to: 7 }, // it -> was
      ]
    },
    meaning: { 
      label: "Meaning Head", 
      icon: <Brain size={16} />, 
      color: "text-green-400", 
      bg: "bg-green-500/10",
      border: "border-green-500/40",
      focus: [
        { from: 1, to: 4 }, // dog -> cat
        { from: 2, to: 8 }, // chased -> fast
      ]
    },
    pronoun: { 
      label: "Pronoun Head", 
      icon: <Ghost size={16} />, 
      color: "text-purple-400", 
      bg: "bg-purple-500/10",
      border: "border-purple-500/40",
      focus: [
        { from: 6, to: 1 }, // it -> dog
        { from: 6, to: 4 }, // it -> cat
      ]
    },
    position: { 
      label: "Position Head", 
      icon: <Hash size={16} />, 
      color: "text-orange-400", 
      bg: "bg-orange-500/10",
      border: "border-orange-500/40",
      focus: [
        { from: 0, to: 1 }, // The -> dog
        { from: 3, to: 4 }, // the -> cat
      ]
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Multi-Head Attention" current={8} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-white mb-2">Multiple Parallel Perspectives</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            LLMs run dozens of attention heads at once. Each head specializes in finding a certain type of pattern.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {(Object.keys(heads) as Array<keyof typeof heads>).map((type) => (
            <button
              key={type}
              onClick={() => setActiveHead(type)}
              className={cn(
                "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                activeHead === type 
                  ? `${heads[type].bg} ${heads[type].border} shadow-lg` 
                  : "bg-white/5 border-white/10 opacity-60 hover:opacity-100"
              )}
            >
              <div className={cn("p-2 rounded-lg bg-black/20", heads[type].color)}>
                {heads[type].icon}
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", activeHead === type ? heads[type].color : "text-slate-500")}>
                {heads[type].label}
              </span>
            </button>
          ))}
        </div>

        <div className="relative bg-black/60 border border-white/10 rounded-3xl p-12 min-h-[300px] flex items-center justify-center overflow-hidden">
           {/* Connection SVG */}
           <svg className="absolute inset-0 w-full h-full">
              {heads[activeHead].focus.map((link, i) => (
                <motion.path
                  key={`${activeHead}-${i}`}
                  d={`M ${10 + (link.from * 10)}% 50% Q ${10 + ((link.from + link.to) / 2 * 10)}% ${link.from < link.to ? 10 : 90}% ${10 + (link.to * 10)}% 50%`}
                  stroke="currentColor"
                  className={heads[activeHead].color}
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              ))}
           </svg>

           <div className="flex justify-between w-full z-10">
             {tokens.map((token, i) => {
               const isActive = heads[activeHead].focus.some(link => link.from === i || link.to === i);
               return (
                 <div 
                   key={i} 
                   className={cn(
                     "px-2 py-1 rounded-md text-[10px] md:text-sm font-mono transition-all",
                     isActive ? "bg-white/10 text-white font-bold scale-110 ring-1 ring-white/20" : "text-slate-600"
                   )}
                 >
                   {token}
                 </div>
               );
             })}
           </div>

           <div className="absolute bottom-6 right-8 flex items-center gap-2">
              <Network size={16} className="text-slate-600" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active Head Layer {tokens.length}xParallel</span>
           </div>
        </div>

        <div className="mt-8 bg-blue-600/5 border border-blue-500/20 p-6 rounded-2xl">
           <h4 className="text-white font-bold mb-2 flex items-center gap-2">
             <Brain size={18} className="text-blue-400" /> Insight: The Crowd Model
           </h4>
           <p className="text-sm text-slate-300 leading-relaxed italic">
             "Imagine the {heads[activeHead].label} is a specialist in the brain focusing strictly on {activeHead === 'grammar' ? 'how words fit together grammatically' : activeHead === 'pronoun' ? 'resolving who pronouns refer to' : activeHead === 'meaning' ? 'connecting core concepts' : 'maintaining the physical word distance'}. By combining all these experts, the model gets a rich, 3D understanding of text."
           </p>
        </div>
      </div>

      <ReadingMaterial 
        simple="LLMs use multiple attention heads. Different heads focus on different types of relationships at the same time."
        analogy="It is like watching a movie with four experts: a fashion expert looks at the clothes, a music expert listens to the soundtrack, a script expert follows the words, and a director looks at the cameras. Together, they see the whole story."
        technical="In Multi-Head Attention, the Queries, Keys, and Values are split into multiple subspaces. Each head has its own set of learnable linear projections (weights), allowing the model to jointly attend to information from different representation subspaces at different positions."
        example="One head might focus on connecting adjectives to nouns ('Red' -> 'Apple'), while another connects subjects to verbs ('John' -> 'Runs')."
        takeaway="Multi-head attention lets models multitask, understanding grammar, meaning, and references simultaneously."
      />
    </div>
  );
};
