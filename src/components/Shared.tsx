import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Lightbulb, GraduationCap, BookOpen, Layers } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ReadingMaterialProps {
  simple: string;
  analogy: string;
  technical: string;
  example: string;
  takeaway: string;
}

export const ReadingMaterial: React.FC<ReadingMaterialProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-blue-400">
          <BookOpen size={20} />
          <span className="font-semibold uppercase tracking-wider text-sm">Read More: Deep Dive</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6 text-slate-300">
              <section>
                <h4 className="flex items-center gap-2 text-white font-medium mb-2">
                  <Lightbulb size={16} className="text-yellow-400" /> Simple Explanation
                </h4>
                <p className="text-sm leading-relaxed">{props.simple}</p>
              </section>

              <section>
                <h4 className="flex items-center gap-2 text-white font-medium mb-2">
                  <Layers size={16} className="text-blue-400" /> Real-Life Analogy
                </h4>
                <p className="text-sm leading-relaxed italic">{props.analogy}</p>
              </section>

              <section>
                <h4 className="flex items-center gap-2 text-white font-medium mb-2">
                  <GraduationCap size={16} className="text-purple-400" /> Technical Explanation
                </h4>
                <p className="text-sm leading-relaxed">{props.technical}</p>
              </section>

              <section>
                <h4 className="flex items-center gap-2 text-white font-medium mb-2">
                  <BookOpen size={16} className="text-green-400" /> Example
                </h4>
                <p className="text-sm border-l-2 border-green-500/50 pl-4 py-1 bg-green-500/5">{props.example}</p>
              </section>

              <section className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <h4 className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-1">Key Takeaway</h4>
                <p className="text-white text-sm font-medium">{props.takeaway}</p>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ModuleHeader: React.FC<{ title: string; current: number; total: number }> = ({ title, current, total }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Module {current} of {total}</span>
        <div className="h-1 bg-white/10 w-32 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500" 
            initial={{ width: 0 }}
            animate={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
    </div>
  );
};

export const TeacherNote: React.FC<{ children: React.ReactNode; active: boolean }> = ({ children, active }) => {
  if (!active) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-24 w-80 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 p-4 rounded-xl shadow-2xl z-50 pointer-events-none md:pointer-events-auto"
    >
      <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest mb-3">
        <div className="p-1 bg-yellow-500 rounded text-black"><GraduationCap size={14} /></div>
        Teacher Mode ON
      </div>
      <div className="text-slate-200 text-sm space-y-3">
        {children}
      </div>
    </motion.div>
  );
};
