import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, Users, Building2, Mail, MailOpen, MessageSquareReply, 
  CalendarCheck, ActivitySquare, AlertCircle, Clock
} from 'lucide-react';

const facilityData = {
  kpis: {
    emailsSent: '2,480',
    activeLeads: '610',
    openRate: '68.4%',
    replies: '142',
    positiveReplyRate: '5.8%',
    meetingsBooked: '18',
    bounceRate: '0.4%',
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
    emailsSent: '4,150',
    activeLeads: '1,240',
    openRate: '72.1%',
    replies: '385',
    positiveReplyRate: '8.2%',
    meetingsBooked: '42',
    bounceRate: '0.2%',
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
  <div className={`relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border ${isHighlighted ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-200/60 shadow-sm'} p-6 transition-all duration-300 hover:shadow-md group`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className={`text-3xl font-bold ${isHighlighted ? 'text-emerald-600' : isSafe ? 'text-emerald-500' : 'text-slate-800'}`}>
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-xl ${isHighlighted ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-brand-blue'} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} strokeWidth={2} />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ type, status }) => {
  const styles = {
    positive: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    booked: 'bg-blue-100 text-brand-blue border-blue-200',
    opened: 'bg-slate-100 text-slate-600 border-slate-200',
    neutral: 'bg-amber-100 text-amber-700 border-amber-200',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[type] || styles.opened}`}>
      {status}
    </span>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('facility');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const data = activeTab === 'facility' ? facilityData : candidateData;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-blue selection:text-white">
      {/* Header */}
      <header className="bg-brand-navy text-white sticky top-0 z-50 border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-cyan-400 rounded-lg flex items-center justify-center shadow-lg border border-blue-400/30">
                <ActivitySquare size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  Argyle Medical Staffing
                </h1>
                <p className="text-xs text-slate-400 font-medium">Outreach & Campaign Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Live Engine Active</span>
              </div>
              <div className="text-sm font-medium text-slate-300 bg-slate-800/80 px-4 py-2 rounded-xl tabular-nums border border-slate-700">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-full max-w-fit mx-auto sm:mx-0 shadow-inner backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('facility')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === 'facility' 
                ? 'bg-white text-brand-navy shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <Building2 size={18} />
            Facility Outreach (Clients)
          </button>
          <button
            onClick={() => setActiveTab('candidate')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === 'candidate' 
                ? 'bg-white text-brand-navy shadow-sm border border-slate-200/50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <Users size={18} />
            Candidate Outreach (Talent)
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
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800">
            <ActivitySquare size={16} />
            <span className="text-sm font-medium">System Health</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold text-emerald-700">
            <span>Delivery / Bounce Rate:</span>
            <span className="bg-emerald-100 px-2.5 py-0.5 rounded-md text-emerald-800">{data.kpis.bounceRate}</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">14-Day Performance Trend</h2>
              <p className="text-sm text-slate-500">Daily Emails Sent vs Positive Replies</p>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="emails" name="Emails Sent" stroke="#94a3b8" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#94a3b8' }} />
                  <Line yAxisId="right" type="monotone" dataKey="replies" name="Positive Replies" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="mb-2">
              <h2 className="text-lg font-bold text-slate-800">Reply Sentiment</h2>
              <p className="text-sm text-slate-500">Breakdown of recent responses</p>
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
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value, entry) => <span className="text-xs font-medium text-slate-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Live Feed Table */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50">
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                Live Activity Feed & Top Leads
              </h2>
              <p className="text-sm text-slate-500">Real-time interactions from your campaigns</p>
            </div>
            <button className="text-sm font-semibold text-brand-blue hover:text-blue-700 transition-colors">
              View All Activity &rarr;
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Activity</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.feed.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{item.name}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {item.action}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <StatusBadge type={item.type} status={item.status} />
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-right text-sm text-slate-400 flex items-center justify-end gap-1.5">
                      <Clock size={14} />
                      {item.time}
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
