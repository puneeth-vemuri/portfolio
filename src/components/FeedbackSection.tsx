import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, MessageSquare, X, Send } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface Feedback {
  id: string;
  name: string;
  message: string;
  avatarColor: string;
  role: string;
  timestamp: any;
}

const AVATAR_COLORS = [
  'bg-red-600', 'bg-blue-600', 'bg-emerald-600', 'bg-purple-600',
  'bg-orange-600', 'bg-pink-600', 'bg-indigo-600'
];

export const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Fetch feedback
  useEffect(() => {
    const q = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Feedback[];
      setFeedbacks(data);
    });
    return () => unsubscribe();
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(isNaN(progress) ? 0 : progress);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of view for better context
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        name,
        message,
        avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
        role: 'VISITOR',
        timestamp: serverTimestamp()
      });
      setName('');
      setMessage('');
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding feedback: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-4 pb-8 overflow-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[10px] text-red-500 tracking-[0.3em] font-mono uppercase mb-3 block">Feedback</span>
            <h2 className="font-grotesk text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">
              What <span className="text-red-500">Visitors</span> say
            </h2>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-mono text-[10px] uppercase tracking-widest"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 py-4 px-2 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {feedbacks.length > 0 ? (
              feedbacks.map((item) => (
                <div 
                  key={item.id} 
                  className="snap-start relative rounded-[1.5rem] bg-[#0c0c0c] border border-white/10 p-6 min-h-[200px] w-[280px] flex flex-col transition-all duration-500 hover:border-red-500/30 shrink-0"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${item.avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight">{item.name}</h4>
                      <span className="text-red-500/60 font-mono text-[9px] tracking-widest uppercase">{item.role}</span>
                    </div>
                  </div>
                  <p className="text-white/70 font-mono text-xs leading-relaxed flex-grow italic">
                    "{item.message}"
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full h-[200px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                <MessageSquare className="w-8 h-8 text-white/10 mb-2" />
                <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">Awaiting more love...</p>
              </div>
            )}
            
            {/* Peeking placeholder if only a few items */}
            {feedbacks.length > 0 && feedbacks.length < 3 && (
               <div className="snap-start relative rounded-[1.5rem] bg-white/[0.01] border border-dashed border-white/5 p-6 min-h-[200px] w-[280px] flex items-center justify-center shrink-0">
                 <p className="text-white/10 font-mono text-[9px] uppercase tracking-[0.2em]">Share your thoughts</p>
               </div>
            )}
          </div>

          {/* Navigation Arrows - Always visible on desktop if scrollable */}
          {feedbacks.length > 2 && (
            <>
              <button 
                onClick={() => scroll('left')}
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Progress Bar */}
          <div className="mt-6 w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            />
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden"
            >
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-8 relative">
                <div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2">Leave your <span className="text-red-500">Mark</span></h3>
                  <p className="text-white/50 font-mono text-[10px] uppercase tracking-widest">I actually read these. No spam, just vibes.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div>
                  <label className="block text-white/30 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 ml-1">Your Alias</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Captain Motion"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 transition-all font-mono text-sm placeholder:text-white/10"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/30 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 ml-1">The Message</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Damn, this site is smooth..."
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 transition-all font-mono text-sm resize-none placeholder:text-white/10"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                >
                  {loading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Post Feedback
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
