import React from "react";
import { motion } from "motion/react";
import { Hash, Book, List, Search } from "lucide-react";
import { ModuleHeader, ReadingMaterial } from "../Shared";

export const Vocabulary: React.FC = () => {
  const sampleData = [
    { token: "The", id: 101, type: "Word", pos: 0 },
    { token: "dog", id: 2457, type: "Word", pos: 1 },
    { token: "is", id: 318, type: "Word", pos: 2 },
    { token: "play", id: 4021, type: "Subword", pos: 3 },
    { token: "##ing", id: 1205, type: "Subword", pos: 4 },
    { token: "in", id: 199, type: "Word", pos: 5 },
    { token: "garden", id: 5678, type: "Word", pos: 6 },
    { token: ".", id: 102, type: "Punctuation", pos: 7 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ModuleHeader title="Token IDs and Vocabulary" current={3} total={16} />

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8">
           <div className="flex-1">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
               <List size={20} className="text-blue-500" /> The ID Barcode Table
             </h3>
             <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
               <table className="w-full text-sm text-left">
                  <thead className="bg-white/5 text-[10px] uppercase font-bold text-slate-500">
                    <tr>
                      <th className="px-4 py-3">The Word/Part</th>
                      <th className="px-4 py-3 text-center">Digital Barcode (ID)</th>
                      <th className="px-4 py-3">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sampleData.map((row, i) => (
                      <motion.tr 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <span className={row.type === 'Subword' ? 'text-purple-400 font-mono italic' : 'text-blue-400 font-bold'}>
                            {row.token}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-mono text-white font-bold opacity-80">
                          #{row.id}
                        </td>
                        <td className="px-4 py-3 font-medium text-[10px] text-slate-400">
                           {row.type === 'Word' ? 'Full Word' : row.type === 'Subword' ? 'Word Part' : 'Symbol'}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
               </table>
             </div>
           </div>

           <div className="md:w-72 space-y-4">
              <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10 group-hover:scale-110 transition-transform">
                   <Book size={100} />
                 </div>
                 <h4 className="text-white font-bold mb-2">The Giant Map</h4>
                 <p className="text-xs text-slate-400 leading-relaxed mb-4">
                   Once the sentences are sliced, the AI looks up each slice in its giant "ID Map". Every unique slice has its own unique number.
                 </p>
                 <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase">
                   <Search size={14} /> Total Slices: 50,000+
                 </div>
              </div>

              <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                 <div className="flex items-center gap-2 mb-3">
                   <Hash size={18} className="text-purple-400" />
                   <h4 className="text-white font-bold text-sm">Special Tokens</h4>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <code className="text-purple-400 text-xs">&lt;BOS&gt;</code>
                      <span className="text-[10px] text-slate-500 uppercase">Start of Text</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <code className="text-purple-400 text-xs">&lt;EOS&gt;</code>
                      <span className="text-[10px] text-slate-500 uppercase">End of Text</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <code className="text-purple-400 text-xs">[PAD]</code>
                      <span className="text-[10px] text-slate-500 uppercase">Padding</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center p-8 bg-black/40 border border-dashed border-white/10 rounded-2xl">
           <div className="text-sm text-slate-400 mb-4 text-center max-w-sm">
             Models cannot process letters. After tokenization, your sentence looks like this to the AI:
           </div>
           <div className="flex flex-wrap gap-3 justify-center">
             {sampleData.map((row, i) => (
               <motion.div 
                 key={i}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.8 + (i * 0.1) }}
                 className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex flex-col items-center justify-center shadow-lg border border-white/20"
               >
                 <span className="text-xs text-blue-100 font-bold leading-none">{row.id}</span>
                 <span className="text-[8px] text-white/50 uppercase mt-1 opacity-60">ID</span>
               </motion.div>
             ))}
           </div>
        </div>
      </div>

      <ReadingMaterial 
        simple="The model does not process text directly. It processes numbers called token IDs."
        analogy="It is like barcodes in a supermarket. The scanner doesn't care about the name of the cereal; it only cares about the unique code printed on the box."
        technical="Each tokenizer includes a fixed vocabulary file. When text is tokenized, each token is looked up in this file, and its corresponding index (ID) is passed to the model's first layer."
        example="'The' → 101, 'dog' → 2457"
        takeaway="Computers are number crunchers. Token IDs are the entry point for turning text into math."
      />
    </div>
  );
};
