import React, { useState, useEffect } from 'react';
import { UserButton } from "@clerk/clerk-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, Users, Building2, Mail, MailOpen, MessageSquareReply, 
  CalendarCheck, ActivitySquare, AlertCircle, Clock, Sun, Moon, RefreshCw
} from 'lucide-react';

const facilityData = {
  kpis: {
    emailsSent: '0',
    activeLeads: '0',
    openRate: '0%',
    replies: '0',
    positiveReplyRate: '0%',
    meetingsBooked: '0',
    bounceRate: '0%',
  },
  trendData: [
    { name: 'Mon', emails: 240, replies: 12 },
    { name: 'Tue', emails: 300, replies: 15 },
    { name: 'Wed', emails: 280, replies: 18 },
    { name: 'Thu', emails: 320, replies: 24 },
    { name: 'Fri', emails: 250, replies: 14 },
    { name: 'Sat', emails: 40, replies: 2 },
    { name: 'Sun', emails: 50, replies: 4 },
    { name: 'Mon', emails: 260, replies: 16 },
    { name: 'Tue', emails: 310, replies: 22 },
    { name: 'Wed', emails: 290, replies: 19 },
    { name: 'Thu', emails: 330, replies: 26 },
    { name: 'Fri', emails: 270, replies: 18 },
    { name: 'Sat', emails: 45, replies: 3 },
    { name: 'Sun', emails: 60, replies: 5 },
  ],
  sentimentData: [
    { name: 'Interested/Booked', value: 45, color: '#10b981' },
    { name: 'Neutral/Inquiry', value: 35, color: '#3b82f6' },
    { name: 'Out of Office', value: 12, color: '#f59e0b' },
    { name: 'Not Interested', value: 8, color: '#ef4444' },
  ],
  feed: [
    { id: 1, name: 'Nicole (Medical Solutions)', action: 'replied: "Let\'s chat Thursday"', status: 'Positive', time: '10 mins ago', type: 'positive' },
    { id: 2, name: 'Leslie (General Hospital)', action: 'clicked scheduling link', status: 'Meeting Booked', time: '25 mins ago', type: 'booked' },
    { id: 3, name: 'Dr. Smith (City Med)', action: 'opened email (3rd time)', status: 'Opened', time: '1 hr ago', type: 'opened' },
    { id: 4, name: 'Sarah (Kaiser Permanente)', action: 'replied: "Send rates over"', status: 'Positive', time: '2 hrs ago', type: 'positive' },
    { id: 5, name: 'John (Providence Health)', action: 'replied: "OOO until Monday"', status: 'Auto-Reply', time: '3 hrs ago', type: 'neutral' },
  ]
};

const candidateData = {
  kpis: {
    emailsSent: '0',
    activeLeads: '0',
    openRate: '0%',
    replies: '0',
    positiveReplyRate: '0%',
    meetingsBooked: '0',
    bounceRate: '0%',
  },
  trendData: [
    { name: 'Mon', emails: 400, replies: 32 },
    { name: 'Tue', emails: 450, replies: 45 },
    { name: 'Wed', emails: 420, replies: 38 },
    { name: 'Thu', emails: 480, replies: 52 },
    { name: 'Fri', emails: 350, replies: 28 },
    { name: 'Sat', emails: 120, replies: 12 },
    { name: 'Sun', emails: 150, replies: 15 },
    { name: 'Mon', emails: 410, replies: 35 },
    { name: 'Tue', emails: 460, replies: 48 },
    { name: 'Wed', emails: 430, replies: 41 },
    { name: 'Thu', emails: 490, replies: 55 },
    { name: 'Fri', emails: 360, replies: 30 },
    { name: 'Sat', emails: 130, replies: 14 },
    { name: 'Sun', emails: 160, replies: 16 },
  ],
  sentimentData: [
    { name: 'Interested/Booked', value: 55, color: '#10b981' },
    { name: 'Neutral/Inquiry', value: 25, color: '#3b82f6' },
    { name: 'Out of Office', value: 10, color: '#f59e0b' },
    { name: 'Not Interested', value: 10, color: '#ef4444' },
  ],
  feed: [
    { id: 1, name: 'Amanda (Travel ICU RN)', action: 'booked an intro call', status: 'Meeting Booked', time: '5 mins ago', type: 'booked' },
    { id: 2, name: 'Michael (Telemetry RN)', action: 'replied: "What are the rates in TX?"', status: 'Positive', time: '18 mins ago', type: 'positive' },
    { id: 3, name: 'Jessica (OR Tech)', action: 'clicked application link', status: 'Opened', time: '45 mins ago', type: 'opened' },
    { id: 4, name: 'David (ER Nurse)', action: 'replied: "I am looking for local per diem"', status: 'Positive', time: '1.5 hrs ago', type: 'positive' },
    { id: 5, name: 'Ashley (Med Surg RN)', action: 'opened email (2nd time)', status: 'Opened', time: '2 hrs ago', type: 'opened' },
  ]
};

