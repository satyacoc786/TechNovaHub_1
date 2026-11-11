import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  Map,
  BookOpen,
  Bookmark,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Edit2,
  CheckCircle2,
  Save,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRoadmapProgress, Opportunity } from '../types';
import { roadmapService } from '../services/roadmapService';
import { bookmarkService } from '../services/bookmarkService';
import { learningService } from '../services/learningService';

export const UserDashboardPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [userRoadmaps, setUserRoadmaps] = useState<UserRoadmapProgress[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<any[]>([]);
  const [learningProgress, setLearningProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    education: user?.education || '',
    careerGoal: user?.careerGoal || '',
    skills: user?.skills?.join(', ') || '',
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [roadmaps, bookmarks, progress] = await Promise.all([
          roadmapService.getUserRoadmaps(),
          bookmarkService.getBookmarks(),
          learningService.getUserProgress(),
        ]);
        setUserRoadmaps(roadmaps);
        setBookmarkedItems(bookmarks);
        setLearningProgress(progress);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
      setProfileForm({
        name: user.name,
        education: user.education || '',
        careerGoal: user.careerGoal || '',
        skills: user.skills?.join(', ') || '',
      });
    }
  }, [user]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        name: profileForm.name,
        education: profileForm.education,
        careerGoal: profileForm.careerGoal,
        skills: profileForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
      });
      setIsEditing(false);
    } catch {
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-xs text-zinc-400 mb-4">Please log in to view your dashboard.</p>
        <Link to="/login" className="px-4 py-2 bg-[#FF7900] text-black font-bold text-xs rounded-xl">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Profile Card */}
      <div className="bg-[#15171C] border border-[#272B35] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF7900] to-[#168BFF] p-[2px]">
              <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center text-2xl font-black text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#168BFF]/20 text-[#168BFF] border border-[#168BFF]/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                <span className="text-zinc-300 font-medium">{user.education}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-[#FF7900] font-semibold">Goal: {user.careerGoal}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Edit Form */}
        {isEditing && (
          <form onSubmit={handleProfileSave} className="mt-6 pt-6 border-t border-[#272B35] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Education Level</label>
              <input
                type="text"
                value={profileForm.education}
                onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Target Career Role</label>
              <input
                type="text"
                value={profileForm.careerGoal}
                onChange={(e) => setProfileForm({ ...profileForm, careerGoal: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Skills (comma separated)</label>
              <input
                type="text"
                value={profileForm.skills}
                onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-xs text-white"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#FF7900] text-black font-bold text-xs flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase">Saved Roadmaps</span>
            <Map className="w-4 h-4 text-[#FF7900]" />
          </div>
          <span className="text-2xl font-extrabold text-white">{userRoadmaps.length}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase">Bookmarked</span>
            <Bookmark className="w-4 h-4 text-[#168BFF]" />
          </div>
          <span className="text-2xl font-extrabold text-white">{bookmarkedItems.length}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase">Languages Active</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-white">{learningProgress.length}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase">Status</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-sm font-bold text-emerald-400">Active Scholar</span>
        </div>
      </div>

      {/* 2-Column Section: Active Roadmaps & Bookmarked Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Saved Roadmaps */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-[#FF7900]" /> Your Active Career Roadmaps
            </h2>
            <Link to="/roadmaps" className="text-xs text-[#FF7900] hover:underline">
              Browse More →
            </Link>
          </div>

          {userRoadmaps.length === 0 ? (
            <div className="p-8 text-center bg-[#15171C] rounded-2xl border border-[#272B35] text-zinc-400 text-xs">
              <p className="mb-2">You haven't saved any career roadmaps yet.</p>
              <Link to="/roadmaps" className="text-[#FF7900] font-semibold hover:underline">
                Explore 20 Roadmaps →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {userRoadmaps.map((item) => (
                <div
                  key={item._id}
                  className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35] hover:border-[#FF7900]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/20">
                      {item.roadmap?.category || 'Engineering'}
                    </span>
                    <h3 className="font-bold text-sm text-white">
                      {item.roadmap?.title || item.roadmapSlug}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span>{item.completedStages?.length || 0} of 10 stages completed</span>
                      <span>•</span>
                      <span className="text-[#FF7900] font-semibold">{item.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#09090B] overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF7900] to-[#168BFF]"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/roadmaps/${item.roadmapSlug}`}
                    className="px-4 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-zinc-200 hover:text-white text-xs font-semibold self-start sm:self-center flex items-center gap-1.5"
                  >
                    Continue Path <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookmarked Opportunities */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#168BFF]" /> Saved Opportunities
            </h2>
            <Link to="/opportunities" className="text-xs text-[#168BFF] hover:underline">
              Find More →
            </Link>
          </div>

          {bookmarkedItems.length === 0 ? (
            <div className="p-8 text-center bg-[#15171C] rounded-2xl border border-[#272B35] text-zinc-400 text-xs">
              <p className="mb-2">No bookmarked opportunities yet.</p>
              <Link to="/opportunities" className="text-[#168BFF] font-semibold hover:underline">
                Browse Opportunities →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedItems.map((b) => (
                <div
                  key={b._id}
                  className="p-4 rounded-xl bg-[#15171C] border border-[#272B35] flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#168BFF] uppercase block">
                      {b.itemData?.type || b.itemType}
                    </span>
                    <h4 className="font-semibold text-xs text-white truncate max-w-[200px]">
                      {b.itemData?.title || 'Saved Item'}
                    </h4>
                    <p className="text-[11px] text-zinc-400">{b.itemData?.company || ''}</p>
                  </div>

                  {b.itemData?.applyUrl && (
                    <a
                      href={b.itemData.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#09090B] border border-[#272B35] text-[#FF7900] hover:text-white text-xs"
                      title="Apply on official portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
