import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const stats = [
  { icon: "📚", label: "Courses Enrolled", value: "8", sub: "3 in progress", color: "text-saffron" },
  { icon: "✅", label: "Completed", value: "5", sub: "This quarter", color: "text-nd-green" },
  { icon: "⏱️", label: "Learning Hours", value: "42h", sub: "This month", color: "text-nd-blue" },
  { icon: "📅", label: "Leave Balance", value: "12", sub: "Days remaining", color: "text-teal" },
  { icon: "🏆", label: "LMS Score", value: "87%", sub: "Dept rank: #3", color: "text-gold" },
  { icon: "🔔", label: "Pending Tasks", value: "3", sub: "2 due this week", color: "text-maroon" },
];

const continueLearning = [
  { name: "Sankalp Confirmation Protocol", progress: 72, color: "bg-saffron", textColor: "text-saffron" },
  { name: "CRM & WhatsApp Sales Ops", progress: 45, color: "bg-nd-blue", textColor: "text-nd-blue" },
  { name: "Empathetic Communication", progress: 90, color: "bg-nd-green", textColor: "text-nd-green" },
  { name: "Temple Protocols & Entry", progress: 20, color: "bg-gold", textColor: "text-gold" },
];

const announcements = [
  { title: "New Course: Char Dham Yatra Ops 2025", sub: "Mandatory for all Ops team members. Deadline: Apr 15", borderColor: "border-l-saffron", bg: "bg-saffron-light" },
  { title: "Mahashivratri Surge Protocol Updated", sub: "Review updated SOP before March 2", borderColor: "border-l-teal", bg: "bg-teal-light" },
  { title: "Q1 Performance Review: Apr 1–5", sub: "Complete self-assessment by March 28", borderColor: "border-l-gold", bg: "bg-gold-light" },
  { title: "Holi Holiday: March 25–26", sub: "Office closed. Emergency line active for P1 issues", borderColor: "border-l-nd-blue", bg: "bg-nd-blue-light" },
];

const schedule = [
  { date: "Apr 1", event: "Sankalp Call Training — Live Batch", type: "Training", dept: "Sewa", status: "Upcoming", statusClass: "bg-nd-blue-light text-nd-blue" },
  { date: "Apr 3", event: "Live Streaming Protocol Review", type: "SOP Update", dept: "Tech", status: "Pending Review", statusClass: "bg-gold-light text-gold" },
  { date: "Apr 5", event: "Char Dham Season Briefing", type: "All-Hands", dept: "All Depts", status: "Confirmed", statusClass: "bg-nd-green-light text-nd-green" },
  { date: "Apr 10", event: "Q1 LMS Score Review", type: "Assessment", dept: "All", status: "Scheduled", statusClass: "bg-surface3 text-muted-foreground" },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] || "User";

  return (
    <div>
      <div className="mb-5">
        <div className="text-[11px] text-muted-foreground mb-2">Home <span className="text-saffron">/ Dashboard</span></div>
        <h1 className="text-xl font-bold mb-1">Good morning, {firstName} 🙏</h1>
        <p className="text-[13px] text-muted-foreground">Here's your learning & workplace summary for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="text-xl mb-2">{s.icon}</div>
            <div className="text-[11px] text-muted-foreground font-medium mb-1.5">{s.label}</div>
            <div className={`text-[26px] font-bold leading-none mb-0.5 ${s.color}`}>{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-3.5">
        <div className="bg-card border border-border rounded-xl p-[18px]">
          <div className="text-sm font-semibold mb-3.5 flex items-center gap-2">
            <span className="text-base">🎯</span> Continue Learning
          </div>
          {continueLearning.map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-b-0">
              <div className="w-40 flex-shrink-0 text-[13px]">{c.name}</div>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.progress}%` }} />
              </div>
              <div className={`w-9 text-right text-xs font-semibold ${c.textColor}`}>{c.progress}%</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-[18px]">
          <div className="text-sm font-semibold mb-3.5 flex items-center gap-2">
            <span className="text-base">📢</span> Recent Announcements
          </div>
          <div className="flex flex-col gap-2.5">
            {announcements.map((a, i) => (
              <div key={i} className={`p-2.5 rounded-lg border-l-[3px] ${a.borderColor} ${a.bg}`}>
                <div className="text-xs font-semibold mb-0.5">{a.title}</div>
                <div className="text-[11px] text-muted-foreground">{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-card border border-border rounded-xl p-[18px]">
        <div className="text-sm font-semibold mb-3.5 flex items-center gap-2">
          <span className="text-base">📅</span> Upcoming Schedule
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
              <th className="text-left p-2.5 bg-secondary rounded-l-md">Date</th>
              <th className="text-left p-2.5 bg-secondary">Event</th>
              <th className="text-left p-2.5 bg-secondary">Type</th>
              <th className="text-left p-2.5 bg-secondary">Dept</th>
              <th className="text-left p-2.5 bg-secondary rounded-r-md">Status</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, i) => (
              <tr key={i} className="border-b border-border last:border-b-0 hover:bg-secondary/50">
                <td className="p-2.5">{s.date}</td>
                <td className="p-2.5">{s.event}</td>
                <td className="p-2.5">{s.type}</td>
                <td className="p-2.5">{s.dept}</td>
                <td className="p-2.5"><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${s.statusClass}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
