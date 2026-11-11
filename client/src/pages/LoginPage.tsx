import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (type: 'student' | 'admin') => {
    if (type === 'student') {
      setEmail('student@technovahub.com');
      setPassword('Student@123');
    } else {
      setEmail('admin@technovahub.com');
      setPassword('Admin@123');
    }
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#15171C] border border-[#272B35] rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7900] to-[#168BFF] p-[2px] mb-2">
            <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#FF7900]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to Technova Hub</h1>
          <p className="text-xs text-zinc-400">
            Sign in to access your learning progress, saved roadmaps & deadlines.
          </p>
        </div>

        {/* Quick Test Credential Buttons */}
        <div className="p-3 rounded-2xl bg-[#09090B] border border-[#272B35] space-y-2 text-xs">
          <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">
            ⚡ Quick Demo Sign-In
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('student')}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#15171C] border border-[#272B35] hover:border-[#168BFF] text-zinc-300 hover:text-white text-[11px] font-medium transition-all"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('admin')}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#15171C] border border-[#272B35] hover:border-[#FF7900] text-zinc-300 hover:text-white text-[11px] font-medium transition-all"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1.5">
              Email Address
            </label>
            <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] focus-within:border-[#FF7900]">
              <Mail className="w-4 h-4 text-zinc-500 mr-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@student.edu"
                className="w-full bg-transparent text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Password
              </label>
            </div>
            <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] focus-within:border-[#FF7900]">
              <Lock className="w-4 h-4 text-zinc-500 mr-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 shadow-lg shadow-[#FF7900]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-center text-xs text-zinc-400">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#FF7900] font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
