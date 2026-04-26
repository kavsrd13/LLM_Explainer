import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image, FileText, Music, Video, Search, Link2 } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";
import { cn } from "@/src/lib/utils";

interface MultimodalNode {
  id: string;
  label: string;
  type: "text" | "image" | "audio" | "video";
  x: number;
  y: number;
  cluster: string;
}

export const Multimodal: React.FC = () => {
  const nodes: MultimodalNode[] = [
    // Dog Cluster
    { id: "t1", label: "A dog playing", type: "text", x: 20, y: 30, cluster: "dog" },
    { id: "i1", label: "Dog Image", type: "image", x: 25, y: 25, cluster: "dog" },
    { id: "a1", label: "Barking Sound", type: "audio", x: 18, y: 35, cluster: "dog" },
    // Cat Cluster
    { id: "t2", label: "Cat sleeping", type: "text", x: 70, y: 20, cluster: "cat" },
    { id: "i2", label: "Cat Image", type: "image", x: 75, y: 25, cluster: "cat" },
    { id: "a2", label: "Meow Sound", type: "audio", x: 72, y: 15, cluster: "cat" },
    // Vehicle Cluster
    { id: "t3", label: "Fast car", type: "text", x: 30, y: 70, cluster: "car" },
    { id: "i3", label: "Car Image", type: "image", x: 35, y: 75, cluster: "car" },
    { id: "a3", label: "Engine Sound", type: "audio", x: 28, y: 80, cluster: "car" },
    // Food Cluster
    { id: "t4", label: "Hot pizza", type: "text", x: 80, y: 80, cluster: "pizza" },
    { id: "i4", label: "Pizza Image", type: "image", x: 85, y: 75, cluster: "pizza" },
  ];

  const [search, setSearch] = useState("");
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text": return <FileText size={16} className="text-blue-400" />;
      case "image": return <Image size={16} className="text-green-400" />;
      case "audio": return <Music size={16} className="text-orange-400" />;
      case "video": return <Video size={16} className="text-purple-400" />;
      default: return null;
    }
  };

  const handleSearch = () => {
    const s = search.toLowerCase();
    if (s.includes("dog")) setActiveCluster("dog");
    else if (s.includes("cat")) setActiveCluster("cat");
    else if (s.includes("car")) setActiveCluster("car");
    else if (s.includes("piz")) setActiveCluster("pizza");
    else setActiveCluster(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Multimodal Embedding Space" current={5} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest px-1">Cross-Modal Search Demo</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Try 'dog playing' or 'fast car'..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20"
              >
                Find Now
              </button>
            </div>
          </div>
          
          <div className="md:w-64 grid grid-cols-2 gap-2">
             <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 flex flex-col items-center">
                <FileText size={16} className="text-blue-400 mb-1" />
                <span className="text-[9px] uppercase font-bold text-blue-300">Text Nodes</span>
             </div>
             <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 flex flex-col items-center">
                <Image size={16} className="text-green-400 mb-1" />
                <span className="text-[9px] uppercase font-bold text-green-300">Images</span>
             </div>
             <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 flex flex-col items-center">
                <Music size={16} className="text-orange-400 mb-1" />
                <span className="text-[9px] uppercase font-bold text-orange-300">Audio</span>
             </div>
             <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 flex flex-col items-center">
                <Video size={16} className="text-purple-400 mb-1" />
                <span className="text-[9px] uppercase font-bold text-purple-300">Video</span>
             </div>
          </div>
        </div>

        <div className="relative bg-black/40 border border-white/5 rounded-3xl p-12 aspect-square md:aspect-video overflow-hidden">
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
           
           {/* Cluster Connection Paths */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
             <AnimatePresence>
              {activeCluster && nodes.filter(n => n.cluster === activeCluster).map((node, i, arr) => {
                if (i === 0) return null;
                const prev = arr[i-1];
                return (
                  <motion.line
                    key={node.id}
                    x1={`${prev.x}%`} y1={`${prev.y}%`}
                    x2={`${node.x}%`} y2={`${node.y}%`}
                    stroke="rgba(59, 130, 246, 0.4)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ opacity: 0 }}
                  />
                );
              })}
             </AnimatePresence>
           </svg>

           {nodes.map((node) => (
             <motion.div
               key={node.id}
               className="absolute"
               style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
               animate={{ 
                 scale: activeCluster === node.cluster ? 1.4 : 1,
                 opacity: activeCluster ? (activeCluster === node.cluster ? 1 : 0.2) : 1
               }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
             >
                <div className={cn(
                  "relative p-3 rounded-2xl border transition-all shadow-xl group",
                  node.type === 'text' ? "bg-blue-600/10 border-blue-500/30" : 
                  node.type === 'image' ? "bg-green-600/10 border-green-500/30" : 
                  node.type === 'audio' ? "bg-orange-600/10 border-orange-500/30" : 
                  "bg-purple-600/10 border-purple-500/30",
                  activeCluster === node.cluster && "ring-4 ring-white/20 shadow-blue-500/20"
                )}>
                  {getTypeIcon(node.type)}
                  
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-0.5 rounded">
                    {node.label}
                  </div>
                  
                  {activeCluster === node.cluster && (
                    <motion.div 
                      layoutId="pulse"
                      className="absolute inset-0 rounded-2xl border-2 border-white/50 animate-ping opacity-20" 
                    />
                  )}
                </div>
             </motion.div>
           ))}

           {!activeCluster && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
                <Link2 size={40} className="text-white/20" />
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Synapse Mapping</span>
             </div>
           )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 px-1">
                <FileText size={16} className="text-blue-400" /> Use Cases
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Text-to-Image Search",
                  "Audio Content Recognition",
                  "Medical Image Analysis",
                  "Video Recommendation Engine"
                ].map((useCase, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                     {useCase}
                  </div>
                ))}
              </div>
           </div>
           
           <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex flex-col justify-center">
              <h4 className="text-blue-300 font-black text-xs uppercase tracking-widest mb-2">Technical Core</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                "A text query can find images, sounds, or videos because all are represented in the same vector space. Meaning transcends format."
              </p>
              <div className="mt-4 pt-4 border-t border-blue-500/20 flex flex-wrap gap-2">
                 <span className="bg-blue-500/20 text-blue-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Contrastive Learning</span>
                 <span className="bg-purple-500/20 text-purple-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Joint Embedding</span>
                 <span className="bg-green-500/20 text-green-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase">CLIP Model</span>
              </div>
           </div>
        </div>
      </div>

      <ReadingMaterial 
        simple="Modern AI models can convert text, images, and audio into vectors. When these are in the same space, similar meanings stay close together regardless of format."
        analogy="Imagine a traveler who speaks only French, a musician who only plays, and an artist who only draws. If they all 'think' of 'Summer', they can share that feeling without using the same tools!"
        technical="In Multimodal Embedding space, contrastive loss (like in CLIP) is used during training to push embeddings of related pairs (e.g. image of a cat and text 'a cat') closer together in a shared latent space."
        example="Searching 'Sunset over the ocean' in your phone's gallery works because the text query and your photos are mapped to the same coordinate system."
        takeaway="AI doesn't just see words or pixels; it sees underlying concepts."
      />
    </div>
  );
};
