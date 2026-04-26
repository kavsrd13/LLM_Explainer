import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Zap, ArrowRight, Brain, Settings, Database } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";

export const TrainingInference: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Training vs Inference" current={12} total={16} />

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Training Side */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <GraduationCap size={120} />
           </div>
           
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg">
                <Database size={20} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Training Mode</h3>
           </div>

           <div className="space-y-6 relative z-10">
              <p className="text-sm text-slate-400 leading-relaxed">
                The model is "studying" billions of pages of text to find patterns. It learns how words relate to each other.
              </p>

              <div className="bg-black/30 rounded-2xl p-6 border border-white/5 space-y-4">
                 <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Training Exercise</div>
                 <div className="text-sm border-l-2 border-blue-500/50 pl-4 py-1">
                   "The sun rises in the <span className="text-blue-400 font-bold">___</span>"
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Target:</span>
                    <span className="text-green-400 font-bold text-xs uppercase px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">East</span>
                 </div>
                 <div className="text-[10px] text-slate-400 leading-tight">
                    * If it guesses "West", we calculate the error and update trillions of weights to do better next time.
                 </div>
              </div>

              <ul className="space-y-3">
                {[
                  "Expensive computing (GPUs)",
                  "Takes months to complete",
                  "Consumes massive data",
                  "Weights are updated (Backprop)"
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {t}
                  </li>
                ))}
              </ul>
           </div>
        </div>

        {/* Inference Side */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <Zap size={120} />
           </div>

           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-600 rounded-xl text-white shadow-lg">
                <Brain size={20} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Inference Mode</h3>
           </div>

           <div className="space-y-6 relative z-10">
              <p className="text-sm text-slate-400 leading-relaxed">
                The trained model is put to work. It uses the weight patterns it already learned to answer YOUR prompts.
              </p>

              <div className="bg-black/30 rounded-2xl p-6 border border-white/5 space-y-4">
                 <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest">User Interaction</div>
                 <div className="text-sm border-l-2 border-orange-500/50 pl-4 py-1">
                   "Explain gravity like I'm five."
                 </div>
                 <ArrowRight className="mx-auto text-orange-500 animate-pulse" />
                 <div className="text-[10px] text-slate-300 bg-white/5 p-2 rounded italic">
                   "It's like an invisible magnet pulling things to the floor!"
                 </div>
              </div>

              <ul className="space-y-3">
                {[
                  "Fast & efficient",
                  "Happens in real-time",
                  "Uses fixed patterns (No learning)",
                  "Model weights are locked"
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {t}
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/10 to-orange-600/10 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
         <div className="flex-1">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
              <Settings size={16} /> Key Distinction
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              When you chat with ChatGPT, you are using the model in <span className="text-white font-bold">Inference</span> mode. It is not currently "learning" from your prompt to update its core intelligence - it is simply applying what it learned during <span className="text-white font-bold">Training</span>.
            </p>
         </div>
         <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full border-4 border-slate-700 p-1 flex items-center justify-center">
               <div className="w-full h-full rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <span className="font-bold">IQ</span>
               </div>
            </div>
            <span className="text-[9px] uppercase font-black text-slate-500">Fixed Knowledge</span>
         </div>
      </div>

      <ReadingMaterial 
        simple="Training is the model learning from a massive dataset. Inference is the model answering a specific user question."
        analogy="Training is like a student studying for months to learn everything about medicine. Inference is when the student becomes a doctor and answers a patient's question in 5 minutes."
        technical="During training, gradients are computed and parameters are updated using optimizers like Adam. During inference, we perform a forward pass only (no backpropagation), often using specialized quantization to make it faster."
        example="GPT-4's training cost millions. Your individual chat costs a fraction of a cent."
        takeaway="AI models are trained once and used millions of times."
      />
    </div>
  );
};
