import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, ChevronLeft, GraduationCap, Github, Home, Info, 
  Settings, Brain, MessageSquare, Scissors, Hash, MoveHorizontal, 
  Layers, Network, BarChart3, Zap, Database, HelpCircle, Award, Layout, Menu, X, CheckCircle2, RefreshCw
} from "lucide-react";
import { cn } from "./lib/utils";

// Modules
import { Welcome } from "./components/modules/Welcome";
import { Architecture } from "./components/modules/Architecture";
import { Tokenization } from "./components/modules/Tokenization";
import { Vocabulary } from "./components/modules/Vocabulary";
import { Embeddings } from "./components/modules/Embeddings";
import { Multimodal } from "./components/modules/Multimodal";
import { PositionalEncoding } from "./components/modules/PositionalEncoding";
import { SelfAttention } from "./components/modules/SelfAttention";
import { MultiHeadAttention } from "./components/modules/MultiHeadAttention";
import { TransformerBlock } from "./components/modules/TransformerBlock";
import { NextWord } from "./components/modules/NextWord";
import { Sampling } from "./components/modules/Sampling";
import { TrainingInference } from "./components/modules/TrainingInference";
import { ScenarioQA } from "./components/modules/ScenarioQA";
import { FinalQuiz } from "./components/modules/FinalQuiz";
import { Submission } from "./components/modules/Submission";

import { StudentInfo, QuizAnswer } from "./types";
import { TeacherNote } from "./components/Shared";

const MODULES = [
  "Welcome",
  "Architecture",
  "Tokenization",
  "Vocabulary",
  "Embeddings",
  "Multimodal",
  "Position",
  "Attention",
  "Multi-Head",
  "Transformer",
  "Probabilities",
  "Sampling",
  "Training",
  "Scenarios",
  "Quiz",
  "Submission"
];

