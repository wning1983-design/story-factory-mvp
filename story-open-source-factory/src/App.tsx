import React from 'react';
import { motion } from 'motion/react';
import { 
  GitBranch, 
  GitMerge, 
  GitCommit, 
  BookOpen, 
  Users, 
  Zap,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Mock Components for the Demo ---

const Heatmap = () => {
  // Simple 7x52 grid for contribution heatmap
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Contribution Activity</h3>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={cn(
                "w-3 h-3 rounded-sm",
                i === 0 ? "bg-zinc-800" : 
                i === 1 ? "bg-blue-900/40" :
                i === 2 ? "bg-blue-700/60" :
                i === 3 ? "bg-blue-500/80" : "bg-blue-400"
              )} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
        {Array.from({ length: 364 }).map((_, i) => {
          const level = Math.floor(Math.random() * 5);
          return (
            <div 
              key={i} 
              className={cn(
                "w-3 h-3 rounded-sm transition-colors hover:ring-1 hover:ring-white/20",
                level === 0 ? "bg-zinc-800" : 
                level === 1 ? "bg-blue-900/40" :
                level === 2 ? "bg-blue-700/60" :
                level === 3 ? "bg-blue-500/80" : "bg-blue-400"
              )}
              title={`Level ${level} on day ${i}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const StoryCard = ({ title, author, branches, commits }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="group bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
        <BookOpen size={20} />
      </div>
      <div className="flex gap-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1"><GitBranch size={12} /> {branches}</span>
        <span className="flex items-center gap-1"><GitCommit size={12} /> {commits}</span>
      </div>
    </div>
    <h4 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">{title}</h4>
    <p className="text-zinc-500 text-sm">by @{author}</p>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-black font-bold">S</div>
            <span className="font-bold tracking-tight text-white">STORY FACTORY</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Explore</a>
            <a href="#" className="hover:text-white transition-colors">My Branches</a>
            <a href="#" className="hover:text-white transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Plus size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/10" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6"
            >
              <Zap size={12} fill="currentColor" />
              ALPHA ACCESS: OPEN SOURCE STORYTELLING
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[0.9]"
            >
              Collaborate on stories like you <span className="text-blue-500">code.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 mb-10 leading-relaxed"
            >
              Branch from any chapter, commit your changes, and merge back to the main timeline. 
              The world's first open-source narrative engine.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2">
                Start a Story <ChevronRight size={18} />
              </button>
              <button className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                Explore Mainline
              </button>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Heatmap />
            
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Trending Stories</h2>
              <a href="#" className="text-blue-500 text-sm font-medium hover:underline">View all</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StoryCard title="The Neon Paradox" author="cyber_ghost" branches={124} commits={842} />
              <StoryCard title="Chronos Protocol" author="time_weaver" branches={89} commits={456} />
              <StoryCard title="Whispers of Void" author="void_walker" branches={231} commits={1204} />
              <StoryCard title="Silicon Dreams" author="ai_architect" branches={56} commits={213} />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <GitMerge size={18} className="text-purple-400" />
                Recent Merges
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs">#{i}</div>
                    <div>
                      <p className="text-sm text-zinc-300 font-medium">Chapter 4: The Revelation</p>
                      <p className="text-xs text-zinc-500">Merged into <span className="text-blue-400">main</span> by @admin</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl text-white">
              <h3 className="font-bold text-xl mb-2">AI Story Copilot</h3>
              <p className="text-white/80 text-sm mb-6">
                Stuck on a plot point? Use our DeepSeek-powered AI to generate branching possibilities.
              </p>
              <button className="w-full py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all">
                Try AI Assistant
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center text-zinc-400 text-[10px] font-bold">S</div>
            <span className="font-bold text-zinc-500">STORY FACTORY © 2026</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
