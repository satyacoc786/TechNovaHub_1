import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Sparkles, MessageSquare, Github, Trophy, Heart, ArrowRight, ShieldCheck } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const chapters = [
    { name: 'Technova AI & Systems Club', members: '1,450+ Members', focus: 'LLMs, PyTorch, C++, and Distributed Systems', badge: 'Active' },
    { name: 'Competitive Coding & DSA League', members: '2,800+ Members', focus: 'LeetCode contests, Codeforces, and ICPC prep', badge: 'Daily Sprints' },
    { name: 'Web3 & Security Guild', members: '950+ Members', focus: 'Smart contracts, zero-knowledge, and CTF challenges', badge: 'Bounties' },
    { name: 'Campus Placement & Hackathon Alliance', members: '3,200+ Members', focus: 'Mock interviews, referral drops, and hackathon teams', badge: 'Most Popular' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20 text-xs font-semibold">
          <Users className="w-4 h-4" /> Global Student Developer Network
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Technova Community Hub
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Connect with over 10,000+ engineering, diploma, and computer science students. Form hackathon teams, practice mock interviews, and contribute to open-source software.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((ch, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#15171C] border border-[#272B35] shadow-xl hover:border-[#168BFF]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20 font-semibold">
                  {ch.badge}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{ch.members}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{ch.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">{ch.focus}</p>
            </div>

            <div className="pt-4 border-t border-[#272B35] flex items-center justify-between">
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Peer Mentors
              </span>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#168BFF] text-white font-bold text-xs hover:bg-[#0074E4] transition-all flex items-center gap-1.5"
              >
                Join Channel <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Campus Ambassador Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#15171C] via-[#1E2129] to-[#15171C] border border-[#272B35] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono uppercase text-[#FF7900] font-bold">
            Lead In Your College
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Technova Campus Ambassador Program 2026
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Represent Technova Hub on your campus. Organize hack sprints, conduct code reviews, and earn exclusive access to premium career mentorship and internship referrals.
          </p>
        </div>

        <a
          href="https://forms.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-[#FF7900] text-black font-bold text-xs hover:bg-[#E06A00] shadow-lg shadow-[#FF7900]/25 transition-all whitespace-nowrap"
        >
          Apply as Campus Lead →
        </a>
      </div>
    </div>
  );
};