export default function App() {
  const [currentModule, setCurrentModule] = useState(0);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [teacherMode, setTeacherMode] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [quizResults, setQuizResults] = useState<{ score: number, answers: QuizAnswer[] } | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("llm_explorer_progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.studentInfo) setStudentInfo(parsed.studentInfo);
      if (parsed.completedModules) setCompletedModules(parsed.completedModules);
      if (parsed.currentModule) setCurrentModule(parsed.currentModule);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("llm_explorer_progress", JSON.stringify({
      studentInfo,
      completedModules,
      currentModule
    }));
  }, [studentInfo, completedModules, currentModule]);

  const handleStart = (info: StudentInfo) => {
    setStudentInfo(info);
    setCurrentModule(1);
    setStartTime(Date.now());
  };

  const handleNext = () => {
    if (!completedModules.includes(currentModule)) {
      setCompletedModules([...completedModules, currentModule]);
    }
    if (currentModule < MODULES.length - 1) {
      setCurrentModule(currentModule + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderModule = () => {
    switch (currentModule) {
      case 0: return <Welcome onStart={handleStart} />;
      case 1: return <Architecture />;
      case 2: return <Tokenization />;
      case 3: return <Vocabulary />;
      case 4: return <Embeddings />;
      case 5: return <Multimodal />;
      case 6: return <PositionalEncoding />;
      case 7: return <SelfAttention />;
      case 8: return <MultiHeadAttention />;
      case 9: return <TransformerBlock />;
      case 10: return <NextWord />;
      case 11: return <Sampling />;
      case 12: return <TrainingInference />;
      case 13: return <ScenarioQA />;
      case 14: return (
        <FinalQuiz onComplete={(score, answers) => {
          setQuizResults({ score, answers });
          handleNext();
        }} />
      );
      case 15: return quizResults && studentInfo ? (
        <Submission 
          studentInfo={studentInfo} 
          completedModules={MODULES.slice(0, 15)} 
          quizScore={quizResults.score} 
          totalQuestions={15} 
          answers={quizResults.answers} 
          timeSpentSeconds={Math.floor((Date.now() - startTime) / 1000)}
        />
      ) : <Welcome onStart={handleStart} />;
      default: return <Welcome onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#030014]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
            <Brain size={20} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black text-white tracking-widest uppercase">LLM Explorer</h1>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none mt-0.5">Advanced AI Lab</div>
          </div>
        </div>

        {/* Pipeline Progress Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-4 h-10 bg-white/5 rounded-full border border-white/10 overflow-hidden">
          {MODULES.map((m, i) => (
            <React.Fragment key={i}>
              <div 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  i === currentModule ? "bg-blue-500 scale-150 shadow-[0_0_10px_#3b82f6]" : 
                  i < currentModule ? "bg-green-500" : "bg-white/10"
                )}
                title={m}
              />
              {i < MODULES.length - 1 && <div className="w-1.5 h-[1px] bg-white/5" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors hidden md:block">Teacher Mode</span>
             <div 
               onClick={() => setTeacherMode(!teacherMode)}
               className={cn(
                 "w-10 h-5 rounded-full transition-all relative flex items-center px-1 border border-white/10",
                 teacherMode ? "bg-blue-600" : "bg-white/5"
               )}
             >
               <motion.div 
                 animate={{ x: teacherMode ? 20 : 0 }}
                 className="w-3 h-3 bg-white rounded-full shadow-md" 
               />
             </div>
          </label>
          
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderModule()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Control Bar */}
      {studentInfo && currentModule > 0 && currentModule < MODULES.length - 1 && (
        <footer className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6 pointer-events-none">
           <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
              <button 
                onClick={handleBack}
                disabled={currentModule <= 1}
                className="group flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl text-white font-bold hover:bg-white/10 disabled:opacity-0 transition-all"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Previous Step
              </button>

              <button 
                onClick={handleNext}
                className="group flex items-center gap-2 bg-blue-600 shadow-xl shadow-blue-600/20 px-10 py-3 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-blue-500 transition-all"
              >
                Continue Adventure
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </footer>
      )}

      {/* Side Navigation Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNavOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-l border-white/10 z-[70] p-8 shadow-2xl"
            >
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Lab Nav</h3>
                  <button onClick={() => setIsNavOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
               </div>

               <div className="space-y-2">
                 {MODULES.map((m, i) => (
                    <button
                      key={i}
                      disabled={!studentInfo && i > 0}
                      onClick={() => {
                        setCurrentModule(i);
                        setIsNavOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl border text-sm font-bold transition-all",
                        currentModule === i 
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg" 
                          : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                      )}
                    >
                      <span className="w-5 text-right font-mono text-[10px] opacity-40">{i.toString().padStart(2, '0')}</span>
                      {m}
                      {completedModules.includes(i) && <CheckCircle2 size={14} className="ml-auto text-green-500" />}
                    </button>
                 ))}
               </div>

               <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase text-red-400 hover:text-red-300 transition-colors"
                  >
                    <RefreshCw size={14} /> Clear Lab Progress
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Teacher Mode Helper (Floating Panel) */}
      <TeacherNote active={teacherMode}>
         {currentModule === 1 && (
           <>
              <p>Ask students: "Why do we use specific architectures for specific tasks?"</p>
              <div className="text-[10px] bg-slate-900 border border-white/10 p-2 rounded">
                 Common Misconception: Thinking all LLMs are exactly the same. Clarify that architecture is the 'brain structure' optimized for use cases.
              </div>
           </>
         )}
         {currentModule === 2 && (
           <>
              <p>Prompt students to type names or complex words like 'Flabbergasted'.</p>
              <div className="text-[10px] bg-slate-900 border border-white/10 p-2 rounded">
                Discussion: Why not just use characters? (Too many steps) or Words? (Dictionary too big). Subwords are the golden middle.
              </div>
           </>
         )}
         {currentModule === 7 && (
           <>
              <p>Ask: "Which word should 'it' pay attention to in the sentence?"</p>
              <p className="text-[10px] text-yellow-500/80">Goal: Understand disambiguation.</p>
           </>
         )}
         {currentModule === 10 && (
           <>
              <p>Experiment with high temperature. "What happens to the probabilities?"</p>
              <p className="text-[10px] text-yellow-500/80 italic underline font-bold">Try setting Temp to 1.5 and look at the tail words.</p>
           </>
         )}
      </TeacherNote>
    </div>
  );
}
