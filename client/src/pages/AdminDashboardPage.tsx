import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Compass,
  Trophy,
  BookOpen,
  Map,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  BarChart2,
  Mail,
  Save,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { adminService } from '../services/adminService';
import { opportunityService } from '../services/opportunityService';
import { Opportunity } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'users' | 'reports'>('overview');

  // Modal for Create/Edit Opportunity
  const [isOppModalOpen, setIsOppModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Partial<Opportunity> | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsData, usersData, oppsData, reportsData] = await Promise.all([
        adminService.getAnalytics(),
        adminService.listUsers({ limit: 50 }),
        opportunityService.getOpportunities({ status: 'all', limit: 50 }),
        adminService.listReports(),
      ]);

      setAnalytics(analyticsData);
      setUsersList(usersData.data || []);
      setOpportunities(oppsData.data || []);
      setReports(reportsData || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const handleDeleteOpportunity = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this opportunity?')) return;
    try {
      await opportunityService.delete(id);
      setOpportunities((prev) => prev.filter((o) => o._id !== id));
    } catch {
      alert('Failed to delete opportunity.');
    }
  };

  const handleSaveOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOpp) return;

    try {
      if (editingOpp._id) {
        await opportunityService.update(editingOpp._id, editingOpp);
      } else {
        await opportunityService.create(editingOpp);
      }
      setIsOppModalOpen(false);
      setEditingOpp(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save opportunity.');
    }
  };

  const handleUpdateUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await adminService.updateUserRole(userId, newRole);
      setUsersList((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch {
      alert('Failed to update user role.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Delete this user account permanently?')) return;
    try {
      await adminService.deleteUser(userId);
      setUsersList((prev) => prev.filter((u) => u._id !== userId));
    } catch {
      alert('Failed to delete user.');
    }
  };

  const handleUpdateReport = async (id: string, status: string) => {
    try {
      await adminService.updateReport(id, status);
      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch {
      alert('Failed to update report status.');
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-24 text-center">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">Restricted Access</h2>
        <p className="text-xs text-zinc-400 mb-4">
          This portal is restricted to authorized Technova Hub administrators.
        </p>
        <Link to="/login" className="px-4 py-2 bg-[#FF7900] text-black font-bold text-xs rounded-xl">
          Admin Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#272B35] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              ★ Super Admin
            </span>
            <span className="text-xs text-zinc-400">{user?.email}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Technova Control Center
          </h1>
        </div>

        <button
          onClick={() => {
            setEditingOpp({
              title: '',
              company: '',
              description: '',
              type: 'Internship',
              category: 'Software Engineering',
              location: 'Remote',
              workplaceType: 'Remote',
              isPaid: true,
              stipend: '₹50,000/mo',
              eligibility: 'B.Tech/B.E. 3rd or 4th Year',
              skillsRequired: ['React', 'Node.js'],
              deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              applyUrl: 'https://careers.google.com/',
            });
            setIsOppModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#E06A00] text-black font-bold text-xs hover:brightness-110 shadow-lg shadow-[#FF7900]/25 flex items-center gap-2 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" /> Add Opportunity
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#272B35] pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'overview', label: 'Analytics Overview', icon: BarChart2 },
          { id: 'opportunities', label: `Opportunities (${opportunities.length})`, icon: Compass },
          { id: 'users', label: `Users (${usersList.length})`, icon: Users },
          { id: 'reports', label: `Reported Links (${reports.filter((r) => r.status === 'pending').length} Pending)`, icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF7900] text-black'
                  : 'bg-[#15171C] text-zinc-400 hover:text-white border border-[#272B35]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview Analytics */}
      {activeTab === 'overview' && analytics && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
              <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Total Users</span>
              <span className="text-3xl font-black text-white">{analytics.counts?.users}</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
              <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Opportunities</span>
              <span className="text-3xl font-black text-[#FF7900]">{analytics.counts?.opportunities}</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
              <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Career Roadmaps</span>
              <span className="text-3xl font-black text-[#168BFF]">{analytics.counts?.roadmaps}</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#15171C] border border-[#272B35]">
              <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Newsletter Subs</span>
              <span className="text-3xl font-black text-emerald-400">{analytics.counts?.newsletterSubscribers}</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="p-6 rounded-3xl bg-[#15171C] border border-[#272B35]">
            <h3 className="text-sm font-bold text-white mb-4">Opportunity Distribution</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {analytics.opportunityBreakdown?.map((item: any) => (
                <div key={item._id} className="p-4 rounded-xl bg-[#09090B] border border-[#272B35]">
                  <span className="text-xs text-zinc-400 block">{item._id}</span>
                  <span className="text-xl font-bold text-white">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Opportunities Management */}
      {activeTab === 'opportunities' && (
        <div className="bg-[#15171C] border border-[#272B35] rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-[#272B35] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Active Listings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#09090B] text-zinc-400 uppercase font-mono text-[10px] border-b border-[#272B35]">
                <tr>
                  <th className="p-4">Title & Company</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4">Workplace</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272B35]">
                {opportunities.map((opp) => (
                  <tr key={opp._id} className="hover:bg-[#1E2129] transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div>{opp.title}</div>
                      <span className="text-[11px] text-zinc-500 font-normal">{opp.company}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#09090B] border border-[#272B35] text-[10px] font-mono">
                        {opp.type}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-zinc-400">
                      {new Date(opp.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-zinc-400">{opp.workplaceType}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingOpp(opp);
                          setIsOppModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-[#09090B] border border-[#272B35] text-zinc-300 hover:text-white"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOpportunity(opp._id)}
                        className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Users Management */}
      {activeTab === 'users' && (
        <div className="bg-[#15171C] border border-[#272B35] rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-[#272B35]">
            <h3 className="text-sm font-bold text-white">Registered Students & Admins</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-[#09090B] text-zinc-400 uppercase font-mono text-[10px] border-b border-[#272B35]">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Education</th>
                  <th className="p-4">Career Goal</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272B35]">
                {usersList.map((u) => (
                  <tr key={u._id} className="hover:bg-[#1E2129] transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{u.name}</div>
                      <span className="text-[11px] text-zinc-500">{u.email}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                        u.role === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-[#09090B] text-zinc-400'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-400">{u.education || 'N/A'}</td>
                    <td className="p-4 text-[#FF7900] font-medium">{u.careerGoal || 'N/A'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleUpdateUserRole(u._id, u.role)}
                        className="px-2.5 py-1 rounded-lg bg-[#09090B] border border-[#272B35] text-[11px] text-zinc-300 hover:text-white"
                      >
                        Toggle Role
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Reported Links Review */}
      {activeTab === 'reports' && (
        <div className="bg-[#15171C] border border-[#272B35] rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-bold text-white">Reported Broken or Expired Links</h3>
          {reports.length === 0 ? (
            <p className="text-xs text-zinc-400">No reports submitted by students. All links verified clean!</p>
          ) : (
            <div className="space-y-3">
              {reports.map((r) => (
                <div key={r._id} className="p-4 rounded-2xl bg-[#09090B] border border-[#272B35] flex items-center justify-between gap-4">
                  <div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                      r.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {r.status}
                    </span>
                    <p className="text-xs font-semibold text-white mt-1">{r.reason}</p>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#168BFF] truncate max-w-md block">
                      {r.url}
                    </a>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateReport(r._id, 'resolved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs hover:bg-emerald-500/25"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleUpdateReport(r._id, 'dismissed')}
                      className="px-3 py-1.5 rounded-lg bg-[#15171C] border border-[#272B35] text-zinc-400 text-xs hover:text-white"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Opportunity Modal */}
      {isOppModalOpen && editingOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#15171C] border border-[#272B35] rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#272B35]">
              <h3 className="font-bold text-white text-base">
                {editingOpp._id ? 'Edit Opportunity' : 'Add New Opportunity'}
              </h3>
              <button onClick={() => setIsOppModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOpportunity} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingOpp.title || ''}
                    onChange={(e) => setEditingOpp({ ...editingOpp, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={editingOpp.company || ''}
                    onChange={(e) => setEditingOpp({ ...editingOpp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Type</label>
                  <select
                    value={editingOpp.type || 'Internship'}
                    onChange={(e) => setEditingOpp({ ...editingOpp, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Techathon">Techathon</option>
                    <option value="Job">Job</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Workplace</label>
                  <select
                    value={editingOpp.workplaceType || 'Remote'}
                    onChange={(e) => setEditingOpp({ ...editingOpp, workplaceType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingOpp.category || ''}
                    onChange={(e) => setEditingOpp({ ...editingOpp, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingOpp.description || ''}
                  onChange={(e) => setEditingOpp({ ...editingOpp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Stipend or Prizes</label>
                  <input
                    type="text"
                    value={editingOpp.stipend || editingOpp.prizes || ''}
                    onChange={(e) => setEditingOpp({ ...editingOpp, stipend: e.target.value, prizes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Deadline Date</label>
                  <input
                    type="date"
                    required
                    value={
                      editingOpp.deadline
                        ? new Date(editingOpp.deadline).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => setEditingOpp({ ...editingOpp, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Official Application URL</label>
                <input
                  type="url"
                  required
                  value={editingOpp.applyUrl || ''}
                  onChange={(e) => setEditingOpp({ ...editingOpp, applyUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#272B35] text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#272B35]">
                <button
                  type="button"
                  onClick={() => setIsOppModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#272B35] text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF7900] text-black font-bold hover:bg-[#E06A00]"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
