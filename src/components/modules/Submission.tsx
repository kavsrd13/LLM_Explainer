import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2, ChevronRight, GraduationCap, Github, Loader2 } from "lucide-react";
import ReactConfetti from "react-confetti";
import { ReportPayload, StudentInfo, QuizAnswer } from "@/src/types";

interface SubmissionProps {
  studentInfo: StudentInfo;
  completedModules: string[];
  quizScore: number;
  totalQuestions: number;
  answers: QuizAnswer[];
  timeSpentSeconds: number;
}

export const Submission: React.FC<SubmissionProps> = (props) => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <ReactConfetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} gravity={0.05} />

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-center relative overflow-hidden backdrop-blur-xl">
         {/* Decorative Background */}
         <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         
         <motion.div 
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="relative z-10"
         >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
               <CheckCircle2 size={48} className="text-white" />
            </div>

            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Lab Complete!</h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-12">
               Congratulations! You have successfully completed all modules and the final quiz in the LLM Explorer Lab.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
               <div className="bg-black/30 border border-white/5 p-8 rounded-3xl group hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4 text-blue-400">
                    <GraduationCap size={24} />
                    <h3 className="font-bold uppercase tracking-widest text-xs">Achievement</h3>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">Explorer</div>
                  <div className="text-sm text-slate-500 font-medium">Beginner AI Engineer Graduate</div>
               </div>

               <div className="bg-black/30 border border-white/5 p-8 rounded-3xl group hover:border-green-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4 text-green-400">
                    <Award size={24} />
                    <h3 className="font-bold uppercase tracking-widest text-xs">Final Quiz Score</h3>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{props.quizScore} / {props.totalQuestions}</div>
                  <div className="text-sm text-slate-500 font-medium">Correctly Answered</div>
               </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5">
                <p className="text-slate-500 text-sm italic mb-6">
                  Great work, <span className="text-white font-bold">{props.studentInfo.name}</span>! You're ready to explore the world of AI.
                </p>
                <div className="flex flex-col items-center gap-6">
                  <div className="bg-green-500/10 text-green-500 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-green-500/20">
                     Verified Completion
                  </div>

                  <div className="max-w-md bg-white/5 border border-white/10 p-6 rounded-3xl mt-4">
                    <p className="text-slate-300 text-sm mb-4">Enjoyed this interactive lab? Please consider rating the project on GitHub to help others find it!</p>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#24292f] hover:bg-[#1b1f23] text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg group"
                    >
                      <Github size={20} />
                      Star on GitHub
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform opacity-50" />
                    </a>
                  </div>
                </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
};
