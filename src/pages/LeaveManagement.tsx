import React from "react";

const leaveStats = [
  { label: "Total Leaves", value: "24", color: "text-saffron" },
  { label: "Used", value: "12", color: "text-maroon" },
  { label: "Remaining", value: "12", color: "text-nd-green" },
  { label: "Sick Leaves", value: "6/8", sub: "remaining", color: "text-nd-blue" },
];

const leaveHistory = [
  { dates: "Jan 15–16", type: "Festival", days: 2, status: "Approved", statusClass: "bg-nd-green-light text-nd-green" },
  { dates: "Feb 3", type: "Sick", days: 1, status: "Approved", statusClass: "bg-nd-green-light text-nd-green" },
  { dates: "Feb 20–22", type: "Casual", days: 3, status: "Approved", statusClass: "bg-nd-green-light text-nd-green" },
  { dates: "Mar 14–15", type: "Earned", days: 2, status: "Approved", statusClass: "bg-nd-green-light text-nd-green" },
  { dates: "Mar 25–26", type: "Festival (Holi)", days: 2, status: "Approved", statusClass: "bg-nd-green-light text-nd-green" },
  { dates: "Apr 10–12", type: "Casual", days: 3, status: "Pending", statusClass: "bg-gold-light text-gold" },
];

const LeaveManagement: React.FC = () => {
  return (
    <div>
      <div className="mb-5">
        <div className="text-[11px] text-muted-foreground mb-2">Home <span className="text-saffron">/ Leave Management</span></div>
        <h1 className="text-xl font-bold mb-1">Leave Management</h1>
        <p className="text-[13px] text-muted-foreground">Apply for leaves, track balances, and view history</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {leaveStats.map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className="text-[11px] text-muted-foreground font-medium mb-1.5">{s.label}</div>
            <div className={`text-[26px] font-bold leading-none ${s.color}`}>{s.value}</div>
            {s.sub && <div className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <div className="bg-card border border-border rounded-xl p-[18px]">
          <div className="text-sm font-semibold mb-3.5">📝 Apply for Leave</div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Leave Type</label>
              <select className="w-full px-3 py-2 border-[1.5px] border-border rounded-lg text-[13px] bg-card outline-none focus:border-saffron">
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
                <option>Festival Leave</option>
                <option>Emergency Leave</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">From Date</label>
              <input type="date" defaultValue="2025-04-10" className="w-full px-3 py-2 border-[1.5px] border-border rounded-lg text-[13px] bg-card outline-none focus:border-saffron" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">To Date</label>
              <input type="date" defaultValue="2025-04-12" className="w-full px-3 py-2 border-[1.5px] border-border rounded-lg text-[13px] bg-card outline-none focus:border-saffron" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">No. of Days</label>
              <input type="text" value="3" readOnly className="w-full px-3 py-2 border-[1.5px] border-border rounded-lg text-[13px] bg-card" />
            </div>
          </div>
          <div className="mb-3">
            <label className="text-xs text-muted-foreground block mb-1">Reason</label>
            <textarea rows={3} placeholder="Brief reason for leave…" className="w-full px-3 py-2 border-[1.5px] border-border rounded-lg text-[13px] bg-card outline-none focus:border-saffron resize-y" />
          </div>
          <button className="px-5 py-2 bg-saffron text-primary-foreground rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity">
            Submit Leave Request
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-[18px]">
          <div className="text-sm font-semibold mb-3.5">📊 Leave History</div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                <th className="text-left p-2.5 bg-secondary rounded-l-md">Dates</th>
                <th className="text-left p-2.5 bg-secondary">Type</th>
                <th className="text-left p-2.5 bg-secondary">Days</th>
                <th className="text-left p-2.5 bg-secondary rounded-r-md">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((l, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <td className="p-2.5">{l.dates}</td>
                  <td className="p-2.5">{l.type}</td>
                  <td className="p-2.5">{l.days}</td>
                  <td className="p-2.5"><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${l.statusClass}`}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
