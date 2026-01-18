
import React, { useState, useRef, useEffect } from 'react';
import { chatWithBrain } from '../services/geminiService';
import { ChatMessage } from '../types';

export const BrainChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Systems online. I am The Brain. Upload your metrics or ask a strategic question about your experience's economy." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithBrain(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || "I encountered a processing gap. Please retry." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to neural link." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <header className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-primary-700 rounded-full animate-pulse"></div>
          <span className="font-heading font-bold text-slate-900">Neural Link v4</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono tracking-widest font-bold">GEMINI-3-FLASH-PREVIEW</span>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-6 py-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-primary-900 text-white font-medium shadow-md' 
                : 'bg-slate-100/50 text-slate-700 border border-slate-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100/50 border border-slate-200 px-5 py-3 rounded-2xl flex gap-2">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex gap-4">
          <input
            type="text"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all shadow-sm placeholder:text-slate-400"
            placeholder="Query The Brain..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-primary-900 hover:bg-primary-800 disabled:bg-slate-300 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-200 active:scale-95 text-sm"
          >
            Query
          </button>
        </div>
      </div>
    </div>
  );
};
