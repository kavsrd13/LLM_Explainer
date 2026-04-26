import React from "react";
import { motion } from "motion/react";
import { Brain, ArrowRight, Sparkles } from "lucide-react";
import { StudentInfo } from "@/src/types";

interface WelcomeProps {
  onStart: (info: StudentInfo) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const handleStart = () => {
    onStart({ name: "Explorer", studentId: "Guest", email: "", className: "" });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(37,99,235,0.4)]"
        >
          <Brain size={40} className="text-white" />
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
          LLM Explorer:<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            How AI Reads and Writes
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Ever wondered how ChatGPT actually "thinks"? Welcome to the Lab. 
          We'll peel back the layers to see how AI turns human words into data and back again.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <h2 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
              <Sparkles size={14} /> The Goal
            </h2>
            <h3 className="text-2xl font-bold text-white mb-4">A Zero-Code AI Tutorial</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              This interactive lab is designed for everyone—no programming knowledge required. 
              You'll explore the interactive 3D concepts, play with word probabilities, 
              and see the "invisible" work that happens every time you send a prompt.
            </p>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
             <p className="text-xs text-blue-300 italic">
               "Think of this as a guided tour inside a digital brain."
             </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col">
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-tight">What you'll discover:</h3>
          <div className="space-y-4 flex-1">
             {[
               { title: "Slicing Words", desc: "How AI breaks text into smaller pieces called tokens." },
               { title: "Word Maps", desc: "How AI puts words in a 3D space to understand meaning." },
               { title: "The Art of Attention", desc: "How AI focuses on important words in a sentence." },
               { title: "Predicting the Future", desc: "How AI chooses the very next word to type." }
             ].map((item, i) => (
               <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-blue-400 shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>

          <button 
            onClick={handleStart}
            className="mt-10 w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group transition-all transform hover:-translate-y-1"
          >
            Enter the Lab
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

