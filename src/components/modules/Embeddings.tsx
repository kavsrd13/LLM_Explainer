import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Network, Database, Brain, ArrowDown, Move, Layers, Target, Info } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

interface EmbeddingPoint {
  word: string;
  x: number;
  y: number;
  category: string;
  icon: string;
}

export const Embeddings: React.FC = () => {
  const points: EmbeddingPoint[] = [
    { word: "dog", x: 20, y: 30, category: "animal", icon: "🐕" },
    { word: "cat", x: 25, y: 35, category: "animal", icon: "🐈" },
    { word: "puppy", x: 18, y: 28, category: "animal", icon: "🐶" },
    { word: "kitten", x: 27, y: 32, category: "animal", icon: "🐱" },
    { word: "lion", x: 35, y: 40, category: "animal", icon: "🦁" },
    { word: "car", x: 80, y: 20, category: "vehicle", icon: "🚗" },
    { word: "bus", x: 75, y: 25, category: "vehicle", icon: "🚌" },
    { word: "van", x: 82, y: 27, category: "vehicle", icon: "🚐" },
    { word: "teacher", x: 15, y: 80, category: "people", icon: "👨‍🏫" },
    { word: "student", x: 20, y: 85, category: "people", icon: "🎓" },
    { word: "king", x: 60, y: 70, category: "royalty", icon: "👑" },
    { word: "queen", x: 65, y: 75, category: "royalty", icon: "👸" },
    { word: "pizza", x: 85, y: 85, category: "food", icon: "🍕" },
  ];

  const [hoveredPoint, setHoveredPoint] = useState<EmbeddingPoint | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const calculateSimilarity = (p1: EmbeddingPoint, p2: EmbeddingPoint) => {
    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    // Simulated cosine similarity
    return Math.max(0, 1 - dist / 110).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Vector Embedding Space" current={4} total={16} />

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative bg-black/40 border border-white/10 rounded-3xl p-8 aspect-square md:aspect-video overflow-hidden shadow-2xl">
            {/* Legend & Background lines */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute top-4 left-6 flex gap-4 text-[10px] font-bold uppercase tracking-wider">
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Meaning Axis X</div>
               <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500" /> Meaning Axis Y</div>
            </div>

            {/* Connecting lines for same category on hover */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {hoveredPoint && points.map((p, i) => {
                if (p.category === hoveredPoint.category && p.word !== hoveredPoint.word) {
                  return (
                    <motion.line
                      key={i}
                      x1={`${hoveredPoint.x}%`}
                      y1={`${hoveredPoint.y}%`}
                      x2={`${p.x}%`}
                      y2={`${p.y}%`}
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="1"
                      strokeDasharray="4 2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    />
                  );
                }
                return null;
              })}
            </svg>

            {/* Embedding Points */}
            <div className="relative w-full h-full">
              {points.map((p, i) => (
                <motion.div
                  key={p.word}
                  className="absolute"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: i * 0.05, type: 'spring' }}
                >
                  <button
                    onMouseEnter={() => {
                      setHoveredPoint(p);
                      setActiveCategory(p.category);
                    }}
                    onMouseLeave={() => {
                      setHoveredPoint(null);
                      setActiveCategory(null);
                    }}
                    className={cn(
                      "group relative flex items-center justify-center w-12 h-12 rounded-full border bg-white/5 transition-all",
                      activeCategory === p.category ? "scale-125 z-20 border-blue-500 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "border-white/10 hover:border-white/30",
                      hoveredPoint?.word === p.word && "z-30 ring-2 ring-white/50"
                    )}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{p.icon}</span>
                    <span className={cn(
                      "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap font-bold uppercase transition-all",
                      activeCategory === p.category ? "opacity-100 text-blue-400" : "opacity-40 text-slate-500"
                    )}>
                      {p.word}
                    </span>

                    {/* Proximity Indicator */}
                    {activeCategory === p.category && hoveredPoint?.word !== p.word && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[8px] px-1 rounded font-bold">
                        {calculateSimilarity(hoveredPoint!, p)}
                      </div>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-6 left-6 text-slate-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
              <Move size={12} /> Hover over icons to see relationships
            </div>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-white/5 border border-white/10 p-6 rounded-3xl h-full">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Target size={18} className="text-blue-400" /> Vector Space Analysis
              </h3>
              
              <AnimatePresence mode="wait">
                {hoveredPoint ? (
                  <motion.div 
                    key="info"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Active Concept</div>
                      <div className="flex items-center gap-2">
                         <span className="text-3xl">{hoveredPoint.icon}</span>
                         <div>
                            <div className="text-white font-bold leading-none">{hoveredPoint.word.toUpperCase()}</div>
                            <div className="text-[10px] text-blue-400 font-bold uppercase mt-1">{hoveredPoint.category}</div>
                         </div>
                      </div>
                    </div>

                    <div className="p-3 bg-black/20 rounded-xl border border-white/5 space-y-2">
                       <div className="text-[10px] text-slate-500 uppercase font-black">Vector Representation</div>
                       <div className="font-mono text-[9px] text-blue-300 break-all leading-tight">
                         [0.21, -0.44, 0.89, 0.12, -0.05, 0.67, ...]
                       </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase font-black">Context Insight</div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{hoveredPoint.word}" is most similar to other {hoveredPoint.category}s. The model positions them close together in space.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                     <Layers size={40} className="text-white/10 mb-4" />
                     <p className="text-xs text-slate-500 uppercase font-bold px-4">
                       Mapping relationships in high-dimensional space
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
         {[
           { label: "Semantic Proximity", desc: "Similar words are mathematically close.", icon: <Move size={16} />, color: "text-blue-400" },
           { label: "Dimensionality", desc: "Real LLMs use 1000s of dimensions.", icon: <Layers size={16} />, color: "text-purple-400" },
           { label: "Cosine Similarity", desc: "Measures the angle between vectors.", icon: <Info size={16} />, color: "text-green-400" }
         ].map((item, i) => (
           <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className={cn("flex items-center gap-2 mb-2", item.color)}>
                {item.icon}
                <span className="text-xs font-bold uppercase">{item.label}</span>
              </div>
              <p className="text-xs text-slate-400">{item.desc}</p>
           </div>
         ))}
      </div>

      <ReadingMaterial 
        simple="Token IDs are converted into vectors (lists of numbers). These vectors help the model represent the 'meaning' of words as locations in space."
        analogy="Think of a giant library. Books on 'Dogs' are stacked close to 'Puppies' and far from 'Spaceships'. The distance tells you how related the concepts are."
        technical="An Embedding layer maps each token ID to a dense vector of fixed size (e.g., 768 float values). During training, these vectors move in space to minimize error, effectively learning semantic relationships."
        example="If 'King' and 'Man' are close, and 'Queen' and 'Woman' are close, the model has learned the concept of gender!"
        takeaway="Embeddings turn language into geometry, allowing AI to 'calculate' meaning."
      />
    </div>
  );
};
