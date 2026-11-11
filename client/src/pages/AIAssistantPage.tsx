import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  Lightbulb,
  Terminal,
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: 'gemini' | 'fallback';
  warning?: string;
  timestamp: Date;
}

export const AIAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### 👋 Welcome to Technova AI Career & Code Assistant!

I am your autonomous engineering mentor. How can I empower your technology journey today?

- **Programming Concepts**: Need an explanation of pointers, async/await, or Docker?
- **Career Strategy**: Choosing between Frontend, Backend, AI/ML, or DevOps?
- **Resume Guidance**: Let me audit your tech stack and project descriptions.
- **Placement Prep**: Practice technical interview questions and system design concepts.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || loading) return;

    const userMessage: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await aiService.chat(prompt, history);

      const assistantMessage: Message = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: res.data.reply,
        source: res.data.source,
        warning: res.data.warning,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Sorry, I encountered a temporary connection error. Please try asking again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptSuggestions = [
    'How do I tailor my resume for a Google SWE internship?',
    'Explain the JavaScript Event Loop vs Go Goroutines',
    'What are 3 standout full-stack project ideas for placements?',
    'Top 5 interview questions on SQL Window Functions and Indexes',
    'Create a 6-month study plan for an AI/ML Engineer role',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#272B35] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7900] via-[#E06A00] to-[#168BFF] p-[2px]">
            <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#FF7900]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">Technova AI Assistant</h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#168BFF]/20 text-[#168BFF] border border-[#168BFF]/30 font-mono">
                Google Gemini
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Instant programming explanations, project ideas, interview coaching, and career roadmaps.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome',
                role: 'assistant',
                content: 'Chat history cleared. How can I help your career or coding questions?',
                timestamp: new Date(),
              },
            ])
          }
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15171C] border border-[#272B35] text-zinc-400 hover:text-white text-xs font-medium self-start sm:self-center transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Clear Chat
        </button>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Suggested Questions
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {promptSuggestions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-xl bg-[#15171C] border border-[#272B35] hover:border-[#FF7900]/50 text-zinc-300 hover:text-white text-xs whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#15171C] border border-[#272B35] rounded-3xl p-4 sm:p-6 shadow-2xl min-h-[500px] max-h-[600px] overflow-y-auto space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-[#FF7900] text-black shadow-md shadow-[#FF7900]/25'
                    : 'bg-[#168BFF] text-black shadow-md shadow-[#168BFF]/25'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-white" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-lg relative group ${
                  isUser
                    ? 'bg-gradient-to-br from-[#FF7900]/15 to-[#FF7900]/5 border border-[#FF7900]/30 text-white'
                    : 'bg-[#09090B]/80 border border-[#272B35] text-zinc-200'
                }`}
              >
                {/* Assistant Source Badge */}
                {!isUser && msg.source && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#272B35] text-[10px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1">
                      {msg.source === 'gemini' ? (
                        <>
                          <Sparkles className="w-3 h-3 text-[#168BFF]" /> Powered by Google Gemini
                        </>
                      ) : (
                        <>
                          <Terminal className="w-3 h-3 text-[#FF7900]" /> Built-in Technova Mentor Engine
                        </>
                      )}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-zinc-500 hover:text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Message Content */}
                <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-3">
                  {msg.content}
                </div>

                {/* Optional Configuration Hint */}
                {msg.warning && (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{msg.warning}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-[#168BFF] text-white flex items-center justify-center">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-[#09090B]/80 border border-[#272B35] rounded-2xl px-5 py-4 text-xs text-zinc-400 flex items-center gap-3">
              <span className="animate-spin w-3.5 h-3.5 border-2 border-[#FF7900] border-t-transparent rounded-full" />
              <span>Analyzing question & generating technical response...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-[#15171C] border border-[#272B35] rounded-2xl p-2 shadow-2xl focus-within:border-[#FF7900]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a technical or career question (e.g. 'How to prepare for campus placements?')..."
          className="flex-1 bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 disabled:opacity-40 transition-all flex items-center gap-2"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
