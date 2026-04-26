import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, PenTool, Languages } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";

export const Architecture: React.FC = () => {
  const [selected, setSelected] = useState<"encoder" | "decoder" | "both">("decoder");

  const variants = {
    encoder: {
      title: "The Reader (Encoder)",
      desc: "This model reads a whole piece of text and tries to understand its meaning. It doesn't write back; it just categorizes or explains what it saw.",
      example: "Rating a movie review as 'Happy' or 'Sad'.",
      flow: "Input Text → Deep Understanding → Categorization"
    },
    decoder: {
      title: "The Writer (Decoder)",
      desc: "This is what powers ChatGPT! It takes what you typed and starts 'writing' a response, one word at a time, based on everything that came before.",
      example: "Writing a bedtime story or a code snippet.",
      flow: "Your Prompt → Prediction → Word by Word Generation"
    },
    both: {
      title: "The Translator (Both)",
      desc: "One part reads and understands (Reader), and the second part uses that understanding to write in another form or language (Writer).",
      example: "Translating English to Hindi.",
      flow: "English Draft → Understanding → Hindi Output"
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="How AI is Built" current={1} total={16} />
      
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {(Object.keys(variants) as Array<keyof typeof variants>).map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              selected === type 
              ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
              : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className={`mb-4 w-10 h-10 rounded-xl flex items-center justify-center ${selected === type ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
              {type === "encoder" && <BookOpen size={20} />}
              {type === "decoder" && <PenTool size={20} />}
              {type === "both" && <Languages size={20} />}
            </div>
            <h3 className="font-bold text-white mb-1">{variants[type].title}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{type === 'decoder' ? 'Most Common' : 'Specialized Use'}</p>
          </button>
        ))}
      </div>

      <motion.div 
        key={selected}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">{variants[selected].title}</h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl">{variants[selected].desc}</p>
        </div>

        <div className="relative py-12 px-4 border border-white/5 rounded-2xl bg-black/20 flex flex-col md:flex-row items-center justify-center gap-8 text-center overflow-hidden">
          <div className="z-10 bg-slate-800 border border-white/20 p-4 rounded-xl min-w-[140px]">
            <div className="text-[10px] text-slate-400 uppercase font-black mb-1">Step 1</div>
            <div className="text-white font-medium text-sm">Human Text</div>
          </div>

          <ArrowRight className="text-blue-500 animate-pulse hidden md:block" />

          <div className="z-10 bg-blue-600/20 border border-blue-500/50 p-6 rounded-2xl min-w-[160px] shadow-[0_0_30px_rgba(37,99,235,0.1)]">
            <div className="text-[10px] text-blue-300 uppercase font-black mb-1 text-center">AI Processing</div>
            <div className="text-white font-bold">{selected === 'encoder' ? 'Understanding' : selected === 'decoder' ? 'Generating' : 'Translating'}</div>
          </div>

          <ArrowRight className="text-purple-500 animate-pulse hidden md:block" />

          <div className="z-10 bg-purple-600/20 border border-purple-500/50 p-4 rounded-xl min-w-[140px]">
            <div className="text-[10px] text-purple-300 uppercase font-black mb-1">Final Result</div>
            <div className="text-white font-medium text-sm">{selected === 'encoder' ? 'Clear Answer' : 'New Sentence'}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
             <div className="text-[10px] font-black text-slate-500 mb-2 uppercase tracking-tighter">Real World Example</div>
             <div className="text-sm text-slate-200">{variants[selected].example}</div>
          </div>
          <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
             <div className="text-[10px] font-black text-slate-500 mb-2 uppercase tracking-tighter">The Journey</div>
             <div className="text-sm text-slate-200 font-medium italic">{variants[selected].flow}</div>
          </div>
        </div>
      </motion.div>

      <ReadingMaterial 
        simple="Think of the AI as having different 'modes'. One mode is for reading and grading (Reader), another is for creative writing (Writer), and another is for speaking multiple languages (Translator)."
        analogy="A 'Reader' model is like a judge who reads a book and decides if it's good or bad. A 'Writer' model is the author who actually writes the book word by word."
        technical="Encoders (like BERT) use all-word context to understand nuance. Decoders (like GPT) are 'autoregressive', meaning they use previous output to decide the next word."
        example="When you ask ChatGPT a question, it uses its 'Writer' (Decoder) part to generate the answer for you."
        takeaway="Most AI you use today (like ChatGPT or Gemini) are primarily 'Writer' models."
      />
    </div>
  );
};

