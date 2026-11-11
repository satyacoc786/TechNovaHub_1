import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, CheckCircle2, ShieldCheck, Heart, Github, Twitter, Linkedin, Disc as Discord } from 'lucide-react';
import api from '../../services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const res = await api.post('/newsletter/subscribe', { email });
      setStatus('success');
      setMessage(res.data.message || 'Subscribed successfully!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="bg-[#09090B] border-t border-[#272B35] pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#272B35]">
          <div className="lg:col-span-6 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF7900] to-[#168BFF] p-[2px]">
                <div className="w-full h-full bg-[#09090B] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#FF7900]" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white">TECHNOVA</span>
                <span className="ml-2 font-bold text-xs px-2 py-0.5 rounded bg-[#168BFF]/20 text-[#168BFF] border border-[#168BFF]/30">
                  HUB
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md font-medium">
              "Discover Opportunities. Master Technology. Build Your Future."
            </p>
            <p className="text-xs text-zinc-500 max-w-lg leading-relaxed">
              The ultimate technology ecosystem built for engineering students, diploma students, computer science scholars, and aspiring developers across India and globally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Links Only
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center bg-[#15171C] p-6 rounded-2xl border border-[#272B35]">
            <h4 className="text-white text-base font-semibold mb-1">
              Stay ahead of tech deadlines & internships
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              Get weekly verified hackathons, fresher software engineer drives, and learning resources straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your student email..."
                required
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#FF7900]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-semibold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : (
                  <>
                    Subscribe <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {status === 'success' && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> {message}
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400 mt-2">{message}</p>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#272B35] text-xs">
          <div>
            <h5 className="font-semibold text-white tracking-wider uppercase text-[11px] mb-4">
              Opportunity Hub
            </h5>
            <ul className="space-y-2.5">
              <li><Link to="/opportunities?type=Internship" className="hover:text-white transition-colors">Tech Internships</Link></li>
              <li><Link to="/hackathons" className="hover:text-white transition-colors">National Hackathons</Link></li>
              <li><Link to="/techathons" className="hover:text-white transition-colors">College Techathons</Link></li>
              <li><Link to="/opportunities?type=Job" className="hover:text-white transition-colors">Fresher IT & SWE Jobs</Link></li>
              <li><Link to="/opportunities?workplaceType=Remote" className="hover:text-white transition-colors">Remote Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white tracking-wider uppercase text-[11px] mb-4">
              Programming Center
            </h5>
            <ul className="space-y-2.5">
              <li><Link to="/learn/c" className="hover:text-white transition-colors">C Language Mastery</Link></li>
              <li><Link to="/learn/cpp" className="hover:text-white transition-colors">Modern C++ & STL</Link></li>
              <li><Link to="/learn/python" className="hover:text-white transition-colors">Python for AI & APIs</Link></li>
              <li><Link to="/learn/javascript" className="hover:text-white transition-colors">JavaScript ES6+ Deep Dive</Link></li>
              <li><Link to="/learn/rust" className="hover:text-white transition-colors">Rust Systems & Safety</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white tracking-wider uppercase text-[11px] mb-4">
              Career Roadmaps
            </h5>
            <ul className="space-y-2.5">
              <li><Link to="/roadmaps/software-engineer" className="hover:text-white transition-colors">Software Engineer Roadmap</Link></li>
              <li><Link to="/roadmaps/full-stack-developer" className="hover:text-white transition-colors">Full-Stack Developer</Link></li>
              <li><Link to="/roadmaps/ai-engineer" className="hover:text-white transition-colors">AI & LLM Engineer</Link></li>
              <li><Link to="/roadmaps/cybersecurity-analyst" className="hover:text-white transition-colors">Cybersecurity Analyst</Link></li>
              <li><Link to="/roadmaps/devops-engineer" className="hover:text-white transition-colors">Cloud & DevOps Specialist</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white tracking-wider uppercase text-[11px] mb-4">
              Intelligence & AI
            </h5>
            <ul className="space-y-2.5">
              <li><Link to="/ai-assistant" className="hover:text-white transition-colors">AI Career & Code Assistant</Link></li>
              <li><Link to="/ai-tools" className="hover:text-white transition-colors">Curated AI Dev Tools</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Tech News & Explainers</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Campus Tech Community</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} TECHNOVA HUB. Built with precision for technology students.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Node.js, Express, React, Vite & MongoDB</span>
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Github className="w-4 h-4" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Twitter className="w-4 h-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
