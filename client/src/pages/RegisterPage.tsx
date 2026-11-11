import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Lock, Mail, User, GraduationCap, Target, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    education: 'B.Tech / B.E. Computer Science',
    careerGoal: 'Full-Stack Developer',
    interests: 'Web Development, Artificial Intelligence',
    skills: 'JavaScript, React, Python',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({
        ...formData,
        interests: formData.interests.split(',').map((s) => s.trim()).filter(Boolean),
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-[#15171C] border border-[#272B35] rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7900] to-[#168BFF] p-[2px] mb-2">
            <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#FF7900]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Create Your Student Account</h1>
          <p className="text-xs text-zinc-400">
            Join the technology ecosystem and start building your developer future.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Full Name</label>
            <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] focus-within:border-[#FF7900]">
              <User className="w-4 h-4 text-zinc-500 mr-2.5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rohan Sharma"
                className="w-full bg-transparent text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Student Email Address</label>
            <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] focus-within:border-[#FF7900]">
              <Mail className="w-4 h-4 text-zinc-500 mr-2.5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rohan@college.edu"
                className="w-full bg-transparent text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Password (min 6 characters)</label>
            <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] focus-within:border-[#FF7900]">
              <Lock className="w-4 h-4 text-zinc-500 mr-2.5" />
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-1">Education Level</label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="B.Tech, Diploma, BCA..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-1">Career Goal</label>
              <input
                type="text"
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                placeholder="Full-Stack, AI Engineer..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 block mb-1">Skills (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="JavaScript, React, Python, C++"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 shadow-lg shadow-[#FF7900]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Creating Profile...' : 'Complete Registration'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-center text-xs text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#168BFF] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