const KpiCard = ({ title, value, icon: Icon, isHighlighted, isSafe }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border ${isHighlighted ? 'border-emerald-400 dark:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-200/60 dark:border-slate-700/60 shadow-sm'} p-6 transition-all duration-300 hover:shadow-md group`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <h3 className={`text-3xl font-bold ${isHighlighted ? 'text-emerald-600 dark:text-emerald-400' : isSafe ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-800 dark:text-white'}`}>
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-xl ${isHighlighted ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-900/40 text-brand-blue dark:text-blue-400'} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} strokeWidth={2} />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ type, status }) => {
  const styles = {
    positive: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
    booked: 'bg-blue-100 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
    opened: 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600/50',
    neutral: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${styles[type] || styles.opened}`}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('facility');
  const [isFetching, setIsFetching] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    facility: facilityData,
    candidate: candidateData
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const fetchN8nData = async () => {
    setIsFetching(true);
    try {
      // GET request to n8n webhook (Production URL)
      const response = await fetch('http://2.25.76.245:5678/webhook/06813544-ae56-4004-adbb-a99dd0ae562b');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      setDashboardData(prev => ({
        facility: data.facility || prev.facility,
        candidate: data.candidate || prev.candidate
      }));
    } catch (err) {
      console.error('Failed to fetch from n8n webhook. Using mock data.', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchN8nData();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const data = activeTab === 'facility' ? dashboardData.facility : dashboardData.candidate;

  const chartAxisColor = isDarkMode ? '#cbd5e1' : '#64748b';
  const chartGridColor = isDarkMode ? '#334155' : '#e2e8f0';
  const chartTooltipBg = isDarkMode ? '#1e293b' : '#ffffff';
  const chartTooltipText = isDarkMode ? '#f8fafc' : '#0f172a';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-brand-blue selection:text-white transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src="/logo.jpg" alt="Argyle Medical Staffing Logo" className="h-12 w-auto object-contain rounded-full" />
              <div className="flex flex-col justify-center">
                <h1 className="text-[28px] font-serif font-bold text-[#001c40] dark:text-white leading-none">
                  Argyle
                </h1>
                <p className="text-[10px] font-sans tracking-[0.25em] text-[#337ab7] dark:text-blue-400 uppercase font-semibold mt-1">
                  Medical Staffing
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={fetchN8nData}
                disabled={isFetching}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 rounded-full border border-emerald-100 dark:border-emerald-800/50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <div className="relative flex h-3 w-3">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${isFetching ? 'animate-ping' : ''}`}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                  {isFetching ? 'Refreshing...' : 'Live Engine Active'}
                </span>
                <RefreshCw size={14} className={`text-emerald-600 dark:text-emerald-400 ml-1 ${isFetching ? 'animate-spin' : ''}`} />
              </button>
              <div className="pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <UserButton afterSignOutUrl="/sign-in" appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9"
                  }
                }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Tabs */}
        <div className="flex flex-row gap-1 sm:gap-2 p-1 sm:p-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl sm:rounded-2xl w-full sm:max-w-fit mx-auto sm:mx-0 shadow-inner backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('facility')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-sm transition-all duration-300 ${
              activeTab === 'facility' 
                ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-600' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-center leading-tight">Facility Outreach</span>
          </button>
          <button
            onClick={() => setActiveTab('candidate')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-sm transition-all duration-300 ${
              activeTab === 'candidate' 
                ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-600' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-center leading-tight">Candidate Outreach</span>
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard title="Total Emails Sent" value={data.kpis.emailsSent} icon={Mail} />
          <KpiCard title="Active Leads" value={data.kpis.activeLeads} icon={Activity} />
          <KpiCard title="Open Rate" value={data.kpis.openRate} icon={MailOpen} />
          <KpiCard title="Total Replies" value={data.kpis.replies} icon={MessageSquareReply} />
          <KpiCard title="Positive Reply Rate" value={data.kpis.positiveReplyRate} icon={AlertCircle} isHighlighted />
          <KpiCard title="Meetings Booked" value={data.kpis.meetingsBooked} icon={CalendarCheck} />
        </div>
        
        {/* Add Delivery Rate in a sleek banner under KPIs */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
            <ActivitySquare size={16} />
            <span className="text-sm font-medium">System Health</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            <span>Delivery / Bounce Rate:</span>
            <span className="bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-0.5 rounded-md text-emerald-800 dark:text-emerald-200">{data.kpis.bounceRate}</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">14-Day Performance Trend</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Daily Emails Sent vs Positive Replies</p>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} vertical={false} />
                  <XAxis dataKey="name" stroke={chartAxisColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke={chartAxisColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke={chartAxisColor} fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: chartTooltipBg, color: chartTooltipText, borderRadius: '12px', border: '1px solid ' + chartGridColor, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: chartTooltipText }}
                    cursor={{ stroke: chartAxisColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="emails" name="Emails Sent" stroke={chartAxisColor} strokeWidth={3} dot={false} activeDot={{ r: 6, fill: chartAxisColor }} />
                  <Line yAxisId="right" type="monotone" dataKey="replies" name="Positive Replies" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: isDarkMode ? '#1e293b' : '#fff' }} activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="mb-2">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Reply Sentiment</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Breakdown of recent responses</p>
            </div>
            <div className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: chartTooltipBg, color: chartTooltipText, borderRadius: '8px', border: '1px solid ' + chartGridColor, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: chartTooltipText }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value, entry) => <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Live Feed Table */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-white/50 dark:bg-slate-800/50">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                Live Activity Feed & Top Leads
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Real-time interactions from your campaigns</p>
            </div>
            <button className="text-sm font-semibold text-brand-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              View All Activity &rarr;
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3 sm:w-1/4">Contact</th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3 sm:w-auto">Recent Activity</th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3 sm:w-auto">Status</th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right hidden sm:table-cell w-1/6">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {data.feed.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="py-3 px-4 sm:py-4 sm:px-6 align-top sm:align-middle">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base break-words leading-tight">{item.name}</div>
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-slate-600 dark:text-slate-400 text-sm sm:text-base align-top sm:align-middle break-words">
                      <div className="leading-tight">{item.action}</div>
                      <div className="flex items-center gap-1 mt-1.5 sm:hidden text-[11px] text-slate-400 dark:text-slate-500">
                        <Clock size={12} />
                        {item.time}
                      </div>
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 align-top sm:align-middle">
                      <StatusBadge type={item.type} status={item.status} />
                    </td>
                    <td className="py-3 px-4 sm:py-4 sm:px-6 text-right text-sm text-slate-400 dark:text-slate-500 hidden sm:table-cell align-middle">
                      <div className="flex items-center justify-end gap-1.5">
                        <Clock size={14} />
                        {item.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
